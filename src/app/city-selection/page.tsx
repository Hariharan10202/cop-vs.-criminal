import CitySelectionPage from "@/components/city-selection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "City Selection - Cop vs Criminal",
  description: "Select cities for each cop before proceeding.",
};

const page = () => {
  return (
    <div className="px-5">
      <CitySelectionPage />
    </div>
  );
};

export default page;
