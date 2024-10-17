import React from 'react';
import styles from './NavBar.module.css';

function NavLink({ text, href }) {
  return (
    <a href={href} className={styles.navLink}>
      {text}
    </a>
  );
}

export default NavLink;