import React from "react";
import UserForm from "../../components/UserForm/UserForm";
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';

const RegistrationPage = () => {

  return <UserForm title="Sing up" icon={<LockOpenRoundedIcon />} color="blue" />;
};

export default RegistrationPage;
