import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
// import '../index.less';

const style = {
  width: '100px',
  height: '100px',
  cursor: 'move',
  // border: '1px solid',
  backgroundColor: 'skyblue',
  zIndex: 100,
  margin: '5px',
  // transition: 'transform 5s ease'
};
export const Item: React.FC<any> = ({ id, text, index, moveCard }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    //定义拖拽的类型
    accept: 'field',
    hover: (item: any, monitor) => {
      // console.log('hover', item, index);

      //异常处理判断
      if (!ref.current) {
        return;
      }
      //拖拽目标的Index
      const dragIndex = item.index;

      //放置目标Index
      const hoverIndex = index;
      // 如果拖拽目标和放置目标相同的话，停止执行
      if (dragIndex === hoverIndex) {
        return;
      }
      //如果不做以下处理，则卡片移动到另一个卡片上就会进行交换，下方处理使得卡片能够在跨过中心线后进行交换.
      //获取卡片的边框矩形
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // console.log(hoverBoundingRect);

      // item元素一半的高
      const halfHeight = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // console.log(hoverBoundingRect.top, 88888);

      // item元素一半的宽
      const halfWidth = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      //获取拖拽目标偏移量
      const { x, y } = monitor.getClientOffset();
      // console.log(x, y);

      const hoverClientY = y - hoverBoundingRect.top;
      const hoverClientX = x - hoverBoundingRect.left;
      // console.log(hoverClientY, 'hoverClientY');

      // 从上往下放置
      // if (dragIndex < hoverIndex && hoverClientY < halfHeight) {
      //   return;
      // }
      // // 从下往上放置
      // if (dragIndex > hoverIndex && hoverClientY > halfHeight) {
      //   return;
      // }
      // 从左往右放置
      if (dragIndex < hoverIndex && hoverClientX < halfWidth) {
        return;
      }
      // 从右往左放置
      if (dragIndex > hoverIndex && hoverClientX > halfWidth) {
        return;
      }
      moveCard(dragIndex, hoverIndex); //调用方法完成交换
      item.index = hoverIndex; //重新赋值index，否则会出现无限交换情况
    },
  });

  const [{ draggingState }, drag] = useDrag({
    type: 'field',
    item: { id, index },
    collect: (monitor) => ({
      draggingState: monitor.isDragging(),
    }),
    end: (...arg) => {
      console.log('drag end', arg);
    },
  });
  const opacity = draggingState ? 0.5 : 1;
  // const zIndex = isDragging ? 101 : 100;
  // const backgroundColor = isDragging ? 'black' : 'skyblue';

  // const display = isDragging ? 'none' : 'block'
  drag(drop(ref));

  // console.log('ref', ref);

  return (
    <div
      style={{ opacity, boxSizing: 'border-box', position: 'relative' }}
      
    >
      <div
        ref={ref}
        style={{ ...style }}
        onDrag={(e) => {
          // e.stopPropagation();
          // e.preventDefault();
          // console.log('onDrag');
        }}
        onDragOver={(e) => {
          // e.stopPropagation();
          // e.preventDefault();
          // console.log('onDragOver');
        }}
      >
        <span style={{ float: 'left' }}>{index + 1}.</span>
        <div className="stem" dangerouslySetInnerHTML={{ __html: text }}></div>
      </div>
      {/* tip 条 */}
      <div
        className="tip"
        style={{
          width: '3px',
          height: '100%',
          position: 'absolute',
          right: '0',
          top: 0,
          backgroundColor: 'blue',
          display: draggingState ? 'block' : 'none',
        }}
      ></div>
    </div>
  );
};
