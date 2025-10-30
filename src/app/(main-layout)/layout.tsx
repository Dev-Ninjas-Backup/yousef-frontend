import { ReactNode } from "react";
import Footer from "@/components/shared/main/Footer/Footer";
import Navbar from "@/components/shared/main/Navbar/Navbar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="p-3"> {children}</div>

      <Footer />
    </div>
  );
};

export default MainLayout;
