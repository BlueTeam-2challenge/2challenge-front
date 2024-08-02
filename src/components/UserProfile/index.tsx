import React from "react";
import styles from "./UserProfile.module.css";
import { UserProfileProps } from "./types";

const UserProfile = ({
  name,
  email,
  variant = "default",
}: UserProfileProps) => {
  const getInitials = (text: string) => {
    if (!text) return "";
    const names = text.trim().split(/\s+/);
    const initials = names.map((n) => n[0]).join("");
    if (initials.length > 3) {
      return initials[0] + initials[initials.length - 1];
    }
    return initials.toUpperCase();
  };

  const displayText = name || email || "User";

  return (
    <div className={styles.userProfile}>
      <div
        className={
          variant === "default" ? styles.userIcon : styles.userIconSmall
        }
      >
        {getInitials(name || email || "")}
      </div>
      {variant === "default" && (
        <div className={styles.userName}>{displayText}</div>
      )}
    </div>
  );
};

export default UserProfile;
