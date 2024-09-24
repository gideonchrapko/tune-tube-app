import {
  uploadAddress,
  uploadProfilePicture,
  uploadDob,
  deleteAccount,
  uploadPayment,
} from "@/config/queries";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";
import { getFirebaseAuth } from "@/app/auth/firebase";
import { signOut } from "firebase/auth";
import { logout } from "@/api";

export const useUploadProfilePicture = () => {
  const router = useRouter();
  const { toast } = useToast();
  return useMutation<string, Error, File>({
    mutationFn: (file: File) => uploadProfilePicture(file),
    onSuccess: () => {
      toast({
        title: "Congrats!",
        description: "Your profile picture successfully updated",
      });
      router.refresh();
    },
    onError: (error: Error) => {
      console.error("Error uploading profile picture", error);
    },
  });
};

export const useUploadAddress = () => {
  const router = useRouter();
  const { toast } = useToast();
  return useMutation<any>({
    mutationFn: (address: any) => uploadAddress(address),
    onSuccess: () => {
      toast({
        title: "Congrats!",
        description: "Your address was successfully updated",
      });
      router.refresh();
    },
    onError: (error: Error) => {
      console.error("Error changing address", error);
    },
  });
};

export const useDob = () => {
  const router = useRouter();
  const { toast } = useToast();
  return useMutation<any>({
    mutationFn: (dob: any) => uploadDob(dob),
    onSuccess: () => {
      toast({
        title: "Congrats!",
        description: "Your date of birth was successfully updated",
      });
      router.refresh();
    },
    onError: (error: Error) => {
      console.error("Error changing address", error);
    },
  });
};

export const useDeleteAccount = () => {
  const router = useRouter();
  return useMutation<any>({
    mutationFn: () => deleteAccount(),
    onSuccess: async () => {
      const auth = getFirebaseAuth();
      await signOut(auth);
      await logout();
      router.refresh();
      console.error("Account deleted");
    },
    onError: (error: Error) => {
      console.error("Error deleting", error);
    },
  });
};

export const usePaymentMethod = () => {
  const router = useRouter();
  const { toast } = useToast();
  return useMutation<any>({
    mutationFn: (payment: any) => uploadPayment(payment),
    onSuccess: async () => {
      toast({
        title: "Congrats!",
        description: "Your payment method was changed",
      });
      router.refresh();
    },
    onError: (error: Error) => {
      console.error("Error changing payment method", error);
    },
  });
};
