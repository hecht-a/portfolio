import React, { ComponentProps } from "react";

export function Food({ dot }: ComponentProps<any>) {
  const style = {
    left: `${dot[0]}%`,
    top: `${dot[1]}%`,
  };

  return <div className="snake-food" style={style} />;
}
