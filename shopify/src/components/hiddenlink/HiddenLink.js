import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIN } from "../../redux/slice/authSlice";
const ShowOnlogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIN);
  if (isLoggedIn) {
    return children;
  } else return null;
};
export const ShowOnlogOut = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIN);
  if (!isLoggedIn) {
    return children;
  } else return null;
};

export default ShowOnlogin;
