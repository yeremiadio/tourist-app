import React, { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return <div className="container mx-auto px-4">{children}</div>;
};

export default Layout;
