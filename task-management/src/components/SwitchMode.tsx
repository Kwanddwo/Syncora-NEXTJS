"use client";
import { ModeToggle } from "@/components/ui/modeToggle";

export default function SwitchMode() {
  return (
    <>
      <div className="fixed mt-2.5 ml-370 flex items-center gap-2">
        <ModeToggle />
      </div>
    </>
  );
}
