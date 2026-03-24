


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  // 🔐 LOGIN WITH FIRESTORE ROLE CHECK
  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      // ✅ Step 1: Firebase Auth login
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCred.user;

      // ✅ Step 2: Get user data from Firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        alert("Sorry! you can not access.only for admin ❌");
        return;
      }

      const data = docSnap.data();

      // ✅ Step 3: Check role
      if (data.role !== "admin") {
        alert("Access denied ❌");
        return;
      }

      // ✅ Success
      alert("Admin login success ✅");
      router.push("/admin/dashboard");
    } catch (error: any) {
      alert(error.message);
    }
  };



  const handleForgot = async () => {
  if (!email) {
    alert("Enter your email first");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);

    alert("Reset link sent 📩 (Check your email)");
    setMode("login");

  } catch (error: any) {
    // 🔍 Handle specific errors
    if (error.code === "auth/user-not-found") {
      alert("Email not registered ❌");
    } else if (error.code === "auth/invalid-email") {
      alert("Invalid email format ❌");
    } else {
      alert("Something went wrong ❌");
    }
  }
};

  return (
    <form
      onSubmit={handleLogin}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        {/* TITLE */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">
            Tathagat Pharma Admin
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to login
          </p>
        </div>

        {/* EMAIL */}
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input
            type="email"
            placeholder="admin@gmail.com"
            required
            className="bg-background"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>

        {/* PASSWORD */}
        {mode === "login" && (
          <Field>
            <div className="flex items-center">
              <FieldLabel>Password</FieldLabel>
              <p
                className="ml-auto text-sm underline cursor-pointer"
                onClick={() => setMode("forgot")}
              >
                Forgot password?
              </p>
            </div>
            <Input
              type="password"
              required
              className="bg-background"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
        )}

        {/* LOGIN BUTTON */}
        {mode === "login" && (
          <Field>
            <Button type="submit">Login</Button>
          </Field>
        )}

        {/* FORGOT PASSWORD */}
        {mode === "forgot" && (
          <Field>
            <Button type="button" onClick={handleForgot}>
              Send Reset Link
            </Button>

            <p
              className="text-sm text-center mt-2 cursor-pointer"
              onClick={() => setMode("login")}
            >
              Back to login
            </p>
          </Field>
        )}

        {/* <FieldSeparator>Or continue with</FieldSeparator> */}

        {/* OPTIONAL */}
        {/* <Field>
          <Button variant="outline" type="button">
            Login with GitHub
          </Button>

          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline">
              Sign up
            </a>
          </FieldDescription>
        </Field> */}
      </FieldGroup>
    </form>
  );
}