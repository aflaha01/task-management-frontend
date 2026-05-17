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

function persistSession(username: string, tokens: { access: string; refresh: string }) {
  localStorage.setItem("accessToken", tokens.access);
  localStorage.setItem("refreshToken", tokens.refresh);
  localStorage.setItem("username", username);
}

export async function signupUser(payload: SignupPayload): Promise<SignupResponse> {
  try {
    const { data } = await api.post<SignupResponse>("/auth/register/", payload);
    persistSession(data.username, data.tokens);
    return data;
  } catch (err) {
    throw new Error(extractDRFError(err as AxiosError<DRFError>, "Registration failed. Please try again."));
  }
}

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  try {
    const { data } = await api.post<LoginResponse>("/auth/login/", payload);
    persistSession(data.username, data.tokens);
    return data;
  } catch (err) {
    throw new Error(extractDRFError(err as AxiosError<DRFError>, "Invalid username or password."));
  }
}

export async function logoutUser(): Promise<void> {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    try {
      await api.post("/auth/logout/", { refresh: refreshToken });
    } catch {
      // best-effort — still clear client side
    }
  }
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("username");
}