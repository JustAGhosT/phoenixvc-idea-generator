import React from 'react';
import styles from './sidebar.module.css';

interface SidebarSectionProps {
  /**
   * Section title
   */
  title: string;
  /**
   * Section content (typically SidebarItems)
   */
  children: React.ReactNode;
  /**
   * Whether the sidebar is open/expanded
   */
  isOpen?: boolean;
}

export function SidebarSection({ title, children, isOpen = true }: SidebarSectionProps) {
  return (
    <div className={styles.group}>
      {isOpen && <div className={styles.groupLabel}>{title}</div>}
      <div>
        <ul className={styles.menu}>
          {children}
        </ul>
      </div>
    </div>
  );
}