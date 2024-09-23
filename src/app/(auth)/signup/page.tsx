import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

import signUpImage from "@/assets/signup-image.jpg";
import { SignUpForm } from "@/app/(auth)/signup/signup-form";

export const metadata: Metadata = {
  title: "Sign Up",  
}

const SignUp = () => {
  return (
    <div className="h-screen flex justify-center items-center p-5">
        <div className="w-full max-w-[64rem] h-full max-h-[40rem] flex overflow-hidden rounded-2xl shadow-2xl bg-card"> 
            <div className="md:w-1/2 w-full space-y-10 overflow-y-auto p-10">
                <div className="space-y-1 text-center">
                    <h1 className="text-3xl font-bold">Sign up to bugbook</h1>
                    <p className="text-muted-foreground">A place where even <span className="italic">you</span> can find a friend.</p>
                </div>
                <div className="space-y-5">
                    <SignUpForm />
                    <Link href="/login" className="text-xs block text-center hover:underline">
                        Already have an account? Log in
                    </Link>
                </div>
            </div>
            <Image src={signUpImage} alt="Sign Up" className="w-1/2 hidden md:block object-cover" />
        </div>
    </div>
  )
}

export default SignUp;