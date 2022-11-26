export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthData {
  accessToken: string;
  refreshToken: string;
}
