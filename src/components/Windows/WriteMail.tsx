import React, { ComponentProps } from "react";

import { Buttons } from "../Buttons";
import { Drag } from "../Drag";
import { PaperPlane } from "../icons/PaperPlane";

export function WriteMail({ closeMini }: ComponentProps<any>) {
  return (
    <Drag class="mini__mail" handle=".header__mini__mail">
      <div className="header__mini__mail">
        <Buttons handle={closeMini} />
        <button className="send">
          <PaperPlane />
        </button>
      </div>
      <div className="content__mini__mail">
        <div className="form">
          <div id="for">
            <label>À : </label>
            <input type="text" />
          </div>
          <div id="cc">
            <label>Cc : </label>
            <input type="text" />
          </div>
          <div id="object">
            <label>Objet : </label>
            <input type="text" />
          </div>
          <div id="from">
            <label>De : </label>
            <input type="text" />
          </div>
        </div>
        <textarea name="content" id="content" />
      </div>
    </Drag>
  );
}
