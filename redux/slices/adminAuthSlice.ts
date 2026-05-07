import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminAuthState {
  admin: AdminUser | null;
  adminToken: string | null;
  isAdminAuthenticated: boolean;
  loading: boolean;
}

const initialState: AdminAuthState = {
  admin: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('admin_user') || 'null') : null,
  adminToken: typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null,
  isAdminAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('admin_token') : false,
  loading: false,
};

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    setAdminCredentials: (
      state,
      action: PayloadAction<{ admin: AdminUser; token: string }>
    ) => {
      const { admin, token } = action.payload;
      state.admin = admin;
      state.adminToken = token;
      state.isAdminAuthenticated = true;
      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_user', JSON.stringify(admin));
    },
    adminLogout: (state) => {
      state.admin = null;
      state.adminToken = null;
      state.isAdminAuthenticated = false;
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
    },
    setAdminLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setAdminCredentials, adminLogout, setAdminLoading } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
