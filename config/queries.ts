import axiosInstance from "@/lib/axios";

export const uploadProfilePicture = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post(
    "/api/upload-profile-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};

export const uploadAddress = async (address: string) => {
  const response = await axiosInstance.post(
    "/api/update-address",
    { address: address },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response;
};

export const uploadDob = async (dob: string) => {
  const response = await axiosInstance.post(
    "/api/update-dob",
    { dob: dob },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response;
};

export const createUserProfile = async () => {
  const response = await axiosInstance.post("/api/check-create-user", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const deleteAccount = async () => {
  const response = await axiosInstance.post("/api/delete-account", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
