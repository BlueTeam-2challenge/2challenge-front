import { UserSchema } from "@app/schemas/userFormSchema";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async (userData: UserSchema) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const getUserById = async (uid: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${uid}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

export const deleteUser = async (uid: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/${uid}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const updateUser = async (uid: string, userData: UserSchema) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${uid}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
