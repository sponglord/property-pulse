"use client"; // without this, for some reason, the spinner won't spin

/**
 * Just by having a page in the app dir called "loading" you automatically get a page
 * that will render whilst other pages load
 */

import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "100px auto",
};

const Loading = ({ loading }) => {
  return (
    <ClipLoader
      color="#3b82f6"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};
export default Loading;
