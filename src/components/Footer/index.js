import React from 'react';
import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
function Footer() {
    return (
        <div className={styles['footer']}>
            <span> © Made by JamesNguyen</span>
            <a
                href="https://github.com/jamesnguyenn"
                target="_blank"
                rel="noreferrer"
            >
                <FontAwesomeIcon
                    icon={faGithub}
                    style={{ color: '#fff', fontSize: '20px' }}
                ></FontAwesomeIcon>
            </a>
        </div>
    );
}

export default Footer;
