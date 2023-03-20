import React from "react";

const Logo = () => {
  return (
    <header>
      <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="Logo" />
    </header>
  );
};

export default Logo;
