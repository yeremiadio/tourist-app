import React from "react";
import { useAppSelector } from "../../redux/hooks";
import UserDropdown from "../Dropdowns/UserDropdown";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <header className="sticky top-0 z-40">
      <nav className="bg-white w-full border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between">
            <div>Tourist App</div>
            <div>
              <UserDropdown avatar={user.avatar} name={user.name} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
