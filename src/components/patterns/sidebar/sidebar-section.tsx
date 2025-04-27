import React from 'react';
import { useSidebarContext } from '@/contexts/sidebar-context';
import styles from './sidebar.module.css';

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

export function SidebarSection({ title, children }: SidebarSectionProps) {
  const { isOpen } = useSidebarContext();
  
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