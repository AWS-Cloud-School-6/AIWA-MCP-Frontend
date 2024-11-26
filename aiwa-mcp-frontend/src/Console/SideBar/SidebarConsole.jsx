import React, { useState, useEffect } from 'react';
import styles from './SidebarConsole.module.css';
import UserProfile from './UserProfile';
import NavigationLink from './NavigationLink';
import { useUserContext } from '../../UserContext';
import axios from 'axios'; // axios를 사용하여 API 요청을 보냅니다. 필요하다면 설치해주세요.
import { AWS_API_URL } from '../..';
import { MEMBER_API_URL } from '../..';

function SidebarConsole({ onSelectProvider }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser, selectedCompany, setSelectedCompany } = useUserContext();
  const [keysList, setKeysList] = useState([]);

  useEffect(() => {
    fetchAccessKey();
  }, [currentUser]);

  const fetchAccessKey = async () => {
    if (!currentUser?.id) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(MEMBER_API_URL + '/members/all');
      const members = response.data.list;
      const currentMember = members.find(member => member.email === currentUser.id);

      if (currentMember && currentMember.aiwaKeys) {
        setKeysList(currentMember.aiwaKeys);
      }
    } catch (err) {
      setError('Failed to fetch access key');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingsClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleProviderSelect = async (provider) => {
    setIsLoading(true);
    setError(null);
    try {
      onSelectProvider(provider);
      setIsDropdownOpen(false);
      await fetchAccessKey(); // 제출 후 access key를 다시 불러옵니다.
    } catch (err) {
      setError('Failed to set provider');
    } finally {
      setIsLoading(false);
    }
  };

  const maskAccessKey = (key) => {
    if (!key) return '';
    if (key.length <= 4) return '*'.repeat(key.length);
    // Add ellipsis if key is too long
    const maskedKey = '*'.repeat(8) + key.slice(-4);
    return maskedKey.length > 16 ? maskedKey.slice(0, 16) : maskedKey;
  };

  const handleCompanySelect = (companyName) => {
    setSelectedCompany(companyName);
  };

  return (
    <aside className={styles.sidebarConsole}>
      <div className={styles.container}>
        <UserProfile
          avatarSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/a00a6993f1d194daa2a72b133e14d8f66b00859950c526d1a559a731808821d7?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841"
          overline="id"
          title={currentUser?.id}
        />
        <div className={styles.divider} />
        <div className={styles.navigation}>
          <h2 className={styles.navigationTitle}>your secrets</h2>
          <div className={styles.settingsContainer}>
            <div onClick={handleSettingsClick}>
              <NavigationLink
                icon="https://cdn.builder.io/api/v1/image/assets/TEMP/57ac64ee82243b998c5323bfc455504b8a92f71dc2e44e0230553c917181b7ac?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841"
                label="Settings"
                arrowIcon="https://cdn.builder.io/api/v1/image/assets/TEMP/07a76a32a67087b95dc53b278c6599d8709b190c8e922c822531e9638958edb4?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841"
              />
            </div>
            {isDropdownOpen && (
              <div className={styles.dropdown}>
                <button onClick={() => handleProviderSelect('AWS')} disabled={isLoading}>AWS</button>
                <button onClick={() => handleProviderSelect('GCP')} disabled={isLoading}>GCP</button>
              </div>
            )}
          </div>
          {isLoading && <p>Loading...</p>}
          {error && <p className={styles.error}>{error}</p>}
          {keysList.length > 0 && (
            <div className={styles.accessKeyContainer}>
              {keysList.map((key, index) => (
                <div
                  key={index}
                  className={`${styles.keyItem} ${selectedCompany === key.companyName ? styles.selectedKey : ''}`}
                  onClick={() => handleCompanySelect(key.companyName)}
                  style={{ cursor: 'pointer' }}
                >
                  <p><strong>Company: {key.companyName}</strong></p>
                  <p>Access Key: {maskAccessKey(key.accessKey)}</p>
                  <p>Secret Key: {maskAccessKey(key.secretKey)}</p>
                  <p>Project ID: {key.projectId}</p>
                  {key.gcpKeyPath && (
                    <p style={{ 
                      wordBreak: 'break-all'
                    }}>
                      GCP Key Path: {key.gcpKeyPath}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default SidebarConsole;
