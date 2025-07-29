import React from 'react';

import upRightArrow from '../../assets/upRightArrow.svg';

import styles from './Button.module.scss';

type ButtonProps = {
  text: string;
  top: string;
  left: string;
  width: string;
};

const Button: React.FC<ButtonProps> = ({ text, top, left, width }) => (
  <div className={styles.button} style={{ marginTop: top, marginLeft: left, width: width }}>
    {text}
    <img src={upRightArrow} alt="Arrow icon" className={styles.arrowIcon} />
  </div>
);

export default Button;
