import { checkCapture } from "@/actions/game";
import NextLink from "@/components/ui/NextLink";
import { Metadata } from "next";
import Image from "next/image";
import { FaRepeat } from "react-icons/fa6";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Cop vs Criminal - Result",
  description: "Select cities for each cop before proceeding.",
};

export default async function ResultPage() {
  const result = await checkCapture();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5">
      <h1 className="text-2xl font-bold mb-8">Game Result</h1>
      {result ? (
        <div className="flex flex-col items-center gap-y-4">
          <p className="text-3xl">Final Report</p>
          <p className="text-green-500 font-bold text-2xl text-center">
            The fugitive was captured by
          </p>

          <div className="grid sm:grid-cols-3 grid-cols-1 gap-x-6 gap-y-4 items-center">
            <div className="flex flex-col items-center">
              <p className="font-semibold">{result.name}</p>
              <div className="relative size-[100px]">
                <Image
                  src={`/assets/${result.name}.png`}
                  alt={result.name}
                  fill
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <p className="font-semibold">Using {result.vehicle?.kind}</p>
              <div className="relative size-[100px]">
                <Image
                  src={`/assets/${result.vehicle?.kind}.png`}
                  alt={result.vehicle?.kind ?? ""}
                  fill
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <p className="font-semibold">In {result.city.name}</p>
              <div className="relative size-[100px]">
                <Image
                  src={`/assets/${result.city.name}.png`}
                  alt={result.city.name ?? ""}
                  fill
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center flex-col">
          <p className="text-red-500 font-bold text-2xl text-center">
            The fugitive escaped!
          </p>
          <p className="text-red-500 font-bold text-2xl text-center">
            Re investigate may help to capture the criminal
          </p>
        </div>
      )}
      <div className="flex items-center flex-col sm:flex-row gap-10 mt-10">
        {!result && (
          <NextLink label="Re investigate" href="/result">
            <FaRepeat />
          </NextLink>
        )}
        <NextLink label="Play again" color="primary" href="/">
          <FaRepeat />
        </NextLink>
      </div>
    </div>
  );
}
