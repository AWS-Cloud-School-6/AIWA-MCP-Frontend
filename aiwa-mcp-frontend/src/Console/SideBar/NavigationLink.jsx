import React from 'react';
import styles from './NavigationLink.module.css';

function NavigationLink({ icon, label, arrowIcon }) {
  return (
    <div  className={styles.link}>
      <img loading="lazy" src={icon} alt="" className={styles.icon} />
      <span className={styles.label}>{label}</span>
      <img loading="lazy" src={arrowIcon} alt="" className={styles.arrowIcon} />
    </div>
  );
}

export default NavigationLink;