import { FC, Fragment, ReactNode } from "react";
import Navbar from "../Navigations/Navbar";
import { motion } from "framer-motion";
interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <Navbar />
      <main className="pt-24 bg-gray-50">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            initial: {
              opacity: 0,
            },
            animate: {
              opacity: 1,
            },
          }}
        >
          {children}
        </motion.div>
      </main>
    </Fragment>
  );
};

export default Layout;
