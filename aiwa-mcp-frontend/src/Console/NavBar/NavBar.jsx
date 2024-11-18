import React, { useState, useEffect } from 'react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';
import NavLink from './NavLinks';
import { useUserContext } from '../../UserContext';



const navLinks = [
  { text: 'HOME', href: '/console' },
  { text: 'Network', href: '/console/vpc' },
  { text: 'Instance', href: '/console/instances' }
];

function NavBar() {
  const [userId, setUserId] = useState('');
  const { currentUser, selectedCompany } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserId() {
      try {
        const userInfo = await getCurrentUser();
        console.log('User Info:', userInfo); // 디버깅을 위한 로그 유지
        setUserId(userInfo.userId || userInfo.attributes?.sub || '');
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
    fetchUserId();
  }, []);

  console.log('Current userId:', userId); // 렌더링 시 userId 상태 확인

  const handleLogout = async () => {
    try {
      await signOut({ global: true });
      //setCurrentUser(null);
      document.cookie.split(';').forEach(cookie => {
        const name = cookie.split('=')[0].trim();
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      });      
      window.location.reload();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className={styles.navBar}>
      <div className={styles.navBarContent}>
        <div className={styles.logoAndLinks}>
          <div className={styles.logoContainer}>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ec46070fee5581e109f73c1f4f471b76775dbfaa499588d86ce24efd2677724?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841" className={styles.logo} alt="AIWA logo" />
            <div>AIWA</div>
          </div>
          <div className={styles.navLinks}>
            {navLinks.map((link, index) => (
              <NavLink key={index} text={link.text} href={link.href} />
            ))}
            <div className={styles.searchIcon} role="button" tabIndex="0" aria-label="Search">
              {/* Add your search icon SVG or image here */}
            </div>
          </div>
        </div>
        <div className={styles.userAndLogout}>
          <div className={styles.userIconContainer}>
            <div className={styles.userIcon}>
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/b336f31c57083d1f8335bfaeeabac3ed1120f96e8e9342d246d8eaab917c205e?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841" className={styles.userIconImage} alt="User profile" />
            </div>
          </div>
          <div className={styles.userInfoContainer}>
            <div className={styles.userInfo}>
              {userId && <div className={styles.userId}>{currentUser.id}</div>}
              {selectedCompany && <div className={styles.companyName}> Your Company: {selectedCompany}</div>}
            </div>
            <div className={styles.logoutContainer}>
              <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
