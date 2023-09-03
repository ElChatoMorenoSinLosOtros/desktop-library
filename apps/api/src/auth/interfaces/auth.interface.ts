export interface AuthenticatedUser {
  accessToken: string;
  name: string;
  email: string;
  role: string;
  adminId: number;
}
