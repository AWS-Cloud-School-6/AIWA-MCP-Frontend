import React from 'react';
import { Link } from 'react-router-dom';
import NavigationSection from './NavigationSection';
import styles from './SidebarVpc.module.css';
import { useUserContext } from '../../../../UserContext';

const SidebarVpc = () => {
  const { currentUser } = useUserContext();

  const vpcDashboardLinks = [
    { icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/bdd2aa580982f68651bbe1f2248003bc3f5a8329c4862fc360d2dee52a30ee85?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841', label: 'VPCs', to: '/console/vpc' },
    { icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3a05d5423bb457cad8c1809adec5f15ee3afa9d267f87f2747fd523ed146ebcf?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841', label: 'Subnets', to: '/console/vpc/subnet'},
    { icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/8668eb34c592a6456a1f3d0205412e25e437ef51c8261f55f6fe9974e20cfd49?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841', label: 'Route tables', to: '/console/vpc/routetable' },
    { icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/bdd2aa580982f68651bbe1f2248003bc3f5a8329c4862fc360d2dee52a30ee85?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841', label: 'Internet Gateways', to: '/console/vpc/internetgateway' },
    { icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3a05d5423bb457cad8c1809adec5f15ee3afa9d267f87f2747fd523ed146ebcf?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841', label: 'Nat Gateways', to: '/console/vpc/natgateway' },
  ];


  return (
    <aside className={styles.sidebarVpc}>
      <div className={styles.container}>
      <header className={styles.profile}>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a00a6993f1d194daa2a72b133e14d8f66b00859950c526d1a559a731808821d7?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841" alt="Profile" className={styles.profileImage} />
        <div className={styles.profileContent}>
          <span className={styles.overline}>id</span>
          <div className={styles.idstyle}>{currentUser.id}</div>
        </div>
      </header>

      <div className={styles.divider} />

      <NavigationSection title="vpc dashboard" links={vpcDashboardLinks} />

      <div className={styles.divider} />

      </div>
    </aside>
  );
};

export default SidebarVpc;