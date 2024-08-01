import { useState } from 'react';
import styles from './GoogleButton.module.css';
import { GoogleLoginButtonProps } from './Types';

const GoogleLoginButton = (props: GoogleLoginButtonProps) => {
  const [hover, setHover] = useState(false);

  

  return (
    <div className={styles.signContainer}>
      <button
        
        className={styles.btn}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        
      >
        <img src="./google-icon.png" alt="Google icon" className={styles.icon} />
        <p className={styles.btnText}>{props.label}</p>
      </button>
    </div>
  );
};

export default GoogleLoginButton;