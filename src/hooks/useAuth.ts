import { useNavigate } from "react-router-dom";

export function useAuth() {
  const accessToken = localStorage.getItem("accessToken");
  const isAuthenticated = !!accessToken;
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login", { replace: true });
  }

  return { isAuthenticated, accessToken, logout };
}