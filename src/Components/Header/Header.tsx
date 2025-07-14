import styles from './Header.module.scss'

export default function Header() {
    const navItems = ["Home", "Schedule", "Speakers", "Tickets", "Venue", "Sponsors"]

    return (

        <header className={styles.header}>
            <div className={styles.logo}>nexus</div>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    {navItems.map((text, index) => (
                        <li className={styles.navItem} key={index}>
                            {text}
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}