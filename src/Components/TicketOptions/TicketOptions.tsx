import Button from '../Button/Button';

import styles from './TicketOptions.module.scss';

type TicketContentType = {
  title: string;
  description: string;
  price: string;
};

const TicketContent: TicketContentType[] = [
  {
    title: 'EARLY BIRD PASS',
    description: 'Limited time offer!',
    price: '€299',
  },
  {
    title: 'STANDARD PASS',
    description: '',
    price: '€399',
  },
  {
    title: 'VIP EXPERIENCE',
    description: 'Includes exclusive speaker meetups & front-row seating',
    price: '€699',
  },
];
const TicketOptions = () => (
  <section className={styles.TicketOptionsMain}>
    <h1 className={styles.Maintitle}>Ticket Options</h1>
    <div className={styles.TicketOptionsBox}>
      {TicketContent.map((ticket, index) => (
        <div className={styles.TicketContentCard} key={index}>
          <div className={styles.CardContent}>
            <h2 className={styles.title}>{ticket.title}</h2>
            <h3 className={styles.description}>{ticket.description}</h3>
            <h2 className={styles.price}>{ticket.price}</h2>
            <Button text="Get your ticket" width="280px" left="0" top="0" />
          </div>
        </div>
      ))}
    </div>
  </section>
);
export default TicketOptions;
