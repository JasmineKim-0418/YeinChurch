'use client';

import { useState, useEffect } from 'react';
import styles from './Popup.module.css';

export default function Popup({ popup }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!popup) return;

        // 오늘 하루 보지 않기 체크
        const hideUntil = localStorage.getItem(`popup_hide_${popup.id}`);
        if (hideUntil) {
            const hideDate = new Date(hideUntil);
            if (new Date() < hideDate) {
                return; // 아직 숨김 기간 중
            }
        }

        setIsVisible(true);
    }, [popup]);

    if (!popup || !isVisible) return null;

    const handleClose = () => {
        setIsVisible(false);
    };

    const handleHideToday = () => {
        // 오늘 자정까지 숨기기
        const tomorrow = new Date();
        tomorrow.setHours(24, 0, 0, 0);
        localStorage.setItem(`popup_hide_${popup.id}`, tomorrow.toISOString());
        setIsVisible(false);
    };

    const handleClick = () => {
        if (popup.link) {
            window.open(popup.link, '_blank');
        }
    };

    return (
        <div className={styles.popup}>
            <button className={styles.closeBtn} onClick={handleClose}>
                ✕
            </button>

            <div
                className={styles.content}
                onClick={handleClick}
                style={{ cursor: popup.link ? 'pointer' : 'default' }}
            >
                {popup.image && (
                    <img
                        src={popup.image}
                        alt={popup.title}
                        className={styles.image}
                    />
                )}
                {!popup.image && popup.title && (
                    <div className={styles.textContent}>
                        <h2>{popup.title}</h2>
                    </div>
                )}
            </div>

            <div className={styles.footer}>
                <button className={styles.hideBtn} onClick={handleHideToday}>
                    오늘 하루 보지 않기
                </button>
                <button className={styles.confirmBtn} onClick={handleClose}>
                    닫기
                </button>
            </div>
        </div>
    );
}
