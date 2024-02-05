import React, { useEffect, useState } from "react";
import { Item } from "./Item";
import FlipMove from "react-flip-move";

const getList = (n: number) => {
  return Array.from({ length: n }, (v, k) => k).map((k) => ({
    id: `id-${k}`,
    index: k,
    content: `item-${k}`,
  }));
};

const Container = (props) => {
  const [previewList, setPreviewList] = useState(getList(10));
  // const { previewList, handlePreviewList } = props;

  const handleDND = (dragIndex, hoverIndex) => {
    const newList = [...previewList];
    const tmp = newList[dragIndex]; //临时储存文件
    newList.splice(dragIndex, 1); //移除拖拽项
    newList.splice(hoverIndex, 0, tmp); //插入放置项

    // console.log('previewList', previewList);

    setPreviewList(newList);
  };

  useEffect(() => {
    console.log("previewList", previewList);
  }, [previewList]);

  return (
    <>
      {/* <Flipper flipKey={previewList.map((item) => item.id).join('')}> */}
      <div
        style={{ width: "1000px", overflow: "auto", display: "flex" }}
        onDragOver={(e) => {
          // e.stopPropagation();
          // e.preventDefault();
          // console.log('onDragOver');
        }}
      >
        <FlipMove style={{ display: "flex" }}>
          {previewList.map((item, index) => (
            <div
              style={{ width: "fit-content", height: "fit-content" }}
              key={item.id}
            >
              <Item
                key={item.id}
                index={index}
                id={item.id}
                text={item.content}
                moveCard={handleDND}
              />
            </div>
          ))}
        </FlipMove>
      </div>
      {/* </Flipper> */}
    </>
  );
};
export default Container;
