"use server";

import prisma from "@/lib/db";

export async function checkCapture() {
  const cities = await prisma.city.findMany();
  const fugitiveCity = cities[Math.floor(Math.random() * cities.length)];

  const cops = await prisma.cop.findMany({
    include: { city: true, vehicle: true },
  });

  const capturingCop = cops.find(
    (cop) =>
      cop.city.id === fugitiveCity.id &&
      (cop.vehicle?.range ?? 0) >= cop.city.distance * 2
  );

  return capturingCop ? capturingCop : null;
}
