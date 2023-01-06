import { UserData } from '../../shared/models/user-data.model';

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthData {
  accessToken: string;
  refreshToken: string;
  user: UserData;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface ChangePasswordRequest {
  id: string;
  password: string;
}
