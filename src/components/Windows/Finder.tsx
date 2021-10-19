import React, { ComponentProps, useCallback } from "react";

import { Buttons } from "../Buttons";
import { Drag } from "../Drag";

export function Finder({ closeWindow, id, name, changeHeader }: ComponentProps<any>) {
  const handle = useCallback((e) => {
    closeWindow(Number(e.target.id));
  }, []);

  return (
    <Drag class="finder" handle=".header__finder" bounds="parent">
      <div className="sidebar__finder" onClick={changeHeader}>
        <Buttons windowId={id} handle={handle} />
        <div className="items">{name}</div>
      </div>
      <div className="content__finder" onClick={changeHeader}>
        <div className="header__finder"></div>
      </div>
    </Drag>
  );
}
