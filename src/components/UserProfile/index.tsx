import styles from "./UserProfile.module.css";
import { UserProfileProps } from "./types";

const UserProfile = ({ name = "", variant }: UserProfileProps) => {
  const getInitials = (text: string) => {
    if (!text) return "";

    const atIndex = text.indexOf("@");
    if (atIndex !== -1) {
      text = text.slice(0, atIndex);
    }

    const names = text.trim().split(/\s+/);
    const initials = names.map((n) => n[0]).join("");

    return initials.length > 3
      ? initials[0] + initials[initials.length - 1]
      : initials.toUpperCase();
  };

  return (
    <div className={styles.userProfile}>
      <div
        className={
          variant === "default" ? styles.userIcon : styles.userIconSmall
        }
      >
        {getInitials(name)}
      </div>
      {variant === "default" && <div className={styles.userName}>{name}</div>}
    </div>
  );
};

export default UserProfile;
