"use client";

import { getVehicles, saveVehicleSelections } from "@/actions/data";
import SelectComponent from "@/components/ui/SelectComponent";
import { vehicleSelectData } from "@/lib/cop-data";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { z } from "zod";

export const metadata: Metadata = {
  title: "Vehicle Selection",
  description: "Select cities for each cop before proceeding.",
};

const schema = z.object({
  cop1Vehicle: z.string({ message: "Vehicle is required" }),
  cop2Vehicle: z.string({ message: "Vehicle is required" }),
  cop3Vehicle: z.string({ message: "Vehicle is required" }),
});

export type VehicleSelectionSchema = z.infer<typeof schema>;

export default function VehicleSelectionPage() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VehicleSelectionSchema>({
    resolver: zodResolver(schema),
  });

  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ["vehicles"],
    queryFn: () => getVehicles(),
  });

  const selectedValues = watch(["cop1Vehicle", "cop2Vehicle", "cop3Vehicle"]);

  const onSubmit = async (data: VehicleSelectionSchema) => {
    try {
      const result = await saveVehicleSelections(
        data.cop1Vehicle,
        data.cop2Vehicle,
        data.cop3Vehicle
      );

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push("/result");
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
        Select Vehicles for Each Cop
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-full sm:w-auto"
      >
        {vehicleSelectData.map(({ key, label, image }) => (
          <div key={key} className="flex flex-col w-full sm:w-[300px]">
            <SelectComponent
              name={key}
              control={control}
              label={label}
              image={image}
              options={vehicles.map((vehicle) => ({
                id: vehicle.id.toString(),
                label: `${vehicle.kind} (${vehicle.range} KM)`,
              }))}
              error={errors[key as keyof VehicleSelectionSchema]?.message}
              placeholder="Select a vehicle"
              isLoading={isLoading}
              selectedValues={selectedValues}
            />

            {errors[key as keyof VehicleSelectionSchema] && (
              <p className="text-red-400 text-xs">
                {errors[key as keyof VehicleSelectionSchema]?.message}
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
