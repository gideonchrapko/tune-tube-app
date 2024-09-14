"use client";

import { useAuth } from "@/app/auth/AuthContext";
import { useUploadProfilePicture } from "@/hooks/useUploadProfilePicture";
import Image from "next/image";
import { useCallback, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

type PaymentFields = {
  accountNumber?: string;
  routingNumber?: string;
  name?: string;
  swiftCode?: string;
  bankAddress?: string;
  billingAddress?: string;
  email?: string;
};

const SettingsPage = () => {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentFields, setPaymentFields] = useState<PaymentFields>({});
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { mutate: uploadMutation } = useUploadProfilePicture();
  const clickable = profilePicture!;

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setProfilePicture(file);
      setPreviewUrl(URL.createObjectURL(file)); // Create preview URL
    } else {
      setProfilePicture(null);
      setPreviewUrl(null);
    }
  };

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPaymentMethod(e.target.value);
    setPaymentFields({});
  };

  const handlePaymentFieldChange = (
    field: keyof PaymentFields,
    value: string,
  ) => {
    setPaymentFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const handleSave = useCallback(() => {
    if (profilePicture) {
      uploadMutation(profilePicture);
    }
  }, [profilePicture]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
      <div className="w-full max-w-4xl p-6 mt-12">
        <h1 className="text-5xl font-bold">Settings</h1>
        <div className="flex flex-col items-center min-h-screen bg-gray-100 py-5">
          <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
            <div className="mb-8">
              <label className="block text-lg font-semibold mb-2">
                Profile Picture
              </label>

              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="google photo"
                  width={125}
                  height={125}
                  className="mx-0 rounded-full my-5"
                />
              ) : (
                <>
                  {user?.photoURL && (
                    <Image
                      src={user?.photoURL}
                      alt="google photo"
                      width={125}
                      height={125}
                      className="mx-0 rounded-full my-5"
                    />
                  )}
                </>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />

              {profilePicture && (
                <p className="text-gray-700 mt-2">
                  Selected file: {profilePicture.name}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-lg font-semibold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-lg font-semibold mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-8">
              <label className="block text-lg font-semibold mb-2">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-8">
              <label className="block text-lg font-semibold mb-2">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select Payment Method</option>
                <option value="ACH">ACH</option>
                <option value="Wire">Wire</option>
                <option value="PayPal">PayPal</option>
              </select>
            </div>

            {paymentMethod === "ACH" && (
              <div className="mb-8">
                <input
                  type="text"
                  placeholder="Account Number"
                  value={paymentFields.accountNumber || ""}
                  onChange={(e) =>
                    handlePaymentFieldChange("accountNumber", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                />
                <input
                  type="text"
                  placeholder="Routing Number"
                  value={paymentFields.routingNumber || ""}
                  onChange={(e) =>
                    handlePaymentFieldChange("routingNumber", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                />
                <input
                  type="text"
                  placeholder="Name"
                  value={paymentFields.name || ""}
                  onChange={(e) =>
                    handlePaymentFieldChange("name", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            )}

            {paymentMethod === "Wire" && (
              <div className="mb-8">
                <input
                  type="text"
                  placeholder="SWIFT Code"
                  value={paymentFields.swiftCode || ""}
                  onChange={(e) =>
                    handlePaymentFieldChange("swiftCode", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                />
                <input
                  type="text"
                  placeholder="Account Number"
                  value={paymentFields.accountNumber || ""}
                  onChange={(e) =>
                    handlePaymentFieldChange("accountNumber", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                />
                <input
                  type="text"
                  placeholder="Bank Address"
                  value={paymentFields.bankAddress || ""}
                  onChange={(e) =>
                    handlePaymentFieldChange("bankAddress", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                />
                <input
                  type="text"
                  placeholder="Billing Address"
                  value={paymentFields.billingAddress || ""}
                  onChange={(e) =>
                    handlePaymentFieldChange("billingAddress", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            )}

            {paymentMethod === "PayPal" && (
              <div className="mb-8">
                <input
                  type="email"
                  placeholder="PayPal Email"
                  value={paymentFields.email || ""}
                  onChange={(e) =>
                    handlePaymentFieldChange("email", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            )}

            <div className="flex justify-center">
              {clickable ? (
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button className="py-3 px-6 rounded-lg bg-blue-500 hover:bg-blue-600">
                      Save Changes
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to save these changes?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action will permanently change your settings
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleSave}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <Button className="py-3 px-6 rounded-lg bg-gray-500 hover:bg-gray-600">
                  Save Changes
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
