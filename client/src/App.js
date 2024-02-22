import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FirstStep from "./components/FirstStep";
import SecondStep from "./components/SecondStep";
import ThirdStep from "./components/ThirdStep";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({});

  const updateUser = (data) => {
    setUser((prevUser) => ({ ...prevUser, ...data }));
  };

  const resetUser = () => {
    setUser({});
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <FirstStep user={user} updateUser={updateUser} />,
    },
    {
      path: "/second",
      element: <SecondStep user={user} updateUser={updateUser} />,
    },
    {
      path: "/third",
      element: <ThirdStep user={user} />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
