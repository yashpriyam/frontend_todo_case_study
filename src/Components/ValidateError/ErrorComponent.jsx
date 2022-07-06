import React from "react";

const ErrorComponent = ({ error }) => {
  return (
    <>
      <small style={{ color: "red", display: "flex", marginBottom: "15px" }}>
        * {error}
      </small>
    </>
  );
};

export { ErrorComponent };
