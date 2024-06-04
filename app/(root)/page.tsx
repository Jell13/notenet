"use client"

import TypewriterText from "@components/TypewriterText";
import { Button } from "@components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {

  return (
    <div className="w-screen h-screen grainy">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-6xl text-center font-bold">
          Enhance your <span className="text-green-600">note taking</span> experience
        </h1>
        <h2 className="font-semibold mt-3 text-3xl"><TypewriterText/></h2>
        <Link className="mt-3" href={"/dashboard"}>
          <Button className="bg-green-600">
            Get started
            <ArrowRight className="ml-1"/>
          </Button>
        </Link>
      </div>
    </div>
  );
}
