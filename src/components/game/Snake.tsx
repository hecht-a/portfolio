import React, { ComponentProps } from "react";

export function Snake(props: ComponentProps<any>) {
  return (
    <div>
      {props.snakeDots.map((dot: any[], i: React.Key | null | undefined) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`,
        };
        return <div className="snake-dot" key={i} style={style} />;
      })}
    </div>
  );
}
