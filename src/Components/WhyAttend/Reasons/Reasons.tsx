import styles from "./Reasons.module.scss";

const reasonContent = [
    {
        title: "Cutting-Edge Insights",
        description: "Gain firsthand knowledge from top AI experts and pioneers shaping the industry.",
        num: "01",
        reverse: false,
    },
    {
        title: "Hands-On Learning",
        description: "Participate in interactive workshops, live demos, and deep-dive sessions to sharpen your skills.",
        num: "02",
        reverse: false,
    },
    {
        title: "Exclusive Networking",
        description: "Connect with AI leaders, investors, startups, and fellow professionals at curated networking events.",
        num: "03",
        reverse: true,
    },
    {
        title: "Innovation Showcase",
        description: "Explore groundbreaking AI solutions, from emerging startups to tech giants redefining the future.",
        num: "04",
        reverse: true,
    },
];

const Reasons = () => (
    <div className={styles.reasons}>
        {reasonContent.map((el, index) => (
            <div key={index} className={styles.reasonsContainer}>
                <div className={`${styles.content} ${el.reverse ? styles.reverse : ""}`}>
                    <div className={styles.num}>{el.num}</div>
                    <div className={styles.textBlock}>
                        <h2 className={styles.title}>{el.title}</h2>
                        <p className={styles.description}>{el.description}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default Reasons;
