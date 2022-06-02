import { createContext, useContext, useState } from "react";

const UserLoggedContext = createContext({});

export function UserLoggedProvider({ children }) {

  const [saveDataUser, setDataStorage] = useState(() => {
    const dataUserStorage = JSON.parse(localStorage.getItem("@dataUser"));
    if (dataUserStorage) {
      return dataUserStorage;
    }
    return {};
  });

 
  function saveDataUserLogged(data) {
    setDataStorage(data);
    localStorage.setItem("@dataUser", JSON.stringify(data));
  }

  return (
    <UserLoggedContext.Provider
      value={{ saveDataUserLogged, saveDataUser }}
    >
      {children}
    </UserLoggedContext.Provider>
  );
}

const useUserLogged = () => useContext(UserLoggedContext)
export { useUserLogged }


