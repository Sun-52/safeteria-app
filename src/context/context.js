import React, { useState, createContext } from "react";
import { getData, storeData } from "../async_storage/storage";
import { useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setuser] = React.useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  async function checkIssignedin() {
    const tempId = await getData("user_id");
    console.log(tempId, "test temp ids");
    console.log(user, "test user");
    if (tempId !== undefined || tempId !== "") {
      setIsRegistered(true);
      axios
        .get(`http://188.166.229.156:3000/user/${tempId}`)
        .then((response) => {
          console.log(response.data, "test useeffect users");
          setuser(response.data);
        });
    }
  }
  useEffect(() => {
    checkIssignedin();
    console.log(isRegistered, "check is registered");
  }, []);
  function set_signedin(status) {
    setIsRegistered(status);
  }
  function logIn(email) {
    axios
      .get(`http://188.166.229.156:3000/user/auth/${email}`)
      .then(async (response) => {
        console.log(response.data, "test log in response");
        await storeData(response.data._id, "user_id");
        setuser(response.data);
        setIsRegistered(true);
      });
  }

  function singUp(email, name) {
    axios
      .post("http://188.166.229.156:3000/user/auth", {
        email: email,
        name: name,
        money: 0,
      })
      .then(async (response) => {
        console.log(response.data, "test sign up response");
        await storeData(response.data._id, "user_id");
        setuser(response.data);
        setIsRegistered(true);
      });
  }
  return (
    <UserContext.Provider
      value={{ user, isRegistered, set_signedin, logIn, singUp }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
