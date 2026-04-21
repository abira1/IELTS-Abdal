import { getDatabase, ref, get, set, push, remove, update } from 'firebase/database';
import { app } from '../firebase';

/**
 * Core Expense interface following the RTDB structure from the spec
 */
export interface Expense {
  id: string;
  // Primary fields
  name?: string;
  amount: number;
  category: string;
  type: 'recurring' | 'one-time' | 'Recurring' | 'One-Time Payment'; // Support both formats for backward compatibility
  dueDate?: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  
  // Legacy/UI fields (for backward compatibility)
  date?: string; // ISO date string
  customCategory?: string; // For 'Other' category
  staffName?: string; // For 'Staff Salaries' category
  role?: string; // For 'Staff Salaries' category
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

/**
 * Internal format for storing in database with normalized field names
 */
interface ExpenseRecord {
  name: string;
  amount: number;
  category: string;
  type: 'recurring' | 'one-time';
  dueDate?: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export type ExpenseCategory =
  | 'Office Rent'
  | 'Electricity Bill'
  | 'Staff Salaries'
  | 'Internet Bill'
  | 'Teaching Supplies'
  | 'Marketing Cost'
  | 'rent'
  | 'electricity'
  | 'salary'
  | 'internet'
  | 'supplies'
  | 'Other'
  | 'other';

const db = getDatabase(app);

/**
 * Normalize expense data from various formats to the standard format
 */
function normalizeExpenseData(rawData: any): ExpenseRecord {
  // Support various field name aliases
  const name = rawData.name || rawData.title || rawData.description || rawData.expense || 'Unnamed Expense';
  const amount = parseFloat(rawData.amount) || parseFloat(rawData.value) || parseFloat(rawData.total) || 0;
  const category = rawData.category || rawData.categoryName || rawData.category_name || 'other';
  const type = (rawData.type || rawData.expenseType || rawData.paymentType || rawData.transactionType || 'one-time').toLowerCase() === 'recurring'
    ? 'recurring'
    : 'one-time';
  const dueDate = rawData.dueDate || rawData.due_date || rawData.date || rawData.createdAt || rawData.created_at;
  const status = rawData.status || rawData.paymentStatus || rawData.payment_status || rawData.state || 'Pending';

  const normalized: any = {
    name: String(name).trim(),
    amount,
    category: String(category).toLowerCase(),
    type,
    status: String(status),
  };

  // Only include dueDate if it has a valid value
  if (dueDate !== undefined && dueDate !== null && dueDate !== '') {
    normalized.dueDate = dueDate;
  }

  return normalized;
}

export const expenseService = {
  // Get all expenses
  async getAllExpenses(): Promise<Expense[]> {
    try {
      const snapshot = await get(ref(db, 'expenses'));
      if (!snapshot.exists()) {
        return [];
      }

      const expenses = snapshot.val();
      return Object.keys(expenses).map(id => {
        const data = expenses[id];
        // Support both old and new formats
        return {
          id,
          ...data,
          // Ensure backwards compatibility
          date: data.date || data.dueDate,
          name: data.name || data.category,
          status: data.status || 'Pending',
        };
      });
    } catch (error) {
      console.error('Error fetching expenses:', error);
      throw error;
    }
  },

  // Add new expense with normalized data
  async addExpense(expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const newExpenseRef = push(ref(db, 'expenses'));
      const expenseId = newExpenseRef.key!;

      // Normalize the expense data to standard format
      const normalized = normalizeExpenseData(expense);

      // Filter out undefined values from normalized data
      const cleanNormalized = Object.fromEntries(
        Object.entries(normalized).filter(([_, value]) => value !== undefined)
      );

      // Keep legacy fields for backward compatibility
      const expenseData: any = {
        ...cleanNormalized,
        id: expenseId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add legacy fields for UI compatibility (only if they exist and are not undefined)
      if (expense.date !== undefined) expenseData.date = expense.date;
      if (expense.dueDate !== undefined) expenseData.dueDate = expense.dueDate;
      if (expense.customCategory !== undefined) expenseData.customCategory = expense.customCategory;
      if (expense.staffName !== undefined) expenseData.staffName = expense.staffName;
      if (expense.role !== undefined) expenseData.role = expense.role;
      if (expense.createdBy !== undefined) expenseData.createdBy = expense.createdBy;

      await set(newExpenseRef, expenseData);
      return expenseId;
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  },

  // Update expense
  async updateExpense(expenseId: string, updates: Partial<Expense>): Promise<void> {
    try {
      // Clean up the updates to remove undefined values
      const cleanUpdates = Object.fromEntries(
        Object.entries(updates).filter(([_, value]) => value !== undefined)
      );

      const updateData = {
        ...cleanUpdates,
        updatedAt: new Date().toISOString(),
      };

      // Filter out undefined values from updateData as well
      const finalUpdateData = Object.fromEntries(
        Object.entries(updateData).filter(([_, value]) => value !== undefined)
      );

      await update(ref(db, `expenses/${expenseId}`), finalUpdateData);
    } catch (error) {
      console.error('Error updating expense:', error);
      throw error;
    }
  },

  // Delete expense
  async deleteExpense(expenseId: string): Promise<void> {
    try {
      await remove(ref(db, `expenses/${expenseId}`));
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  },

  // Get expenses by month
  async getExpensesByMonth(year: number, month: number): Promise<Expense[]> {
    try {
      const allExpenses = await this.getAllExpenses();
      return allExpenses.filter(expense => {
        const dateStr = expense.date || expense.dueDate;
        if (!dateStr) return false;
        const expenseDate = new Date(dateStr);
        return expenseDate.getFullYear() === year && expenseDate.getMonth() === month;
      });
    } catch (error) {
      console.error('Error fetching expenses by month:', error);
      throw error;
    }
  },

  // Calculate monthly totals
  calculateMonthlyTotals(expenses: Expense[]) {
    const total = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
    const recurring = expenses
      .filter(expense => (expense.type || '').toString().toLowerCase().includes('recurring'))
      .reduce((sum, expense) => sum + (expense.amount || 0), 0);
    const oneTime = expenses
      .filter(expense => (expense.type || '').toString().toLowerCase().includes('one-time') || (expense.type || '').toString().toLowerCase().includes('one-time payment'))
      .reduce((sum, expense) => sum + (expense.amount || 0), 0);
    const paid = expenses
      .filter(expense => expense.status === 'Paid')
      .reduce((sum, expense) => sum + (expense.amount || 0), 0);
    const pending = expenses
      .filter(expense => expense.status === 'Pending')
      .reduce((sum, expense) => sum + (expense.amount || 0), 0);

    return {
      total,
      recurring,
      oneTime,
      paid,
      pending,
      paidCount: expenses.filter(e => e.status === 'Paid').length,
      pendingCount: expenses.filter(e => e.status === 'Pending').length,
    };
  },

  // Get category breakdown
  getCategoryBreakdown(expenses: Expense[]) {
    const categories: Record<string, number> = {};

    expenses.forEach(expense => {
      const categoryName = expense.category === 'Other' && expense.customCategory
        ? expense.customCategory
        : expense.category;

      categories[categoryName] = (categories[categoryName] || 0) + (expense.amount || 0);
    });

    return categories;
  },

  /**
   * Import expenses from external sources with various field names
   * Automatically normalizes field names according to spec
   */
  async importExpenses(expenses: any[]): Promise<string[]> {
    try {
      const importedIds: string[] = [];

      for (const rawExpense of expenses) {
        const normalized = normalizeExpenseData(rawExpense);
        const expenseId = await this.addExpense({
          ...normalized,
          dueDate: rawExpense.dueDate || rawExpense.due_date,
        } as any);
        importedIds.push(expenseId);
      }

      return importedIds;
    } catch (error) {
      console.error('Error importing expenses:', error);
      throw error;
    }
  },
};