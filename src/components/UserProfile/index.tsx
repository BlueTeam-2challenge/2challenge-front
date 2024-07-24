import React from "react";
import styles from "./UserProfile.module.css";
import { UserProfileProps } from "./types";

const UserProfile = ({ name }: UserProfileProps) => {
  const getInitials = (name: string) => {
    const names = name.split(" ");
    const initials = names.map((name) => name[0]).join("");
    if (initials.length > 3) {
      return initials[0] + initials[initials.length - 1];
    }
    return initials.toUpperCase();
  };

  return (
    <div className={styles.userProfile}>
      <div className={styles.userIcon}>{getInitials(name)}</div>
      <div className={styles.userName}>{!name ? "User" : name}</div>
    </div>
  );
};

export default UserProfile;
