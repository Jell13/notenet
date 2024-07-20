import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-10 grainy">
        <SignUp/>
    </div>
  );
}