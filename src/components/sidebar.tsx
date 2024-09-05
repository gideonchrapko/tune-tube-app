"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaSignOutAlt, FaBars } from 'react-icons/fa';

export default function Sidebar() {
  // Start with the sidebar open
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ ...styles.sidebar, width: isOpen ? '250px' : '60px' }}>
      <div style={styles.topSection}>
        <button onClick={toggleSidebar} style={styles.iconButton}>
          <FaBars style={styles.icon} />
        </button>
      </div>
      {isOpen && (
        <div style={styles.menuItems}>
          <Link href="/creator-analytics" style={styles.link}>
            Creator Analytics
          </Link>
          <Link href="/sounds" style={styles.link}>
            Sounds
          </Link>
          <Link href="/sync" style={styles.link}>
            Sync
          </Link>
          <Link href="/settings" style={styles.link}>
            Settings
          </Link>
        </div>
      )}
      <div style={styles.logoutButtonContainer}>
        <button style={styles.logoutButton}>
          <FaSignOutAlt style={styles.logoutIcon} />
        </button>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#000',
    overflowX: 'hidden' as 'hidden',
    transition: '0.3s',
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'space-between',
    zIndex: 1000, // Ensure sidebar is on top
  },
  topSection: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center', // Vertically align the icons
    padding: '10px 20px', // Even padding for the top section
  },
  menuItems: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    paddingLeft: '10px',
    marginTop: '40px', // Move the menu items higher up
  },
  link: {
    padding: '10px 15px',
    textDecoration: 'none' as 'none',
    color: '#fff',
    fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
    fontWeight: 'bold' as 'bold',
    fontSize: '16px',
    marginBottom: '10px',
    display: 'block' as 'block',
    cursor: 'pointer' as 'pointer',
  },
  logoutButtonContainer: {
    textAlign: 'left' as 'left',
    paddingBottom: '20px',
    paddingLeft: '20px', // Slightly moved away from the left border
  },
  logoutButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '20px',
  },
  iconButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
  },
  icon: {
    fontSize: '24px',
  },
  logoutIcon: {
    fontSize: '24px', // Keep the logout icon larger
  },
};