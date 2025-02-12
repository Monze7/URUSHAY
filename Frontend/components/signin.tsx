'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const json = await response.json();
      console.log("Response from server:", json); // Log the response

      if (json.msg === "success") {
        alert("Login successful");
        localStorage.setItem('token', json.token);
        router.push("/dashboard");
      } else {
        alert("Login failed: " + json.msg);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-blue-800 p-4 text-white">
        <div className="container mx-auto flex items-center">
          <div className="mr-4 h-8 w-8 bg-white rounded-full"></div>
          <h1 className="text-xl font-bold">Government PII Detector</h1>
        </div>
      </header>
      <main className="container mx-auto mt-8 px-4">
        <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
          <CardHeader className="bg-blue-700 text-white">
            <CardTitle className="text-2xl font-bold">Sign In to PII Detector</CardTitle>
            <CardDescription className="text-blue-100">
              Access your account to start identifying government-issued PII in your documents and data.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-800">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border-blue-300 focus:border-blue-500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-800">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border-blue-300 focus:border-blue-500" />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-start space-y-4">
            <div className="flex items-center space-x-2 text-sm text-blue-600">
              <AlertCircle className="h-4 w-4" />
              <p>Your data will be handled securely and in compliance with privacy regulations.</p>
            </div>
            <Link href="/signup">
              <a className="text-blue-600 hover:underline">Don&apos;t have an account? <b>Sign up here</b> </a>
            </Link>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}