"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PaymentDetails } from "@/types/firebase-types";
import { useState } from "react";

export default function PaymentMethodSelector({
  paymentMethod,
  paymentDetails,
  setPaymentDetails,
  setPaymentMethod,
  existingPayment,
}: {
  paymentMethod: string;
  paymentDetails: PaymentDetails;
  setPaymentDetails: React.Dispatch<React.SetStateAction<PaymentDetails>>;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  existingPayment: any;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const formComplete = submitted && !isEditing;
  const isPaymentPopulatedNotEditting = existingPayment && !isEditing;
  const isPaymentPopulatedIsEditting = existingPayment && isEditing;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPaymentDetails({
      name: paymentMethod,
      details: formData,
    });
    setSubmitted(true);
    setIsEditing(false);
  };

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
    setFormData({});
  };

  const handleEdit = () => {
    setIsEditing(true);
    setSubmitted(false);
  };

  return (
    <Card className="w-full max-w-md mx-0">
      <CardHeader>
        <CardDescription>
          {submitted
            ? "Your payment method:"
            : "Choose your preferred payment method and enter the details."}
        </CardDescription>
      </CardHeader>
      {formComplete || isPaymentPopulatedNotEditting ? (
        <CardContent className="space-y-4">
          <h3 className="font-bold text-lg capitalize">
            {paymentDetails?.name?.toUpperCase()}
            {existingPayment?.name?.toUpperCase()}
          </h3>
          <Button onClick={handleEdit} className="mt-4">
            Edit Payment Details
          </Button>
        </CardContent>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Select
                onValueChange={handlePaymentMethodChange}
                value={paymentMethod}
              >
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wire">Wire</SelectItem>
                  <SelectItem value="ach">ACH</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {paymentMethod === "wire" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="swift-code">SWIFT Code</Label>
                    <Input
                      id="swift-code"
                      placeholder="AAAABBCCDDD"
                      required
                      onChange={(e) => handleInputChange(e, "swiftCode")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account-number">Account Number</Label>
                    <Input
                      id="account-number"
                      placeholder="123456"
                      required
                      onChange={(e) => handleInputChange(e, "accountNumber")}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bank-address">Bank Address</Label>
                  <Input
                    id="bank-address"
                    placeholder="Bank Address"
                    required
                    onChange={(e) => handleInputChange(e, "bankAddress")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing-address">Billing Address</Label>
                  <Input
                    id="billing-address"
                    placeholder="Billing Address"
                    required
                    onChange={(e) => handleInputChange(e, "billingAddress")}
                  />
                </div>
              </div>
            )}

            {paymentMethod === "ach" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Name"
                    required
                    onChange={(e) => handleInputChange(e, "name")}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="account-number">Account Number</Label>
                    <Input
                      id="account-number"
                      placeholder="12345"
                      required
                      onChange={(e) => handleInputChange(e, "accountNumber")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="routing-number">Routing Number</Label>
                    <Input
                      id="routing-number"
                      placeholder="1235"
                      required
                      onChange={(e) => handleInputChange(e, "routingNumber")}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="paypal-email">PayPal Email</Label>
                  <Input
                    id="paypal-email"
                    placeholder="PayPal Email"
                    required
                    onChange={(e) => handleInputChange(e, "paypalEmail")}
                  />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={!paymentMethod}>
              {paymentMethod
                ? `Save ${paymentMethod.replace("-", " ")}`
                : "Select your payment method"}
            </Button>
            {isPaymentPopulatedIsEditting && (
              <Button className="mx-2" onClick={handleEdit}>
                Finished Editing
              </Button>
            )}
          </CardFooter>
        </form>
      )}
    </Card>
  );
}
