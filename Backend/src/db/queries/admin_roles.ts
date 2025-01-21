import db from '../database';

interface AdminRole {
  id: number;
  admin_role_name: string;
};

// Get all admin roles
const getAllAdminRoles = async (): Promise<AdminRole[]> => {
  try {
    const result = await db.query('SELECT * FROM admin_roles;');
    return result.rows as AdminRole[];
  } catch(error) {
    console.error('Error fetching admin roles: ', error);
    throw error;
  }
};

// Get admin role by id
const getAdminRoleById = async (adminRoleId: number): Promise<AdminRole> => {
  try {
    const result = await db.query('SELECT * FROM admin_roles WHERE is = $1;', [adminRoleId]);
    return result.rows[0] as AdminRole;
  } catch(error) {
    console.error('Error fecthing admin role by id: ', error);
    throw error;
  }
};

// Update admin role name
const updateAdminRoleName = async (adminRole: AdminRole): Promise<AdminRole> => {
  try {
    const queryString = 'UPDATE admin_roles SET admin_role_name = $1 WHERE id = $2 RETURNING *;';
    const result = await db.query(queryString, [adminRole.admin_role_name, adminRole.id]);
    return result.rows[0] as AdminRole;
  } catch(error) {
    console.error('Error updating admin role name: ', error);
    throw error;
  }
};

export default {
  getAllAdminRoles,
  getAdminRoleById,
  updateAdminRoleName
};