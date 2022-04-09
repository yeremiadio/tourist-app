import { FC, Fragment, ReactNode } from "react";
import Navbar from "../Navigations/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <Navbar />
      <div className="container mx-auto">{children}</div>
    </Fragment>
  );
};

export default Layout;
