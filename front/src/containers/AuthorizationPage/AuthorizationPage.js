import React from "react";
import UserForm from "../../components/UserForm/UserForm";
import LockRoundedIcon from '@material-ui/icons/LockRounded';

const AuthorizationPage = () => {
  return (
    <UserForm title="Sing in" icon={<LockRoundedIcon />} color="red" />
  );
};

export default AuthorizationPage;
