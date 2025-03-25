import React from "react";

interface LogoProps {
  theme: string;
  isText: boolean;
}

const Logo: React.FC<LogoProps> = ({ theme, isText }) => {
  const imgSrc = `logo-${theme}` + (isText ? "-text" : "") + ".png";
  return (
    <img src={imgSrc} alt="logo" width={150} height={100} className="mb-4" />
  );
};

export default Logo;
