import { LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { logoutUser } from "@/services/auth.service";

export function LogoutButton() {
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);
    await logoutUser();   // clears tokens + best-effort server blacklist
    toast.success("Logged out successfully.");
    logout();             // navigate to /login
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-muted-foreground hover:text-foreground gap-2"
      onClick={handleLogout}
      disabled={isLoading}
    >
      <LogOut size={15} />
      {isLoading ? "Logging out…" : "Logout"}
    </Button>
  );
}