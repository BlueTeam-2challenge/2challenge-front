import { AnimalSchema } from "@app/schemas/animalFormSchema";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createAnimal = async (data: AnimalSchema) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/animals`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating animal:", error);
  }
};

export const getAllAnimals = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/animals`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all animals:", error);
    throw error;
  }
};

export const getAnimalById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/animals/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching animal by ID:", error);
    throw error;
  }
};

export const getAllAnimalsByUserId = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/animals/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching animals by user ID:", error);
    throw error;
  }
};

export const deleteAnimal = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/animals/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting animal:", error);
    throw error;
  }
};

export const updateAnimal = async (id: string, animalData: AnimalSchema) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/animals/${id}`,
      animalData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating animal:", error);
    throw error;
  }
};
