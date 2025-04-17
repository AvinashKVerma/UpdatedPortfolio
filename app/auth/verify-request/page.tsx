import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import Link from "next/link"

export default function VerifyRequest() {
  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription>A sign in link has been sent to your email address</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 pt-4">
          <div className="rounded-full p-6 bg-muted">
            <Mail className="h-12 w-12 text-accent" />
          </div>
          <p className="text-center text-muted-foreground">
            We've sent you a magic link to your email address. Click the link to sign in to your account.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" asChild>
            <Link href="/auth/signin">Use a different method</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
