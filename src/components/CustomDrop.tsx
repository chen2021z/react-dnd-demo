import React, { useState } from "react";
import type { FC } from "react";
import { useDrop } from "react-dnd";
import DropItem from "./DropItem";

interface CustomDropProps {
  onChange?: (res: any[]) => void;
}

const CustomDrop: FC<CustomDropProps> = ({ onChange }) => {
  const [value, setValue] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "Field",
    drop: (item) => {
      const targetValue = [...value];
      targetValue.push(item);
      // console.log("targetValue", targetValue);

      setValue(targetValue);
      onChange(targetValue);
    },
    collect: (monitor) => {
      // console.log("collect", monitor);

      return {
        // 拖拽物掠过元素触发的回调方法，options表示拖拽物的options信息
        isOver: monitor.isOver(),

        // 判断拖拽物是否可以放置，返回一个bool值
        canDrop: monitor.canDrop(),
      };
    },
    canDrop: (item: any) => {
      setError(undefined);
      const filter = value.filter((it) => it.value === item.value);
      if (!!filter.length) {
        setError("数据已经被放置");
        return false;
      }
      return true;
    },
  });
  // console.log('drop', drop);
  

  const showCanDrop = () => {
    if (error && isOver) return <div>{error}</div>;
    if (canDrop && !isOver && !value.length) return <div>请拖拽到此处</div>;
  };

  const moveRow = (ind: number, inx: number) => {
    // 原 ind位置的 item 放到了 inx 的 item 下
    setValue((val: any[]) => {
      const newValue = val.slice();
      newValue.splice(inx, 1, ...newValue.splice(ind, 1, val[inx]));
      return newValue;
    });
  };

  const delItem = (ind: number) => {
    const newValue = [...value];
    newValue.splice(ind, 1);
    setValue(newValue);
    onChange(newValue);
  };

  const showValue = () => {
    return value.map((item, index: number) => {
      return (
        <DropItem
          key={item?.value}
          data={item}
          moveRow={moveRow}
          index={index}
          delItem={delItem}
        />
      );
    });
  };

  return (
    <div
      ref={drop}
      style={{
        border: "1px solid #000",
        marginTop: "10px",
        minHeight: "200px",
        background: error && isOver ? "red" : "#fff",
      }}
    >
      {showCanDrop()}
      {showValue()}
    </div>
  );
};

export default CustomDrop;
