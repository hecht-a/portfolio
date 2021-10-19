import { ComponentProps, MouseEvent, UIEvent } from "react";

import { HTMLElementEvent } from "../types";

type HoverEvent<T extends UIEvent> = HTMLElementEvent<T, HTMLImageElement> & T;

export function Dock(props: ComponentProps<any>) {
  const hover = (e: HoverEvent<MouseEvent<HTMLImageElement>>) => {
    const target = e.target;
    const childrenContainer = target.parentNode!.parentNode as HTMLDivElement;
    const prev = (target.parentNode as HTMLButtonElement)!
      .previousElementSibling as HTMLButtonElement | null;
    const next = (target.parentNode as HTMLButtonElement)!
      .nextElementSibling as HTMLButtonElement | null;
    childrenContainer.style.gap = "5px";
    if (prev) {
      const prevPrev = prev.previousElementSibling as HTMLButtonElement | null;
      prev.style.transition = "ease-in-out 0.2s";
      prev.style.transform = "scale(1.3)";
      prev.style.position = "relative";
      prev.style.bottom = "15px";
      if (prevPrev) {
        prevPrev.style.transition = "ease-in-out 0.2s";
        prevPrev.style.transform = "scale(1.1)";
        prevPrev.style.position = "relative";
        prevPrev.style.bottom = "10px";
      }
    }
    if (next) {
      const nextNext = next.previousElementSibling as HTMLButtonElement | null;
      next.style.transition = "ease-in-out 0.2s";
      next.style.transform = "scale(1.3)";
      next.style.position = "relative";
      next.style.bottom = "15px";
      if (nextNext) {
        nextNext.style.transition = "ease-in-out 0.2s";
        nextNext.style.transform = "scale(1.1)";
        nextNext.style.position = "relative";
        nextNext.style.bottom = "15px";
      }
    }
  };

  const noHover = (e: HoverEvent<MouseEvent<HTMLImageElement>>) => {
    const target = e.target;
    const childrenContainer = target.parentNode!.parentNode as HTMLDivElement;
    childrenContainer.style.gap = "";
    for (let i = 0; i < childrenContainer.children.length; i++) {
      const elem = childrenContainer.children.item(i) as HTMLButtonElement;
      elem.style.transform = "";
      elem.style.position = "";
      elem.style.bottom = "";
    }
  };
  return (
    <div className="dock">
      {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
      <div className="children" onMouseEnter={hover} onMouseOut={noHover}>
        {props.children}
      </div>
    </div>
  );
}
