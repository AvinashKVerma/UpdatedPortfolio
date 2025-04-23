"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tabs,
  Tab,
  Button,
  Input,
  Spinner,
} from "@heroui/react";
import { CiMail } from "react-icons/ci";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("email");

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn("email", { email, redirect: false });
      router.push("/auth/verify-request");
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/admin" });
    } catch (error) {
      console.error("Google sign in error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-12 min-h-screen container">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center gap-1">
          <h3 className="font-bold text-2xl text-center">Sign in</h3>
          <p className="text-default-500 text-sm">
            Sign in to access the admin dashboard
          </p>
        </CardHeader>
        <CardBody>
          <Tabs
            aria-label="Sign in options"
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(String(key))}
            classNames={{ base: "w-full", tabList: "w-full" }}
          >
            <Tab key="email" title="Email">
              <form onSubmit={handleEmailSignIn} className="space-y-4">
                <Input
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  labelPlacement="outside"
                  placeholder="name@example.com"
                  variant="bordered"
                  type="email"
                  required
                />
                <Button type="submit" fullWidth isDisabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <CiMail />
                      Sign in with Email
                    </>
                  )}
                </Button>
              </form>
            </Tab>
            <Tab key="google" title="Google">
              <div className="space-y-4">
                <Button
                  fullWidth
                  variant="bordered"
                  onPress={handleGoogleSignIn}
                  isDisabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <svg className="mr-2 w-4 h-4" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Sign in with Google
                    </>
                  )}
                </Button>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
        <CardFooter className="flex justify-center">
          <Button variant="ghost" onPress={() => router.push("/")}>
            Back to home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
