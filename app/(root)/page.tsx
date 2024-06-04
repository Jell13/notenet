"use client"

import { SignInButton } from "@clerk/clerk-react";
import { Spinner } from "@components/Spinner";
import TypewriterText from "@components/TypewriterText";
import { Button } from "@components/ui/button";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {

  const{isAuthenticated, isLoading} = useConvexAuth()

  return (
    <div className="w-screen h-screen grainy">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-6xl text-center font-bold">
          Enhance your <span className="text-green-600">note taking</span> experience
        </h1>
        <h2 className="font-semibold mt-3 text-3xl"><TypewriterText/></h2>


          {isLoading && 
          <Spinner/>}
          {!isAuthenticated && isLoading }
          {!isAuthenticated && !isLoading &&
          <Button className="bg-green-600 mt-3">
            <SignInButton/>
            <ArrowRight className="ml-1"/>
          </Button> 
          }
          {isAuthenticated && !isLoading && 
          <Link className="mt-3" href="/dashboard">
            <Button className="bg-green-600">
              Get Started
            </Button>
          </Link>}
      </div>
    </div>
  );
}
