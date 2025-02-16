export interface AuthRequest {
    email: string;
    password: string;
}

export interface AuthLogoutRequest{
  token: string;
}
