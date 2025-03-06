import VehicleSelectionPage from "@/components/vehicle-selection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehicle Selection - Cop vs Criminal",
  description: "Select vehicles for each cop before proceeding.",
};

const page = () => {
  return (
    <div className="px-5">
      <VehicleSelectionPage />
    </div>
  );
};

export default page;
