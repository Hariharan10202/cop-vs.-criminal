import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed cities
  const cities = [
    { name: "Yapkashnagar", distance: 60 },
    { name: "Lihaspur", distance: 50 },
    { name: "Narmis City", distance: 40 },
    { name: "Shekharvati", distance: 30 },
    { name: "Nuravgram", distance: 20 },
  ];

  for (const city of cities) {
    await prisma.city.upsert({
      where: { name: city.name },
      update: {},
      create: city,
    });
  }

  const vehicles = [
    { kind: "EV Bike", range: 60, count: 2 },
    { kind: "EV Car", range: 100, count: 1 },
    { kind: "EV SUV", range: 120, count: 1 },
  ];

  for (const vehicle of vehicles) {
    await prisma.vehicle.upsert({
      where: { kind: vehicle.kind },
      update: {},
      create: vehicle,
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
