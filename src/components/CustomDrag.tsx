import React from "react";
import type { FC } from "react";
import { useDrag } from "react-dnd";

interface CustomDragProps {
  data?: any;
}

const CustomDrag: FC<CustomDragProps> = ({ data }) => {
  const [{ opacity }, dragRef] = useDrag({
    type: "Field",
    item: { ...data },
    collect: (monitor) => {
      // console.log("monitor", monitor);
      // console.log(monitor.getItem());
      
      return { opacity: monitor.isDragging() ? 0.5 : 1 };
    },
    // isDragging: (monitor) => {
    //   return true
    // },
    end: (...arg) => {
      console.log("drag end", arg);
    },
  });
  // console.log('drag', dragRef);
  

  return (
    <div ref={dragRef} style={{ opacity, cursor: "move" }}>
      {data?.label}
    </div>
  );
};

export default CustomDrag;
