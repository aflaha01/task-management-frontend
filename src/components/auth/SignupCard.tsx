import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignupForm } from "@/components/auth/SignupForm";

export function SignupCard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f0] px-4">
      <Card className="w-full max-w-sm shadow-sm border border-border/60 bg-white rounded-2xl">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Create your account
          </CardTitle>
          <CardDescription>Start managing your tasks today</CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          <SignupForm />
        </CardContent>

        <CardFooter className="justify-center pb-6 pt-0">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-600 font-medium hover:underline"
            >
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}