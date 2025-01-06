import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/side-bar/SidebarComponent";
import BasicResponsive from "./pages/basic/responsive/ResponsivePage";
import BasicContainer from "./pages/basic/container/ContainerPage";
import TilingSpritePage from "./pages/sprite/tiling-sprite/TilingSpritePage";

const items = [
  {
    id: "1",
    title: "Basic Responsive",
    element: <BasicResponsive />,
  },
  {
    id: "2",
    title: "Basic Container",
    element: <BasicContainer />,
  },
  // {
  //   id: "3",
  //   title: "Blend Modes",
  //   element: <BasicResponsive />,
  // },
  {
    id: "4",
    title: "Tiling Sprite",
    element: <TilingSpritePage />,
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
