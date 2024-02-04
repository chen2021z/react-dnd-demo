import { useState } from "react";
import CustomDrag from "./components/CustomDrag";
import CustomDrop from "./components/CustomDrop";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const dndList = [
  { label: "标签1", value: "值1" },
  { label: "标签2", value: "值2" },
  { label: "标签3", value: "值3" },
  { label: "标签4", value: "值4" },
  { label: "标签5", value: "值5" },
];

const DndPage = () => {
  const [list, setList] = useState(dndList);
  const dropChange = (res: any[]) => {
    const valList = (res || []).map((item) => item?.value);
    const filterList = dndList.filter((item) => !valList.includes(item.value));
    setList(filterList);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <span>请拖拽：</span>
        <div style={{ border: "1px solid #000", minHeight: "200px" }}>
          {list.map((item) => {
            return <CustomDrag key={item?.value} data={item} />;
          })}
        </div>
        <div style={{ marginTop: "10px" }}>请放置：</div>
        <CustomDrop onChange={dropChange} />
      </div>
    </DndProvider>
  );
};

function App() {
  return (
    <div className="App">
      <DndPage></DndPage>
    </div>
  );
}

export default App;
