import React, { useEffect, useState } from "react";

interface LogoProps {
  theme: string;
  isText: boolean;
}

const Logo: React.FC<LogoProps> = ({ theme, isText }) => {
  const [clientTheme, setClientTheme] = useState("");

  useEffect(() => {
    setClientTheme(theme); // Ensure theme is set only on the client
  }, [theme]);

  const imgSrc = clientTheme
    ? `logo-${clientTheme}${isText ? "-text" : ""}.png`
    : "";

  return imgSrc ? (
    <img src={imgSrc} alt="logo" width={150} height={100} className="mb-4" />
  ) : null;
};

export default Logo;
