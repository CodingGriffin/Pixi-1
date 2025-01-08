import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/side-bar/SidebarComponent";
import BasicResponsive from "./pages/responsive/ResponsivePage";
import BasicContainer from "./pages/container/ContainerPage";
import TilingSpritePage from "./pages/tiling-sprite/TilingSpritePage";
import GraphicsPage from "./pages/graphics/GraphicsPage";
import TextPage from "./pages/Text/TextPage";
import DraggingPage from "./pages/dragging/DraggingPage";
import SliderPage from "./pages/slider/SliderPage";
import AnimatedSpritePage from "./pages/animated-sprite/AnimatedSpritePage";
import BlendModePage from "./pages/blendmode/BlendModePage";
import { useEffect, useState } from "react";

// Define a type for the items
interface MenuItem {
  id: string;
  title: string;
  element: any;
}

function App() {
  // Explicitly type the state to MenuItem[]
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    setItems([
      { id: "0", title: "Basic Responsive", element: <BasicResponsive /> },
      { id: "1", title: "Basic Container", element: <BasicContainer /> },
      { id: "2", title: "Blend Modes", element: <BlendModePage /> },
      { id: "3", title: "Tiling Sprite", element: <TilingSpritePage /> },
      { id: "4", title: "Animated Sprite", element: <AnimatedSpritePage /> },
      { id: "5", title: "Text", element: <TextPage /> },
      { id: "6", title: "Graphics", element: <GraphicsPage /> },
      { id: "7", title: "Dragging", element: <DraggingPage /> },
      { id: "8", title: "Slider", element: <SliderPage /> },
    ]);
  }, []);

  return (
    <div className="app">
      <Router>
        <Sidebar items={items} />
        <Routes>
          {items.map((item) => (
            <Route
              key={item.id}
              path={item.title} // Ensure unique paths
              element={item.element}
            />
          ))}
          <Route path="/" element={items[0].element} /> {/* Fallback route */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
