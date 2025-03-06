import NextLink from "@/components/ui/NextLink";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Fugitive Capture Game
      </h1>
      <NextLink label="Start chase" color="primary" href="/city-selection" />
    </div>
  );
}
