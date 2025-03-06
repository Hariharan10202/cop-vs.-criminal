import { Button } from "@heroui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Fugitive Capture Game
      </h1>
      <Link href="/city-selection" className="z-20">
        <Button size="lg" color="primary" className="font-semibold w-full z-10">
          <div className="flex items-center gap-x-2 group">
            <span className="text-xl">Start chase</span>
          </div>
        </Button>
      </Link>
    </div>
  );
}
