import React, { useState } from "react";
import UserForm from "../../components/UserForm/UserForm";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import { authorization, registration } from "../../store/user/userActions";

const AuthorizationPage = () => {
  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const authorizationHandler = async (data) => dispatch(authorization(data));
  const [currentUser, setCurrentUser] = useState({
    username: "",
    password: "",
  });
  const onChange = (event) => {
    const { value, name } = event.target;
    setCurrentUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await authorizationHandler(currentUser);
    setCurrentUser((prevState) => ({
      ...prevState,
      password: "",
    }));
  };
  return (
    <UserForm
      title="Sing in"
      icon={<LockOutlinedIcon />}
      error={state.authorizationError?.error}
      user={currentUser}
      color="red"
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default AuthorizationPage;
