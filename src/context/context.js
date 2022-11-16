import React, { useState, createContext } from "react";
import { getData } from "../async_storage/storage";
import { useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setuser] = React.useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  async function get_user() {
    const temp_id = await getData("user_id");
    if (temp_id === undefined || temp_id === "") {
      setIsRegistered(false);
    } else {
      setIsRegistered(true);
      axios
        .get(`http://188.166.229.156:3000/user/${temp_id}`)
        .then((response) => {
          console.log(response.data, "get user");
          setuser(response.data);
        });
    }
  }
  console.log(isRegistered, "context");
  useEffect(() => {
    get_user();
  }, []);
  function set_signedin(status) {
    setIsRegistered(status);
  }
  return (
    <UserContext.Provider
      value={{
        user,
        isRegistered,
        set_signedin,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
