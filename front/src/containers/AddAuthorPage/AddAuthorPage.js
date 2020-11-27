import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthorForm from "../../components/AuthorForm/AuthorForm";
import { postAuthorData } from "../../store/author/authorAction";

const AddAuthorPage = () => {
  const [currentAuthorData, setCurrentAuthorData] = useState({
    name: "",
    image: null,
  });
  const dispatch = useDispatch();
  const state = useSelector((state) => state.music);
  const userState = useSelector((state) => state.user);

  const postAuthorDataHandler = (data) => dispatch(postAuthorData(data));

  const onFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.keys(currentAuthorData).forEach((key) => {
      formData.append(key, currentAuthorData[key]);
    });
    postAuthorDataHandler(formData);
  };

  const onFormChange = (event) => {
    const { name } = event.target;
    let value;
    switch (name) {
      case "image":
        value = event.target.files[0];
        break;
      default:
        value = event.target.value;
    }
    setCurrentAuthorData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log("Add author!");
  return (
    <AuthorForm
      author={currentAuthorData}
      onChange={onFormChange}
      onSubmit={onFormSubmit}
      error={state.error?.error}
    />
  );
};

export default AddAuthorPage;
