import React, { useState } from "react";
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

  const postAuthorDataHandler = (data) => dispatch(postAuthorData(data));
  
  const onFormSubmit = (event) => {
    event.preventDefault();
    postAuthorDataHandler(currentAuthorData);
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
  return (
    <AuthorForm
      author={currentAuthorData}
      onChange={onFormChange}
      onSubmit={onFormSubmit}
      error={state.error?.errors}
    />
  );
};

export default AddAuthorPage;
