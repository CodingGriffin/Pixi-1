import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
  path: string; // Add a path property
  element: any; // Use JSX.Element for better typing
}

function App() {
  // Explicitly type the state to MenuItem[]
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    setItems([
      { id: "0", title: "Basic Responsive", path: "basic-responsive", element: <BasicResponsive /> },
      { id: "1", title: "Basic Container", path: "basic-container", element: <BasicContainer /> },
      { id: "2", title: "Blend Modes", path: "blend-modes", element: <BlendModePage /> },
      { id: "3", title: "Tiling Sprite", path: "tiling-sprite", element: <TilingSpritePage /> },
      { id: "4", title: "Animated Sprite", path: "animated-sprite", element: <AnimatedSpritePage /> },
      { id: "5", title: "Text", path: "text", element: <TextPage /> },
      { id: "6", title: "Graphics", path: "graphics", element: <GraphicsPage /> },
      { id: "7", title: "Dragging", path: "dragging", element: <DraggingPage /> },
      { id: "8", title: "Slider", path: "slider", element: <SliderPage /> },
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
              path={item.title.toLowerCase()} // Use the path property
              element={item.element}
            />
          ))}
          <Route path="/" element={<Navigate to="/basic responsive" replace />} /> {/* Redirect to a specific route */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
