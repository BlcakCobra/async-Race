import styles from "./ImagesCollection.module.scss";
import first from "./../../../assets/representativesFirst (1).png";
import second from "./../../../assets/representativesSecond(2).png";
import third from "./../../../assets/representativesThird(3).png";
import fourth from "./../../../assets/representativesFourth(4).png";

export default function ImagesCollection() {
    const images = [first, second, third, fourth];

    return (
        
        <div className={styles.container}>
            {images.map((src, index) => (
                <div
                    key={index}
                    className={styles.avatarWrapper}
                    style={{ marginLeft: index === 0 ? 0 : "-37px" }}
                >
                    <img
                        src={src}
                        alt={`Representative ${index + 1}`}
                        className={styles.avatar}
                    />
                </div>
            ))}
        </div>
    );
}
