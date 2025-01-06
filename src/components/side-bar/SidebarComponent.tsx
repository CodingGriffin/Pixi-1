import React from 'react';
import styles from './SidebarComponent.module.css';
import { useNavigate } from 'react-router-dom';

interface SidebarItem {
  id: string;
  title: string;
}

interface SidebarProps {
  items: SidebarItem[];
}

const Sidebar: React.FC<SidebarProps> = ({items}) => {
  const navigate = useNavigate();

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
