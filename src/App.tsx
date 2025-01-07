import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/side-bar/SidebarComponent";
import BasicResponsive from "./pages/responsive/ResponsivePage";
import BasicContainer from "./pages/container/ContainerPage";
import TilingSpritePage from "./pages/tiling-sprite/TilingSpritePage";
import GraphicsPage from "./pages/graphics/GraphicsPage";
import TextPage from "./pages/Text/TextPage";
import DraggingPage from "./pages/dragging/DraggingPage";

const items = [
  {
    id: "0",
    title: "Basic Responsive",
    element: <BasicResponsive />,
  },
  {
    id: "1",
    title: "Basic Container",
    element: <BasicContainer />,
  },
  // {
  //   id: "3",
  //   title: "Blend Modes",
  //   element: <BasicResponsive />,
  // },
  {
    id: "3",
    title: "Tiling Sprite",
    element: <TilingSpritePage />,
  },
  {
    id: "5",
    title: "Text",
    element: <TextPage />,
  },
  {
    id: "6",
    title: "Graphics",
    element: <GraphicsPage />,
  },
  {
    id: "7",
    title: "Dragging",
    element: <DraggingPage />,
  },
];

function App() {
  return (
    <div className="app">
      <Router>
        <Sidebar items={items}/>
        <Routes>
          {items.map((item: any, index: number) => (
            <Route
              key={`item-${index}`}
              path={item.title.toLowerCase()}
              element={item.element}
            />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
