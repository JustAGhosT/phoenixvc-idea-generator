import React from 'react';
import styles from './sidebar.module.css';

interface SidebarSectionProps {
  /**
   * Section title
   */
  title: string;
  /**
   * Section content (typically SidebarItems)
   * Made optional to allow empty sections
   */
  children?: React.ReactNode;
  /**
   * Whether the sidebar is open/expanded
   */
  isOpen?: boolean;
}

export function SidebarSection({ title, children, isOpen = true }: SidebarSectionProps) {
  return (
    <div className={styles.sidebarGroup}>
      {isOpen && <div className={styles.sidebarGroupLabel}>{title}</div>}
      <div>
        <ul className={styles.sidebarMenu}>
          {children}
        </ul>
      </div>
    </div>
  );
}