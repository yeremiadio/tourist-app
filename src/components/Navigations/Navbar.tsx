import React from "react";
import { useAppSelector } from "../../redux/hooks";
import UserDropdown from "../Dropdowns/UserDropdown";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <header className="fixed w-full z-40 top-0">
      <nav className="bg-white w-full border-b border-gray-200">
        <div className="container mx-auto p-4 md:px-12 py-5">
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
