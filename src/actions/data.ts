"use server";

import prisma from "@/lib/db";

export async function getCities() {
  const cities = await prisma.city.findMany();
  return cities;
}

export async function getVehicles() {
  const vehicles = await prisma.vehicle.findMany();

  return vehicles.flatMap((vehicle) =>
    Array.from({ length: vehicle.count }, (_, index) => ({
      id: `${vehicle.id}-${index}`,
      kind: vehicle.kind,
      range: vehicle.range,
      originalId: vehicle.id,
    }))
  );
}

export async function saveVehicleSelections(
  cop1VehicleId: string,
  cop2VehicleId: string,
  cop3VehicleId: string
) {
  try {
    await prisma.cop.updateMany({
      where: { name: "Cop 1" },
      data: { vehicleId: Number(String(cop1VehicleId).split("-")[0]) },
    });
    await prisma.cop.updateMany({
      where: { name: "Cop 2" },
      data: { vehicleId: Number(String(cop2VehicleId).split("-")[0]) },
    });
    await prisma.cop.updateMany({
      where: { name: "Cop 3" },
      data: { vehicleId: Number(String(cop3VehicleId).split("-")[0]) },
    });

    return { success: true };
  } catch {
    return { error: "Something went wrong while updating vehicle selections" };
  }
}

export async function saveCitySelections(
  cop1CityId: number,
  cop2CityId: number,
  cop3CityId: number
) {
  try {
    await prisma.cop.deleteMany();
    await prisma.cop.createMany({
      data: [
        {
          name: "Cop 1",
          cityId: cop1CityId,
        },
        {
          name: "Cop 2",
          cityId: cop2CityId,
        },
        {
          name: "Cop 3",
          cityId: cop3CityId,
        },
      ],
    });
    return { success: true };
  } catch {
    return { error: "Something went wrong while updating city selections" };
  }
}
