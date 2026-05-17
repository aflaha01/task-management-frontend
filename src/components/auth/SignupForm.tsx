import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, UserRound, Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError, FieldDescription } from "@/components/ui/field";

import { signupSchema, type SignupFormValues } from "@/lib/validators/signup.validator";
import { signupUser } from "@/services/auth.service";

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: SignupFormValues) {
    try {
      const res = await signupUser({
        username: values.username,
        password: values.password,
        confirm_password: values.confirmPassword,
      });

      toast.success("Account created!", {
        description: `Welcome, ${res.username}! Redirecting you…`,
      });

      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (error) {
      toast.error("Registration failed", {
        description: error instanceof Error ? error.message : "Something went wrong.",
      });
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
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none size-4"
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
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none size-4"
              />
              <Input
                {...field}
                id={field.name}
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="pl-9 pr-10"
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            <FieldDescription>Must be at least 8 characters</FieldDescription>
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      {/* Confirm Password */}
      <Controller
        name="confirmPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
            <div className="relative">
              <ShieldCheck
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none size-4"
              />
              <Input
                {...field}
                id={field.name}
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your password"
                className="pl-9 pr-10"
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                tabIndex={-1}
                aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
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
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 animate-spin size-4" />
            Creating account…
          </>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
}