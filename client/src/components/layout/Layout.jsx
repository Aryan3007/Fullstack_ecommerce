import PropTypes from "prop-types";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="fixed w-full z-50">
        <Navbar />
      </div>
      <main>
        <Toaster />
        {children}
      </main>
     
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
