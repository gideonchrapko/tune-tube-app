import { uploadProfilePicture } from "@/config/queries";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";

export const useUploadProfilePicture = () => {
  const router = useRouter();
  const { toast } = useToast();
  return useMutation<string, Error, File>({
    mutationFn: (file: File) => uploadProfilePicture(file),
    onSuccess: (data: string) => {
      console.log("Profile picture successfully updated", data);
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
