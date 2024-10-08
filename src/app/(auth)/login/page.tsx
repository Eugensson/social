import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

import loginImage from "@/assets/login-image.jpg";
import { LoginForm } from "@/app/(auth)/login/login-form";
import { GoogleSignInButton } from "@/app/(auth)/login/google/google-sign-in-button";

export const metadata: Metadata = {
  title: "Login",  
}

const Login = () => {
  return (
    <div className="h-screen flex justify-center items-center p-5">
        <div className="w-full max-w-[64rem] h-full max-h-[40rem] flex overflow-hidden rounded-2xl shadow-2xl bg-card"> 
            <div className="md:w-1/2 w-full space-y-10 overflow-y-auto p-10">
                <h1 className="text-center text-3xl font-bold">Login to ecobook</h1>
                <div className="space-y-5">
                    <GoogleSignInButton />
                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-muted"/>
                      <span className="text-muted-foreground uppercase">or</span>
                      <div className="h-px flex-1 bg-muted"/>
                    </div>
                    <LoginForm />
                    <Link href="/signup" className="text-xs block text-center hover:underline">
                        Don&apos;t have an account? Sign up
                    </Link>
                </div>
            </div>
            <Image src={loginImage} alt="Sign Up" className="w-1/2 hidden md:block object-cover" />
        </div>
    </div>
  )
}

export default Login;