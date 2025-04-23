"use client"

import { SignOutForm } from "@/components/auth/sign-out-form"
import Image from "next/image"

export default function SignOutPage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-12">
      <div className="mb-8">
        <Image 
          src="/logo.svg" 
          alt="Logo" 
          width={80} 
          height={80} 
          className="mx-auto"
        />
      </div>
      
      <SignOutForm 
        redirectUrl="/"
        title="Sign Out"
        description="Are you sure you want to sign out of your account?"
      />
    </div>
  )
}