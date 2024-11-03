import styles from "./header.module.css";
import profileIcon from "../../assets/profile.png";

import { Link, NavLink } from "react-router-dom";

import logo from "../../assets/logo.svg";
import chat from "../../assets/chat.svg";
import favorite from "../../assets/favorite.svg";
import notifications from "../../assets/notifications.svg";
import arrowDown from "../../assets/arrowDown.svg";
import person from "../../assets/person.svg";
import { useContext, useState } from "react";
import AuthContext from "../../contexts/authContext";

export default function Header() {
  const { isAuthenticated, username }: any = useContext(AuthContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <Link to="/" className={styles.logoWrapper}>
          <h3 className={styles.buy}>BUY</h3>
          <img className={styles.logo} src={logo} alt="logo" />
        </Link>
        <div className={styles.menu}>
          {isAuthenticated && (
            <>
              <NavLink
                to="/messages"
                className={({ isActive }: { isActive: boolean }): string =>
                  (isActive ? styles.active : "") + " " + styles.link
                }
              >
                <p>Съобщения</p>
                <img src={chat} alt="message" />
              </NavLink>
              <NavLink
                to="/likes"
                className={({ isActive }: { isActive: boolean }): string =>
                  (isActive ? styles.active : "") + " " + styles.link
                }
              >
                <img src={favorite} alt="heart" />
              </NavLink>
              <NavLink
                to="/notification"
                className={({ isActive }: { isActive: boolean }): string =>
                  (isActive ? styles.active : "") + " " + styles.link
                }
              >
                <img src={notifications} alt="notifications" />
              </NavLink>

              <div
                className={`${styles.profileMenu} ${
                  dropdownVisible ? styles.active : ""
                }`}
                onMouseEnter={toggleDropdown}
                onMouseLeave={toggleDropdown}
              >
                <div className={styles.profileLink}>
                  <img src={person} alt="person" />
                  <p>Твоят Профил</p>
                  <img
                    src={arrowDown}
                    alt="arrow down"
                    className={styles.arrow}
                  />
                </div>
                {dropdownVisible && (
                  <div className={styles.dropdown}>
                    <div className={styles.user}>
                      <img
                        className={styles.userImage}
                        src={profileIcon}
                        alt=""
                      />
                      <p className={styles.username}>{username}</p>
                    </div>
                    <NavLink to="/profile" className={styles.dropdownItem}>
                      Моят профил
                    </NavLink>
                    <NavLink to="/poster" className={styles.dropdownItem}>
                      Мойте обяви
                    </NavLink>
                  </div>
                )}
              </div>

              <NavLink
                to="/create"
                className={({ isActive }: { isActive: boolean }): string =>
                  (isActive ? styles.active : "") + " " + styles.link
                }
              >
                Добави обавя
              </NavLink>
              <NavLink
                to="/logout"
                className={({ isActive }: { isActive: boolean }): string =>
                  (isActive ? styles.active : "") + " " + styles.link
                }
              >
                Изход
              </NavLink>
            </>
          )}
          {!isAuthenticated && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }: { isActive: boolean }): string =>
                  (isActive ? styles.active : "") + " " + styles.link
                }
              >
                Вход
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }: { isActive: boolean }): string =>
                  (isActive ? styles.active : "") + " " + styles.link
                }
              >
                Регистрация
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
