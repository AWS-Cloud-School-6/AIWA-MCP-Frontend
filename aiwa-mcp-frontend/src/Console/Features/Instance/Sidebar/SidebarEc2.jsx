import React from 'react';
import { Link } from 'react-router-dom';
import NavigationSection from './NavigationSection';
import styles from './SidebarEc2.module.css';
import { useUserContext } from '../../../../UserContext';

const SidebarEc2 = () => {
  const { currentUser } = useUserContext();

  const ec2DashboardLinks = [
    { icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/bdd2aa580982f68651bbe1f2248003bc3f5a8329c4862fc360d2dee52a30ee85?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841', label: 'EC2s', to: '/console/instances' },
    { icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3a05d5423bb457cad8c1809adec5f15ee3afa9d267f87f2747fd523ed146ebcf?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841', label: 'ENI'},
    { icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3a05d5423bb457cad8c1809adec5f15ee3afa9d267f87f2747fd523ed146ebcf?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841', label: 'Security Group'},
  ];

  const settingsLinks = [
    { icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c43c1f12c1f95349db14ba4298fa5faf344c1e64930460ea19730f667bfb7cca?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841', label: 'Settings', hasChevron: true }
  ];


  return (
    <aside className={styles.sidebarEc2}>
      <div className={styles.container}>
      <header className={styles.profile}>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a00a6993f1d194daa2a72b133e14d8f66b00859950c526d1a559a731808821d7?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841" alt="Profile" className={styles.profileImage} />
        <div className={styles.profileContent}>
          <span className={styles.overline}>id</span>
          <div className={styles.idstyle}>{currentUser.id}</div>
        </div>
      </header>

      <div className={styles.divider} />

      <NavigationSection title="ec2 dashboard" links={ec2DashboardLinks} />

      <NavigationSection title="settings" links={settingsLinks} />
      </div>
    </aside>
  );
};

export default SidebarEc2;