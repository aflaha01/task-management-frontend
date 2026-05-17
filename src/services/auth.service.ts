import { api } from "./api";
import type { AxiosError } from "axios";
import type {
  SignupPayload,
  SignupResponse,
  LoginPayload,
  LoginResponse,
  DRFError,
} from "@/types/auth.types";

function extractDRFError(error: AxiosError<DRFError>, fallback: string): string {
  const data = error.response?.data;
  if (!data) return fallback;
  return (
    data.username?.[0] ||
    data.password?.[0] ||
    data.non_field_errors?.[0] ||
    data.detail ||
    fallback
  );
}

export async function signupUser(payload: SignupPayload): Promise<SignupResponse> {
  try {
    const { data } = await api.post<SignupResponse>("/auth/register/", payload);
    localStorage.setItem("accessToken", data.tokens.access);
    localStorage.setItem("refreshToken", data.tokens.refresh);
    return data;
  } catch (err) {
    const axiosErr = err as AxiosError<DRFError>;
    throw new Error(extractDRFError(axiosErr, "Registration failed. Please try again."));
  }
}

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  try {
    const { data } = await api.post<LoginResponse>("/auth/login/", payload);
    localStorage.setItem("accessToken", data.tokens.access);
    localStorage.setItem("refreshToken", data.tokens.refresh);
    return data;
  } catch (err) {
    const axiosErr = err as AxiosError<DRFError>;
    throw new Error(extractDRFError(axiosErr, "Invalid username or password."));
  }
}