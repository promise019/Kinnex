import { createContext, useState } from "react";

export const userDataContext = createContext();

export default function UserDataProvider({ children }) {
  const [userInfo, setUserInfo] = useState();
  return <userDataContext.Provider>{children}</userDataContext.Provider>;
}
