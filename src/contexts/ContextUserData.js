import { useContext, createContext, useState } from "react";

const UserDataContext = createContext({});

export function UserDataProvider({ children }) {
    
  const [infoUser, setInfoUser] = useState(() => {
    const dataInfoStorage = JSON.parse(localStorage.getItem("@infoUser"));
    if (dataInfoStorage) {
      return dataInfoStorage;
    }
    return {};
  });

  function addInfoOnUser(data) {
    setInfoUser(data);
    localStorage.setItem("@infoUser", JSON.stringify(data));
  }
  return (
    <UserDataContext.Provider
      value={{ addInfoOnUser, setInfoUser, infoUser }}
    >
      {children}
    </UserDataContext.Provider>
  );

}

const useUserData = () => useContext(UserDataContext)
export { useUserData }

