"use Client";

import Image from "next/image";
import React from "react";

interface LogoProps {
  isText: boolean;
  width: number | undefined;
  height: number | undefined;
}

const Logo: React.FC<LogoProps> = ({ isText, width, height }) => {
  return (
    <>
      <Image
        src={`/logo-light${isText ? "-text" : ""}.png`}
        className="mb-4 dark:hidden"
        width={width || 150}
        height={height || 100}
        alt="Syncora"
      />
      <Image
        src={`/logo-dark${isText ? "-text" : ""}.png`}
        className="mb-4 not-dark:hidden"
        width={width || 150}
        height={height || 100}
        alt="Syncora"
      />
    </>
  );
};

export default Logo;
