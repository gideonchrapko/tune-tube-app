// "use client";

// import AddressAutoComplete, {
//   AddressType,
// } from "@/components/ui/address-autocomplete";
// import { useEffect, useState } from "react";

// export const AutocompleteComponent = ({
//   setAddressNew,
//   existingAddress,
// }: {
//   setAddressNew: (address: string) => void;
//   existingAddress: string;
// }) => {
//   const [address, setAddress] = useState<AddressType>({
//     address1: "",
//     address2: "",
//     formattedAddress: "",
//     city: "",
//     region: "",
//     postalCode: "",
//     country: "",
//     lat: 0,
//     lng: 0,
//   });
//   const [searchInput, setSearchInput] = useState("");

//   useEffect(() => {
//     if (address.formattedAddress) {
//       setAddressNew(address.formattedAddress);
//     }
//   }, [address, setAddressNew]);

//   return (
//     <AddressAutoComplete
//       address={address}
//       setAddress={setAddress}
//       searchInput={searchInput}
//       setSearchInput={setSearchInput}
//       dialogTitle="Enter Address"
//       placeholder={existingAddress}
//     />
//   );
// };

"use client";

import AddressAutoComplete, {
  AddressType,
} from "@/components/ui/address-autocomplete";
import { useEffect, useState, useRef } from "react";

export const AutocompleteComponent = ({
  setAddressNew,
  existingAddress,
}: {
  setAddressNew: (address: string) => void;
  existingAddress: string;
}) => {
  const [address, setAddress] = useState<AddressType>({
    address1: "",
    address2: "",
    formattedAddress: "",
    city: "",
    region: "",
    postalCode: "",
    country: "",
    lat: 0,
    lng: 0,
  });
  const [searchInput, setSearchInput] = useState("");
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (address.formattedAddress) {
      setAddressNew(address.formattedAddress);
    }
  }, [address, setAddressNew]);

  const handleAddressChange = (newAddress: AddressType) => {
    setAddress(newAddress);
  };

  const handleSearchInputChange = (input: string) => {
    setSearchInput(input);
  };

  return (
    <AddressAutoComplete
      address={address}
      setAddress={handleAddressChange}
      searchInput={searchInput}
      setSearchInput={handleSearchInputChange}
      dialogTitle="Enter Address"
      placeholder={existingAddress}
      disableInitialFetch={true}
    />
  );
};
