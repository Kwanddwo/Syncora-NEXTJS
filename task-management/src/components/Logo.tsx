"use Client";

import Image from "next/image";
import React from "react";

interface LogoProps {
  isText: boolean;
  width?: number;
  height?: number;
  hasBottomGutter?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  isText,
  width,
  height,
  hasBottomGutter,
}) => {
  const bottomGutter = hasBottomGutter ? " mb-4" : "";

  return (
    <>
      <Image
        src={`/logo-light${isText ? "-text" : ""}.png`}
        className={"dark:hidden" + bottomGutter}
        width={width || 150}
        height={height || 100}
        alt="Syncora"
      />
      <Image
        src={`/logo-dark${isText ? "-text" : ""}.png`}
        className={"not-dark:hidden" + bottomGutter}
        width={width || 150}
        height={height || 100}
        alt="Syncora"
      />
    </>
  );
};

export default Logo;
