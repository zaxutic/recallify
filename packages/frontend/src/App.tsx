import "twin.macro";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import BackgroundGlow from "components/BackgroundGlow";
import NavBar from "components/Navbar";
import Landing from "pages/landing";
import ProductPage from "pages/product";
import Profile from "pages/profile";
import Receipts from "pages/receipts";

const routes = [
  <Route key="/" path="/" element={<Landing />} />,
  <Route key="product" path="/product/:id" element={<ProductPage />} />,
  <Route key="receipts" path="/receipts" element={<Receipts />} />,
  <Route key="profile" path="/profile" element={<Profile />} />,
];

const App = () => (
  <div tw="flex flex-col h-screen">
    <BrowserRouter>
      <main tw="flex flex-col gap-4 flex-1 p-9 pb-28">
        <BackgroundGlow />
        <Routes>{routes}</Routes>
      </main>
      <NavBar />
    </BrowserRouter>
  </div>
);

export default App;
