import { LocationMarkerIcon } from "@heroicons/react/solid";
import { FC } from "react";
import Tourist from "../../model/Tourist";

const TouristCard: FC<Tourist> = (props) => {
  const {
    id,
    tourist_email,
    tourist_location,
    tourist_name,
    tourist_profilepicture,
  } = props;
  return (
    <div
      className="border transition-all delay-[20ms] hover:scale-105 border-gray-50 shadow rounded-md p-6 w-full bg-white flex flex-col justify-center md:justify-start md:flex-row gap-3 flex-1 items-center"
      key={id}
    >
      <img
        src={tourist_profilepicture}
        alt={tourist_name}
        className="rounded-full w-16 h-16 object-cover"
      />
      <div className="text-center md:text-left space-y-1">
        <span className="text-black-secondary font-bold text-base">
          {tourist_name}
        </span>
        <p className="text-sm break-all break-words text-black-secondary text-opacity-60">
          {tourist_email}
        </p>
        <div className="flex justify-center md:justify-start items-center gap-1 text-black-secondary text-opacity-80">
          <LocationMarkerIcon className="w-4 h-4" />
          <p className="text-[12px] mt-[2px]">{tourist_location}</p>
        </div>
      </div>
    </div>
  );
};

export default TouristCard;
