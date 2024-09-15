import {
  createUserProfile,
  uploadAddress,
  uploadProfilePicture,
} from "@/config/queries";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";

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
