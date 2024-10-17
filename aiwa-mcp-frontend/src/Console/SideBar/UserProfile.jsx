import React from 'react';
import styles from './UserProfile.module.css';

function UserProfile({ avatarSrc, overline, title }) {
  return (
    <div className={styles.profile}>
      <img loading="lazy" src={avatarSrc} alt="" className={styles.avatar} />
      <div className={styles.content}>
        <div className={styles.overline}>{overline}</div>
        <div className={styles.title}>{title}</div>
      </div>
    </div>
  );
}

export default UserProfile;