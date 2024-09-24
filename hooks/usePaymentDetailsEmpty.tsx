import { PaymentDetails } from "@/types/firebase-types";

export const useIsPaymentDetailsEmpty = (
  details: PaymentDetails | null,
): boolean => {
  if (!details) return true;

  return (
    !details.name ||
    !details.details ||
    Object.keys(details.details).length === 0
  );
};
