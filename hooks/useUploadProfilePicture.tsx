// import { storage } from "@/config/firebase.config";
import { useMutation } from "@tanstack/react-query";
import { updateProfile, User } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const uploadProfilePicture = async (
  file: File,
  user: User,
): Promise<string> => {
  console.log(1);
  const storageRef = ref(storage, `profilePictures/${user.uid}`);
  console.log(2, storageRef, "storageRef");
  await uploadBytes(storageRef, file);
  console.log(3);
  const downloadURL = await getDownloadURL(storageRef);
  await updateProfile(user, { photoURL: downloadURL });
  return downloadURL;
};

export const useUploadProfilePicture = (user: User) => {
  return useMutation<string, Error, File>({
    mutationFn: (file: File) => uploadProfilePicture(file, user),
    onSuccess: (data: string) => {
      console.log("Profile picture updated successfully", data);
      console.log(7);
      // You can handle success (e.g., show a success message)
    },
    onError: (error: Error) => {
      console.error("Error uploading profile picture", error);
      console.log(8);
      // Handle error (e.g., show an error message)
    },
  });
};
