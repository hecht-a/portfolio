import React, { ComponentProps } from "react";

export function Buttons({ handle, windowId }: ComponentProps<any>) {
  return (
    <div className="buttons">
      <div id={windowId} className="close" onClick={handle}>
        <button>x</button>
      </div>
      <div className="minimize">
        <button>-</button>
      </div>
      <div className="zoom">
        <button>+</button>
      </div>
    </div>
  );
}
