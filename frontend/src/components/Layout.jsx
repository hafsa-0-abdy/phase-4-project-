import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="page-container">
      <Navbar />
      <main className="container">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
