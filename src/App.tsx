import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import BasicResponsive from "./pages/basic/responsive/ResponsivePage";
import BasicContainer from "./pages/basic/container/ContainerPage";
import Sidebar from "./components/side-bar/SidebarComponent";
import "./App.css";

const items = [
  {
    id: "1",
    title: "Basic",
    children: [
      { id: "1-1", title: "Responsive", element: <BasicResponsive /> },
      { id: "1-2", title: "Container", element: <BasicContainer /> },
    ],
  },
  {
    id: "2",
    title: "Advanced",
    children: [
      { id: "2-1", title: "Slots" },
      { id: "2-2", title: "Scratch Card" },
    ],
  },
  {
    id: "3",
    title: "Sprite",
  },
];

function App() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const handleSelect = (id: string) => {
    setSelectedItem(id);
    console.log("Selected Item:", selectedItem);
  };

  return (
    <div className="app">
      <Router>
        <Sidebar items={items} onSelect={handleSelect} />
        <Routes>
          {items.map((item: any, index: number) => (
            <Route key={`item-${index}`} path={item.title}>
              {item.children &&
                item.children.map((child: any, id: number) => (
                  <Route
                    key={`child-${index}-${id}`}
                    path={child.title}
                    element={child.element}
                  />
                ))}
            </Route>
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
