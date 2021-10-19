import { UIEvent } from "react";

export type HTMLElementEvent<E extends UIEvent, T extends HTMLElement> = E & {
  target: T;
};
