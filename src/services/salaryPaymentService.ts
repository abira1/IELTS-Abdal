import { getDatabase, ref, get, set, push, remove, update, query, orderByChild, equalTo } from 'firebase/database';
import { app } from '../firebase';

/**
 * Salary Payment interface following the RTDB structure from the spec
 * Path: /salary_payments
 */
export interface SalaryPayment {
  id: string;
  staffId: string; // References staff record ID
  month: string; // Format: YYYY-MM
  amount: number;
  status: 'Paid' | 'Due';
  date?: string; // Payment date (optional)
  createdAt?: string;
  updatedAt?: string;
}

const db = getDatabase(app);

export const salaryPaymentService = {
  // Get all salary payments
  async getAllSalaryPayments(): Promise<SalaryPayment[]> {
    try {
      const snapshot = await get(ref(db, 'salary_payments'));
      if (!snapshot.exists()) {
        return [];
      }

      const payments = snapshot.val();
      return Object.keys(payments).map(id => ({
        id,
        ...payments[id]
      }));
    } catch (error) {
      console.error('Error fetching salary payments:', error);
      throw error;
    }
  },

  // Get salary payments for a specific staff member
  async getSalaryPaymentsForStaff(staffId: string): Promise<SalaryPayment[]> {
    try {
      const allPayments = await this.getAllSalaryPayments();
      return allPayments.filter(payment => payment.staffId === staffId);
    } catch (error) {
      console.error('Error fetching salary payments for staff:', error);
      throw error;
    }
  },

  // Get salary payments for a specific month
  async getSalaryPaymentsByMonth(month: string): Promise<SalaryPayment[]> {
    try {
      const allPayments = await this.getAllSalaryPayments();
      return allPayments.filter(payment => payment.month === month);
    } catch (error) {
      console.error('Error fetching salary payments by month:', error);
      throw error;
    }
  },

  // Add new salary payment
  async addSalaryPayment(
    staffId: string,
    month: string,
    amount: number,
    status: 'Paid' | 'Due' = 'Due',
    date?: string
  ): Promise<string> {
    try {
      const newPaymentRef = push(ref(db, 'salary_payments'));
      const paymentId = newPaymentRef.key!;

      // Check if payment already exists for this staff and month
      const existingPayments = await this.getAllSalaryPayments();
      const exists = existingPayments.find(
        p => p.staffId === staffId && p.month === month
      );

      if (exists) {
        // Update existing payment instead
        await this.updateSalaryPayment(exists.id, { amount, status, date });
        return exists.id;
      }

      const paymentData: Omit<SalaryPayment, 'id'> = {
        staffId,
        month,
        amount,
        status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (date) {
        paymentData.date = date;
      }

      await set(newPaymentRef, paymentData);
      return paymentId;
    } catch (error) {
      console.error('Error adding salary payment:', error);
      throw error;
    }
  },

  // Update salary payment
  async updateSalaryPayment(paymentId: string, updates: Partial<SalaryPayment>): Promise<void> {
    try {
      const cleanUpdates = Object.fromEntries(
        Object.entries(updates).filter(([_, value]) => value !== undefined)
      );

      const updateData = {
        ...cleanUpdates,
        updatedAt: new Date().toISOString(),
      };

      await update(ref(db, `salary_payments/${paymentId}`), updateData);
    } catch (error) {
      console.error('Error updating salary payment:', error);
      throw error;
    }
  },

  // Mark salary payment as paid
  async markSalaryPaymentAsPaid(paymentId: string, date?: string): Promise<void> {
    try {
      const updateData: any = {
        status: 'Paid',
        updatedAt: new Date().toISOString(),
      };

      if (date) {
        updateData.date = date;
      }

      await update(ref(db, `salary_payments/${paymentId}`), updateData);
    } catch (error) {
      console.error('Error marking salary payment as paid:', error);
      throw error;
    }
  },

  // Delete salary payment
  async deleteSalaryPayment(paymentId: string): Promise<void> {
    try {
      await remove(ref(db, `salary_payments/${paymentId}`));
    } catch (error) {
      console.error('Error deleting salary payment:', error);
      throw error;
    }
  },

  // Calculate total paid salaries for a month
  async calculateMonthlyPaidSalaries(month: string): Promise<number> {
    try {
      const payments = await this.getSalaryPaymentsByMonth(month);
      return payments
        .filter(p => p.status === 'Paid')
        .reduce((sum, p) => sum + p.amount, 0);
    } catch (error) {
      console.error('Error calculating monthly paid salaries:', error);
      throw error;
    }
  },

  // Calculate total due salaries for a month
  async calculateMonthlyDueSalaries(month: string): Promise<number> {
    try {
      const payments = await this.getSalaryPaymentsByMonth(month);
      return payments
        .filter(p => p.status === 'Due')
        .reduce((sum, p) => sum + p.amount, 0);
    } catch (error) {
      console.error('Error calculating monthly due salaries:', error);
      throw error;
    }
  },

  // Get salary payment summary for a staff member
  async getStaffSalarySummary(staffId: string): Promise<{
    totalPaid: number;
    totalDue: number;
    paymentCount: number;
    paidCount: number;
    dueCount: number;
  }> {
    try {
      const payments = await this.getSalaryPaymentsForStaff(staffId);

      const totalPaid = payments
        .filter(p => p.status === 'Paid')
        .reduce((sum, p) => sum + p.amount, 0);

      const totalDue = payments
        .filter(p => p.status === 'Due')
        .reduce((sum, p) => sum + p.amount, 0);

      return {
        totalPaid,
        totalDue,
        paymentCount: payments.length,
        paidCount: payments.filter(p => p.status === 'Paid').length,
        dueCount: payments.filter(p => p.status === 'Due').length,
      };
    } catch (error) {
      console.error('Error getting staff salary summary:', error);
      throw error;
    }
  },
};
