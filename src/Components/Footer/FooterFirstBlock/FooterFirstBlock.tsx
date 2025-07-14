import styles from "./FooterFirstBlock.module.scss"

export default function FooterFirstBlock() {
    const menuItems = [
        "Agenda",
        "Terms ",
        "Speakers",
        "Privacy Policy",
        "Register",
        "Cookie Policy",
        "Venue",
        "FAQ"
    ];

    return (

        <div className={styles.Content}>
            <h1 className={styles.title}>Next-Gen AI Summit 2052</h1>
            <div className={styles.MenuList}>
                {menuItems.map((menu, index) => (
                    <h2 key={index} className={styles.menuItem}>{menu}</h2>
                ))}
            </div>
            <h3 className={styles.lastTitle}>© 2052 Next-Gen AI Summit. All rights reserved.</h3>
        </div>
    )
}
