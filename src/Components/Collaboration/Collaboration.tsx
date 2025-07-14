import amazon from "./../../assets/Amazon-White@2x.webp"
import dribble from "./../../assets/dribbble-logo-black-and-white.png"
import hubspot from "./../../assets/hubspot-logo-1.webp"
import notion from "./../../assets/Notion.webp"
import gumroad from "./../../assets/logo-gumroadgrey-300.png"
import styles from "./Collaboration.module.scss"

export default function Collaboration() {
    const collabLogos = [amazon, dribble, hubspot, notion, gumroad]

    return (
        
        <div className={styles.collabLogos}>
            {collabLogos.map((logo, index) => (
                <div className={styles.logoBox} key={index}>
                    <img
                        src={logo}
                        alt={`Partner logo ${index + 1}`}
                        className={`${styles.collaborationLogo} ${index <= 1 ? styles.small : styles.large
                            }`}
                    />
                </div>
            ))}
        </div>
    )
}
