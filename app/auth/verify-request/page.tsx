"use client";

import { Card, CardHeader, CardBody, CardFooter, Button } from "@heroui/react";
import { MdEmail } from "react-icons/md";
import Link from "next/link";

export default function VerifyRequest() {
  return (
    <div className="flex justify-center items-center py-12 min-h-screen container">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center gap-2">
          <h2 className="font-bold text-2xl text-center">Check your email</h2>
          <p className="text-default-500 text-sm text-center">
            A sign-in link has been sent to your email address.
          </p>
        </CardHeader>
        <CardBody className="flex flex-col items-center gap-4 pt-2">
          <div className="bg-default-100 p-6 rounded-full">
            <MdEmail className="w-12 h-12 text-accent" />
          </div>
          <p className="text-default-500 text-sm text-center">
            We've sent you a magic link to your email address. Click the link to
            sign in to your account.
          </p>
        </CardBody>
        <CardFooter className="flex justify-center">
          <Button as={Link} href="/auth/signin">
            Use a different method
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
