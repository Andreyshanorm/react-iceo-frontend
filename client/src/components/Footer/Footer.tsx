import React from 'react';
import styles from './Footer.module.css'
import { DiscordOutlined, GithubOutlined, SkypeOutlined, TwitterOutlined } from '@ant-design/icons';



export function Footer() {
  return (
    <footer className={styles.footer}>
        <ul className={styles.icons}>
            <li>
                <a href="/">
                    <TwitterOutlined className={styles.icon}  style={{fontSize: '30px'}}/>
                </a>
            </li>
            <li>
                <a href="/">
                    <DiscordOutlined className={styles.icon} style={{fontSize: '30px'}} />
                </a>
            </li>
            <li>
                <a href="/">
                    <SkypeOutlined className={styles.icon} style={{fontSize: '30px'}}  />
                </a>
            </li>
            <li>
                <a href="/">
                    <GithubOutlined className={styles.icon} style={{fontSize: '30px'}}/>
                </a>
            </li>
            
        </ul>
        <div className={styles.copy}>
             ©️ by Andreyshanorm 2024
        </div>
    </footer>
  );
}