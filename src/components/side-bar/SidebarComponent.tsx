import React, { useState } from 'react';
import styles from './SidebarComponent.module.css';
import { useNavigate } from 'react-router-dom';

interface SidebarItem {
  id: string;
  title: string;
  children?: SidebarItem[];
}

interface SidebarProps {
  items: SidebarItem[];
  onSelect: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ items, onSelect }) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className={styles["sidebar"]}>
      {items.map((item) => (
        <div key={item.id} className={styles["sidebar-item"]}>
          <div
            className={styles["sidebar-item-title"]}
            onClick={() => navigate(item.title.toLowerCase())}
          >
            {item.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
