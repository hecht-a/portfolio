import { ComponentProps } from "react";

import siri from "/assets/menu-bar/siri.png";

import { DateHour } from "./DateHour";
import { Apple } from "./icons/Apple";
import { Bluetooth } from "./icons/Bluetooth";
import { Sound } from "./icons/Sound";
import { Spotlight } from "./icons/Spotlight";
import { Switch } from "./icons/Switch";
import { Wifi } from "./icons/Wifi";

export function Header({ items }: ComponentProps<any>) {
  return (
    <div className="header">
      <div className="items__left">
        <p className="apple">
          <Apple />
        </p>
        {items.map((item: string, i: number) => (
          <p key={i} className={i === 0 ? "font-bold" : ""}>
            {item}
          </p>
        ))}
      </div>
      <div className="items__right">
        <p className="svg-icon bluetooth">
          <Bluetooth />
        </p>
        <p className="svg-icon">
          <Sound />
        </p>
        <p className="svg-icon">
          <Wifi />
        </p>
        <p className="svg-icon spotlight">
          <Spotlight />
        </p>
        <p className="svg-icon">
          <Switch />
        </p>
        <p className="siri">
          <img src={siri} alt="" />
        </p>
        <DateHour />
      </div>
    </div>
  );
}
