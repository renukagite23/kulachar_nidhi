export const hasAdminAccess = (user: any) => {
  return ["admin", "president"].includes(user?.role);
};
