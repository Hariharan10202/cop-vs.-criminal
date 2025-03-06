import { Button } from "@heroui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Fugitive Capture Game</h1>
      <Link href="/city-selection">
        <Button color="primary" className="font-semibold">
          <div className="flex items-center gap-x-2 group">
            <span>Start chase</span>
          </div>
        </Button>
      </Link>
    </div>
  );
}
