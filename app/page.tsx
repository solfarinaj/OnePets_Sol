"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        OnePets - UI Demo
      </h1>

      <div className="flex flex-col space-y-4 w-full max-w-sm">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button>Login</Button>
        <Button variant="outline">Sign Up</Button>
        <Button variant="destructive">Delete Account</Button>
        <Button variant="ghost">Forgot Password</Button>
        <Button variant="link">Learn More</Button>
      </div>
    </div>
  );
}