import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
