interface AdminUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password_digest: string;
  created_at: Date;
  updated_at: Date;
  admin_role_id: number
};

export default AdminUser;