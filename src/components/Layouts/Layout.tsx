import { FC, Fragment, ReactNode } from "react";
import Navbar from "../Navigations/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <Navbar />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;
