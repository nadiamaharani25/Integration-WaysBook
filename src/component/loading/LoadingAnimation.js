// Library
import React from "react";
import ClipLoader from "react-loading";

const forLoading = {
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
};

export default function LoadingAnimation() {
  return (
    <>
      <ClipLoader color={"#D60000"} size={100} margin={20} css={forLoading} />
    </>
  );
}
