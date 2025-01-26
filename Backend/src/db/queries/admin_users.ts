import { get } from 'http';
import db from '../database';
import bcrypt from 'bcryptjs';
import AdminUser from '../../types/AdminUserTypes';

// Get all admin users
const getAllAdminUsers = async (): Promise<AdminUser[]> => {
  try {
    const result = await db.query('SELECT * FROM admin_users;');
    return result.rows as AdminUser[];
  } catch (error) {
    console.error('Error fetching admin users: ', error);
    throw error;
  }
};

// Get admin user by email
const getAdminUserByEmail = async(email: string): Promise<AdminUser> => {
  try {
    const result = await db.query('SELECT * FROM admin_users WHERE email = $1;', [email.toLowerCase()]);
    return result.rows[0] as AdminUser;
  } catch (error) {
    console.error('Error fetching admin user by email: ', error);
    throw error;
  }
};

// Add new admin user
const addAdminUser = async (adminUser: AdminUser): Promise<AdminUser> => {
  try {
    const hashedPassword = await bcrypt.hash(adminUser.password_digest, 10);
    const queryString = 'INSERT INTO admin_users (first_name, last_name, email, password_digest, admin_role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;';

    const result = await db.query(queryString, [adminUser.first_name, adminUser.last_name, adminUser.email.toLowerCase(), hashedPassword, adminUser.admin_role_id]);
    return result.rows[0] as AdminUser;
  } catch (error) {
    console.error('Error adding admin user: ', error);
    throw error;
  };
};

//Update admin user
const updateAdminUserProfile = async (adminUser: AdminUser): Promise<AdminUser> => {
  try {
    const queryString = 'UPDATE admin_users SET first_name = $1, last_name = $2, email = $3, admin_role_id = $4 WHERE id = $5 RETURNING *;';
    const result = await db.query(queryString, [adminUser.first_name, adminUser.last_name, adminUser.email.toLowerCase(), adminUser.admin_role_id, adminUser.id]);
    return result.rows[0] as AdminUser;
  } catch(error) {
    console.error('Error updating admin user: ', error);
    throw error;
  };
};

//Update admin user password
const updateAdminUserPassword = async (adminUser: AdminUser): Promise<AdminUser> => {
  try {
    const hashedPassword = await bcrypt.hash(adminUser.password_digest, 10);
    const queryString = 'UPDATE admin_users SET password = $1 WHERE id = $2 RETURNING *;';
    const result = await db.query(queryString, [hashedPassword, adminUser.id]);
    return result.rows[0] as AdminUser;
  } catch(error) {
    console.error('Error updating admin user password: ', error);
    throw error;
  };
 };


export default { 
  getAllAdminUsers,
  getAdminUserByEmail,
  addAdminUser,
  updateAdminUserProfile,
  updateAdminUserPassword
};
