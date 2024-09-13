import { uploadProfilePicture } from "@/config/queries";
import { useMutation } from "@tanstack/react-query";

export const useUploadProfilePicture = () => {
  return useMutation<string, Error, File>({
    mutationFn: (file: File) => uploadProfilePicture(file),
    onSuccess: (data: string) => {
      console.log("Profile picture updated successfully", data);
      console.log(7);
    },
    onError: (error: Error) => {
      console.error("Error uploading profile picture", error);
      console.log(8);
    },
  });
};
