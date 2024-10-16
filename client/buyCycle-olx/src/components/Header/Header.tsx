import styles from './header.module.css';

import { Link, NavLink } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import chat from '../../assets/chat.svg';
import favorite from '../../assets/favorite.svg';
import notifications from '../../assets/notifications.svg';
import person from '../../assets/person.svg';
import { useContext } from 'react';
import AuthContext from '../../contexts/authContext';

export default function Header() {

    const { isAuthenticated }: any = useContext(AuthContext);

    return (
        <header className={styles.header}>
            <nav className={styles.navigation}>
                <Link to='/' className={styles.logoWrapper}>
                    <h3 className={styles.buy}>BUY</h3>
                    <img className={styles.logo} src={logo} alt='logo' />
                </Link>
                <div className={styles.menu}>
                    {isAuthenticated && (
                        <>
                            <NavLink to="/messages" className={({ isActive }: { isActive: boolean }): string => (isActive ? styles.active : '') + ' ' + styles.link} >
                                <p>Съобщения</p>
                                <img src={chat} alt="message" />
                            </NavLink>
                            <NavLink to='/likes' className={({ isActive }: { isActive: boolean }): string => (isActive ? styles.active : '') + ' ' + styles.link}><img src={favorite} alt="heart" /></NavLink>
                            <NavLink to='/notification' className={({ isActive }: { isActive: boolean }): string => (isActive ? styles.active : '') + ' ' + styles.link}><img src={notifications} alt="notifications" /></NavLink>
                            <NavLink to='/profile' className={({ isActive }: { isActive: boolean }): string => (isActive ? styles.active : '') + ' ' + styles.link}>
                                <img src={person} alt="person" />
                                <p>Твоят Профил</p>
                            </NavLink>
                            <NavLink to='/create' className={({ isActive }: { isActive: boolean }): string => (isActive ? styles.active : '') + ' ' + styles.link}>Добави обавя</NavLink>
                            <NavLink to='/logout' className={({ isActive }: { isActive: boolean }): string => (isActive ? styles.active : '') + ' ' + styles.link}>Изход</NavLink>
                        </>)}
                    {!isAuthenticated && (
                        <>
                            <NavLink to='/login' className={({ isActive }: { isActive: boolean }): string => (isActive ? styles.active : '') + ' ' + styles.link}>Вход</NavLink>
                            <NavLink to='/register' className={({ isActive }: { isActive: boolean }): string => (isActive ? styles.active : '') + ' ' + styles.link}>Регистрация</NavLink>
                        </>
                    )}
                </div>
            </nav >
        </header>
    )
}
