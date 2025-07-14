import type React from "react"
import styles from "./Titlemodule.module.scss"

type TitleProps = {
    title: string,
    description: string
}

const Title: React.FC<TitleProps> = ({ title, description }) => (

    <div className={styles.titles}>
        <h1 className={styles.Title}>{title}</h1>
        <p className={styles.description}>{description}</p>
    </div>
)

export default Title