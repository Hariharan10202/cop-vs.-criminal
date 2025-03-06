"use client";

import { getCities, saveCitySelections } from "@/actions/data";
import SelectComponent from "@/components/ui/SelectComponent";
import { citySelectData } from "@/lib/cop-data";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { z } from "zod";

const schema = z.object({
  cop1City: z.string({ required_error: "City should be selected" }),
  cop2City: z.string({ required_error: "City should be selected" }),
  cop3City: z.string({ required_error: "City should be selected" }),
});

export type CitySelectionSchema = z.infer<typeof schema>;

export default function CitySelectionPage() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<CitySelectionSchema>({
    resolver: zodResolver(schema),
  });

  const selectedValues = watch(["cop1City", "cop2City", "cop3City"]);

  const { data: cities = [], isLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: () => getCities(),
  });

  const onSubmit = async (data: CitySelectionSchema) => {
    try {
      const result = await saveCitySelections(
        Number(data.cop1City),
        Number(data.cop2City),
        Number(data.cop3City)
      );

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push("/vehicle-selection");
    } catch (error) {
      addToast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        color: "danger",
      });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-8 text-center">
        Select Cities for Each Cop
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-full sm:w-auto"
      >
        {citySelectData.map(({ key, label, image }) => (
          <div key={key} className="flex flex-col w-full sm:w-[300px]">
            <SelectComponent
              name={key}
              control={control}
              label={label}
              image={image}
              options={cities.map((city) => ({
                id: city.id.toString(),
                label: `${city.name} (${city.distance} KM)`,
              }))}
              placeholder="Select a city"
              error={errors[key as keyof CitySelectionSchema]?.message}
              isLoading={isLoading}
              selectedValues={selectedValues}
            />
            {errors[key as keyof CitySelectionSchema] && (
              <p className="text-red-400 text-xs">
                {errors[key as keyof CitySelectionSchema]?.message}
              </p>
            )}
          </div>
        ))}
        <div className="w-full flex items-center justify-between">
          <Button
            onPress={() => router.back()}
            size="sm"
            startContent={<IoMdArrowDropleft />}
          >
            Prev
          </Button>
          <Button type="submit" size="sm" endContent={<IoMdArrowDropright />}>
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
