import React from "react";
import { AppRouter } from "./router/AppRouter";
import { UserProvider } from "./context/UserProvider";

export const App = () => {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  )
}

