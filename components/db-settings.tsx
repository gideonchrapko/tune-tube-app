"use client";

import { useAuth } from "@/app/auth/AuthContext";
import {
  useUploadAddress,
  useUploadProfilePicture,
  useDob,
  useDeleteAccount,
  usePaymentMethod,
} from "@/hooks/useSettingsMutations";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AutocompleteComponent } from "./address-autocomplete";
import { SaveAccount } from "./account-buttons";
import PaymentMethodSelector from "./payment-selector";
import { PaymentDetails } from "@/types/firebase-types";
import { useIsPaymentDetailsEmpty } from "@/hooks/usePaymentDetailsEmpty";
import { CalendarForm } from "./calender-form";

const SettingsPage = () => {
  const { user } = useAuth();
  const [addressNew, setAddressNew] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    name: "",
    details: {},
  });

  const { mutate: uploadMutation } = useUploadProfilePicture();
  const { mutate: uploadAddressMutation } = useUploadAddress();
  const { mutate: uploadDobMutation } = useDob();
  const { mutate: deleteAccountMutation } = useDeleteAccount();
  const { mutate: uploadPaymentMethod } = usePaymentMethod();
  const [dob, setDob] = useState("");
  const [existingDob, setExistingDob] = useState("");
  const [existingAddress, setExistingAddress] = useState("");
  const [existingPayment, setExistingPayment] = useState("");
  const isPaymentDetailsEmpty = useIsPaymentDetailsEmpty(paymentDetails);
  const savable = profilePicture || addressNew || dob || !isPaymentDetailsEmpty;

  useEffect(() => {
    const fetchUserAddress = async () => {
      if (user?.customClaims.address) {
        setExistingAddress(user?.customClaims.address);
      }
    };
    fetchUserAddress();
  }, []);

  useEffect(() => {
    const fetchUserDob = async () => {
      if (user?.customClaims.dob) {
        setExistingDob(user?.customClaims.dob);
      }
    };
    fetchUserDob();
  }, []);

  useEffect(() => {
    const fetchUserPayment = async () => {
      if (user?.customClaims.payment) {
        setExistingPayment(user?.customClaims.payment);
      }
    };
    fetchUserPayment();
  }, []);

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setProfilePicture(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setProfilePicture(null);
      setPreviewUrl(null);
    }
  };

  const handleSave = useCallback(() => {
    if (profilePicture) {
      uploadMutation(profilePicture);
    }
    if (addressNew) {
      uploadAddressMutation(addressNew as any);
    }
    if (dob) {
      uploadDobMutation(dob as any);
    }
    if (!isPaymentDetailsEmpty) {
      uploadPaymentMethod(paymentDetails as any);
    }
  }, [profilePicture, addressNew, dob, paymentDetails, isPaymentDetailsEmpty]);

  const handleDeleteAccount = useCallback(() => {
    deleteAccountMutation();
  }, [deleteAccountMutation]);

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
                className="cursor-pointer block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />

              {profilePicture && (
                <p className="text-gray-700 mt-2">
                  Selected file: {profilePicture.name}
                </p>
              )}
            </div>

            <h2 className="font-bold text-5xl py-8">{user?.displayName}</h2>

            <div className="mb-8">
              <label className="block text-lg font-semibold mb-2">
                Date of Birth
              </label>
              <CalendarForm
                existingDob={existingDob}
                dob={dob}
                setDob={setDob}
              />
            </div>

            <div className="mb-8">
              <label className="block text-lg font-semibold mb-2">
                Address
              </label>
              <AutocompleteComponent
                setAddressNew={setAddressNew}
                existingAddress={existingAddress}
              />
            </div>

            <div className="mb-8">
              <label className="block text-lg font-semibold mb-2">
                Payment Method
              </label>
              <PaymentMethodSelector
                setPaymentDetails={setPaymentDetails}
                setPaymentMethod={setPaymentMethod}
                paymentMethod={paymentMethod}
                paymentDetails={paymentDetails}
                existingPayment={existingPayment}
              />
            </div>

            <div className="flex justify-center">
              <SaveAccount clickable={savable} handleSave={handleSave} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
