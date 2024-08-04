import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserSchema, userFormSchema } from "@app/schemas/userFormSchema";
import { AnimalSchema, animalFormSchema } from "@app/schemas/animalFormSchema";
import { loginFormSchema, LoginSchema } from "@app/schemas/userLoginSchema";

export const useUserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(userFormSchema),
  });
  return { register, handleSubmit, errors };
};

export const useAnimalForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AnimalSchema>({
    resolver: zodResolver(animalFormSchema),
  });
  return { register, handleSubmit, errors, setValue };
};

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginFormSchema),
  });
  return { register, handleSubmit, errors };
};
