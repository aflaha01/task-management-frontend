export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface SignupPayload {
  username: string;
  password: string;
  confirm_password: string;
}

export interface SignupResponse {
  message: string;
  username: string;
  tokens: AuthTokens;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  username: string;
  tokens: AuthTokens;
}

// DRF validation error shape
export interface DRFError {
  username?: string[];
  password?: string[];
  confirm_password?: string[];
  non_field_errors?: string[];
  detail?: string;
}