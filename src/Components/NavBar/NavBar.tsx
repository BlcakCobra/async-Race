import logo from "./../../assets/Copilot_20250826_171120-removebg-preview.png"
import { NavLink } from 'react-router-dom'
import styles from "./NavBar.module.scss"

export default function NavBar() {
  return (
    <header>
      <nav className={styles.navbar}>
        <ul className={styles.navLinks}>
          <li className={styles.navItem}>
            <NavLink
              to="/Garage"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Garage
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/Winners"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Winners
            </NavLink>
          </li>
        </ul>

        <NavLink to={"/"}>
          <div className={styles.logoWrapper}>
            <img src={logo} alt="Async Race logo" className={styles.logoImg} />
          </div>
        </NavLink>
      </nav>
    </header>
  )
}
