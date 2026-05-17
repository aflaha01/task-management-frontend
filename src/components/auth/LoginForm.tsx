import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, UserRound, Lock } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import { loginSchema, type LoginFormValues } from "@/lib/validators/login.validator";
import { loginUser } from "@/services/auth.service";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    try {
      const res = await loginUser(values);

      toast.success("Welcome back!", {
        description: `Logged in as ${res.username}.`,
      });

      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (error) {
      toast.error("Login failed", {
        description: error instanceof Error ? error.message : "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

      {/* Username */}
      <Controller
        name="username"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Username</FieldLabel>
            <div className="relative">
              <UserRound
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <Input
                {...field}
                id={field.name}
                placeholder="your_username"
                className="pl-9"
                autoComplete="username"
                aria-invalid={fieldState.invalid}
              />
            </div>
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      {/* Password */}
      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
            <div className="relative">
              <Lock
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <Input
                {...field}
                id={field.name}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pl-9 pr-10"
                autoComplete="current-password"
                aria-invalid={fieldState.invalid}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Button
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 size={15} className="mr-2 animate-spin" />
            Signing in…
          </>
        ) : (
          "Log In"
        )}
      </Button>
    </form>
  );
}