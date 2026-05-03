import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${styles.navWrapper} ${isScrolled ? styles.scrolled : ""}`}
    >
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <button
            className={`${styles.hamburger} ${isMenuOpen ? styles.active : ""}`}
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={styles.logo}>
            <img src="/src/assets/images/icons/logo-sm.png" alt="Apple" />
          </div>

          <div
            className={`${styles.navLinks} ${isMenuOpen ? styles.open : ""}`}
          >
            <ul>
              <li>
                <a href="#">Mac</a>
              </li>
              <li>
                <a href="">iPhone</a>
              </li>
              <li>
                <Link to="/ipad">iPad</Link>
              </li>
              <li>
                <a href="#">Watch</a>
              </li>
              <li>
                <a href="#">TV</a>
              </li>
              <li>
                <a href="#">Music</a>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
              <li className={styles.iconLink}>
                <a href="#">
                  <img
                    src="/src/assets/images/icons/search-icon-sm.png"
                    alt="Search"
                  />
                </a>
              </li>
              <li className={styles.iconLink}>
                <a href="#">
                  <img src="/src/assets/images/icons/cart-sm.png" alt="Cart" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
