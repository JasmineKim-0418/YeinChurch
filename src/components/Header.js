'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.module.css';

const menuItems = [
  {
    title: '교회소개',
    path: '/about',
    subMenu: [
      { title: '예배안내', path: '/about/worship' },
      { title: '교회소개', path: '/about' },
      { title: '섬기는 이', path: '/about/pastor' },
      { title: '연혁', path: '/about/history' },
      { title: '오시는길', path: '/about/location' },
    ],
  },
  {
    title: '부서',
    path: '/departments',
    subMenu: [
      { title: '주일학교', path: '/departments/sunday-school' },
      { title: '중·고등부', path: '/departments/youth' },
      { title: '청년부', path: '/departments/young-adults' },
    ],
  },
  {
    title: '신앙생활',
    path: '/faith',
    subMenu: [
      { title: '설교', path: '/faith/sermons' },
      { title: '칼럼', path: '/faith/column' },
      { title: '새벽묵상', path: '/faith/meditation' },
      { title: '주보', path: '/faith/bulletin' },
      { title: '갤러리', path: '/gallery' },
    ],
  },
  {
    title: '섬김/사역',
    path: '/welcome',
    subMenu: [
      { title: '성가대', path: '/welcome/choir' },
      { title: '찬양팀', path: '/welcome/praise' },
      { title: '전도팀', path: '/welcome/evangelism' },
      { title: '중보기도팀', path: '/welcome/intercession' },
    ],
  },
  {
    title: '상담센터',
    path: '/counseling',
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          {/* 로고 */}
          <Link href="/" className={styles.logo}>
            <img src="/logo-v2.png" alt="구리예인교회" className={styles.logoImage} />
          </Link>

          {/* 데스크톱 메뉴 */}
          <nav className={styles.nav}>
            <ul className={styles.menuList}>
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={styles.menuItem}
                  onMouseEnter={() => setActiveMenu(index)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link href={item.path} className={styles.menuLink}>
                    {item.title}
                  </Link>
                  {item.subMenu && (
                    <ul
                      className={`${styles.subMenu} ${activeMenu === index ? styles.subMenuActive : ''
                        }`}
                    >
                      {item.subMenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link href={subItem.path} className={styles.subMenuLink}>
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴 열기"
          >
            <span className={`${styles.hamburger} ${mobileMenuOpen ? styles.active : ''}`}></span>
          </button>
        </div>
      </header>

      {/* 모바일 메뉴 - 헤더 밖에 배치 */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <button
          className={styles.mobileCloseBtn}
          onClick={() => setMobileMenuOpen(false)}
          aria-label="메뉴 닫기"
        >
          ✕
        </button>
        {menuItems.map((item, index) => (
          <div key={index} className={styles.mobileMenuItem}>
            <Link
              href={item.path}
              className={styles.mobileMenuLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.title}
            </Link>
            {item.subMenu && (
              <div className={styles.mobileSubMenu}>
                {item.subMenu.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    href={subItem.path}
                    className={styles.mobileSubMenuLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
