'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          mobileNumber: mobileNumber,
          dob: dob,
          password: password,
        }),
      });

      const json = await response.json();
      console.log("Response from server:", json); // Log the response

      if (json.msg === "success") {
        alert("Registration successful");
        localStorage.setItem('token', json.token);
        router.push("/");
      } else {
        alert("Registration failed: " + json.msg);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again.");
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
            <CardTitle className="text-2xl font-bold">Sign Up for PII Detector</CardTitle>
            <CardDescription className="text-blue-100">
              Create an account to start identifying government-issued PII in your documents and data.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-blue-800">First Name</Label>
                <Input id="firstName" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="border-blue-300 focus:border-blue-500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-blue-800">Last Name</Label>
                <Input id="lastName" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="border-blue-300 focus:border-blue-500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-800">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border-blue-300 focus:border-blue-500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob" className="text-blue-800">Date of Birth</Label>
                <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} required className="border-blue-300 focus:border-blue-500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-blue-800">Mobile Number</Label>
                <Input id="mobile" type="tel" placeholder="Enter your mobile number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required className="border-blue-300 focus:border-blue-500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-800">Password</Label>
                <Input id="password" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border-blue-300 focus:border-blue-500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-blue-800">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="border-blue-300 focus:border-blue-500" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={agreed} onCheckedChange={() => setAgreed(!agreed)} className="border-blue-500 text-blue-600" />
                <Label htmlFor="terms" className="text-sm text-blue-800">
                  I agree to the terms and conditions
                </Label>
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={!agreed}>
                Sign Up
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-start space-y-4">
            <div className="flex items-center space-x-2 text-sm text-blue-600">
              <AlertCircle className="h-4 w-4" />
              <p>Your data will be handled securely and in compliance with privacy regulations.</p>
            </div>
            <div className="text-sm text-blue-600">
              Already have an account? <b><Link href="/signin" className="text-blue-800 underline">Sign in here</Link>.</b>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}