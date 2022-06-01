import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Subscriptions from "./pages/SubscriptionPage";
import HomePage from "./pages/HomePage";
import PlanPage from "./pages/PlanPage";
import { useState } from "react";

import { UserLoggedProvider } from "./contexts/UserLoggedProvider";

export default function App() {

  const [getDataFromApi, setGetDataFromApi] = useState({})
  console.log(getDataFromApi)

  return (
    <UserLoggedProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/subscriptions/:idPlan" element={<PlanPage setData={setGetDataFromApi} />} />
          <Route path="/home" element={<HomePage data={getDataFromApi}/>} />
        </Routes>
      </BrowserRouter>
    </UserLoggedProvider>
  );
}
