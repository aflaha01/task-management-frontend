import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/components/auth/LoginForm";

export function LoginCard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f0] px-4">
      <Card className="w-full max-w-sm shadow-sm border border-border/60 bg-white rounded-2xl">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription>Log in to your account to continue</CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          <LoginForm />
        </CardContent>

        <CardFooter className="justify-center pb-6 pt-0">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-emerald-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}