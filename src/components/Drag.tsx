import { ComponentProps, useState } from "react";
import Draggable from "react-draggable";

export function Drag(props: ComponentProps<any>) {
  let [activeDrags, setActiveDrags] = useState(0);

  const onStart = () => {
    setActiveDrags(activeDrags + 1);
  };

  const onStop = () => {
    setActiveDrags(activeDrags - 1);
  };
  const dragHandlers = { onStart, onStop };

  return (
    <Draggable {...dragHandlers} handle={props.handle} bounds={props.bounds}>
      <div
        className={`box ${props.class ?? ""}`}
        style={{
          ...props.customStyle,
          position: "absolute",
          top: "100px",
          left: "100px",
        }}>
        {props.children}
      </div>
    </Draggable>
  );
}
