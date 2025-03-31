import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-center md:justify-between gap-6 min-h-[calc(100vh-64px)] px-2 md:px-10 md:pt-32 overflow-clip">
      <div className="text-center items-center justify-center md:text-start">
        <h1 className="whitespace-nowrap">
          Time to organize your{" "}
          <span className="relative inline-block">
            work{" "}
            <Image
              className="absolute left-0 bottom-0"
              width={120}
              height={36}
              src="/scribble.png"
              alt="cross-out"
            />{" "}
            <span className="absolute left-[50%] rotate-[-15deg] translate-y-[-80%] font-accent text-6xl not-md:text-5xl text-[#7574C3]">
              life
            </span>
          </span>
        </h1>
        <p>
          Minimal task app which keeps track of all your projects in one place.
        </p>
        <div className="flex justify-center md:justify-start gap-5 pt-3">
          <Button variant="outline">Take a Look</Button>
          <Link href="/sign-up">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
      <div className="min-w-xs">
        <Image
          height={366}
          width={650}
          src="/illustration-woman-clipboard.png"
          alt="Graphic illustration of a woman checking off items from a list from a clip-board"
        />
      </div>
    </div>
  );
}
