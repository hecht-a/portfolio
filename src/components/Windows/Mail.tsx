import React, { ComponentProps, ReactElement, useCallback, useState } from "react";

import { Buttons } from "../Buttons";
import { Drag } from "../Drag";
import { PaperPlane } from "../icons/PaperPlane";
import { SquareAndPencil } from "../icons/SquareAndPencil";
import { WriteMail } from "./WriteMail";

export function Mail({ closeWindow, id, name, changeHeader }: ComponentProps<any>) {
  const [window, setWindow] = useState<ReactElement | undefined>(undefined);

  const handle = useCallback((e) => {
    closeWindow(Number(e.target.id));
    changeHeader("finder");
  }, []);

  const closeMini = () => {
    setWindow(undefined);
  };

  const createMini = () => {
    if (window !== undefined) {
      return;
    }
    setWindow(<WriteMail closeMini={closeMini} />);
  };

  return (
    <>
      <Drag class="mail" handle=".header__mail" bounds="parent">
        <div className="sidebar__mail" onClick={changeHeader}>
          <Buttons windowId={id} handle={handle} />
          <div className="items">{name}</div>
        </div>
        <div className="content__mail" onClick={changeHeader}>
          <div className="header__mail">
            <button className="new-mail" onClick={createMini}>
              <SquareAndPencil />
            </button>
          </div>
        </div>
      </Drag>
      {window}
    </>
  );
}
