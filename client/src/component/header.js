import React from "react";
import "./styles/Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header__left">
        <img
          className="header__logo"
          src="https://agriha.arclif.com/_next/image?url=%2FarclifLogo.png&w=128&q=75"
          alt="Arclif Logo"
        />
        <div className="header__logo_one">
          <img
            src="https://agriha.arclif.com/_next/image?url=%2Fone.png&w=16&q=75"
            alt=""
          />
        </div>
        <img
          className="header__logo"
          src="https://agriha.arclif.com/_next/image?url=%2FagrihaLogo.png&w=128&q=75"
          alt="agriha Logo"
          width={110}
          height={90}
        />
      </div>
      <div className="header__right">
        <div className="loginButton__header">
          <p>LOG OUT</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
