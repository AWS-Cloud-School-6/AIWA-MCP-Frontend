import React from 'react';
import NavigationLink from './NavigationLink';
import styles from './SidebarEc2.module.css';

const NavigationSection = ({ title, links }) => (
  <nav className={styles.navigationSection}>
    <h2 className={styles.navigationTitle}>{title}</h2>
    {links.map((link, index) => (
      <NavigationLink key={index} {...link} />
    ))}
  </nav>
);

export default NavigationSection;
