import { getDatabase, ref, get, set, push, remove, update } from 'firebase/database';
import { app } from '../firebase';

export interface Staff {
  id: string;
  name: string;
  role: string;
  salary?: number;
  createdAt?: string;
  updatedAt?: string;
}

const db = getDatabase(app);

export const staffService = {
  // Get all staff
  async getAllStaff(): Promise<Staff[]> {
    try {
      const snapshot = await get(ref(db, 'staff'));
      if (!snapshot.exists()) {
        return [];
      }

      const staff = snapshot.val();
      return Object.keys(staff).map(id => ({
        id,
        ...staff[id]
      }));
    } catch (error) {
      console.error('Error fetching staff:', error);
      throw error;
    }
  },

  // Get unique staff names
  async getStaffNames(): Promise<string[]> {
    try {
      const staff = await this.getAllStaff();
      const names = [...new Set(staff.map(s => s.name))];
      return names.sort();
    } catch (error) {
      console.error('Error fetching staff names:', error);
      throw error;
    }
  },

  // Get unique roles
  async getStaffRoles(): Promise<string[]> {
    try {
      const staff = await this.getAllStaff();
      const roles = [...new Set(staff.map(s => s.role))];
      return roles.sort();
    } catch (error) {
      console.error('Error fetching staff roles:', error);
      throw error;
    }
  },

  // Add new staff member
  async addStaff(name: string, role: string, salary?: number): Promise<string> {
    try {
      // Check if this staff member already exists
      const existingStaff = await this.getAllStaff();
      const exists = existingStaff.find(staff =>
        staff.name.toLowerCase() === name.toLowerCase() &&
        staff.role.toLowerCase() === role.toLowerCase()
      );

      if (exists) {
        return exists.id; // Already exists, return the ID
      }

      const newStaffRef = push(ref(db, 'staff'));
      const staffId = newStaffRef.key!;

      const staffData: Omit<Staff, 'id'> = {
        name: name.trim(),
        role: role.trim(),
      };

      // Only add salary if provided
      if (salary !== undefined && salary > 0) {
        staffData.salary = salary;
      }

      await set(newStaffRef, staffData);
      return staffId;
    } catch (error) {
      console.error('Error adding staff:', error);
      throw error;
    }
  },

  // Add or update staff with salary
  async addOrUpdateStaffWithSalary(name: string, role: string, salary: number): Promise<string> {
    try {
      const newStaffRef = push(ref(db, 'staff'));
      const staffId = newStaffRef.key!;

      const staffData = {
        name: name.trim(),
        role: role.trim(),
        salary: salary,
      };

      await set(newStaffRef, staffData);
      return staffId;
    } catch (error) {
      console.error('Error adding/updating staff with salary:', error);
      throw error;
    }
  },

  // Update staff salary
  async updateStaffSalary(staffId: string, salary: number): Promise<void> {
    try {
      await update(ref(db, `staff/${staffId}`), {
        salary: salary,
      });
    } catch (error) {
      console.error('Error updating staff salary:', error);
      throw error;
    }
  },

  // Delete staff member by name and role
  async deleteStaff(name: string, role: string): Promise<void> {
    try {
      const staff = await this.getAllStaff();
      const staffToDelete = staff.find(s =>
        s.name.toLowerCase() === name.toLowerCase() &&
        s.role.toLowerCase() === role.toLowerCase()
      );

      if (staffToDelete) {
        await remove(ref(db, `staff/${staffToDelete.id}`));
      }
    } catch (error) {
      console.error('Error deleting staff:', error);
      throw error;
    }
  },

  // Delete all staff with a specific name
  async deleteStaffByName(name: string): Promise<void> {
    try {
      const staff = await this.getAllStaff();
      const staffToDelete = staff.filter(s =>
        s.name.toLowerCase() === name.toLowerCase()
      );

      for (const staffMember of staffToDelete) {
        await remove(ref(db, `staff/${staffMember.id}`));
      }
    } catch (error) {
      console.error('Error deleting staff by name:', error);
      throw error;
    }
  },

  // Delete all staff with a specific role
  async deleteStaffByRole(role: string): Promise<void> {
    try {
      const staff = await this.getAllStaff();
      const staffToDelete = staff.filter(s =>
        s.role.toLowerCase() === role.toLowerCase()
      );

      for (const staffMember of staffToDelete) {
        await remove(ref(db, `staff/${staffMember.id}`));
      }
    } catch (error) {
      console.error('Error deleting staff by role:', error);
      throw error;
    }
  },
};