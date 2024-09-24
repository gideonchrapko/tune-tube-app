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

export default function PaymentMethodSelector({
  paymentMethod,
  paymentDetails,
  setPaymentDetails,
  setPaymentMethod,
}: {
  paymentMethod: any;
  paymentDetails: any;
  setPaymentDetails: any;
  setPaymentMethod: any;
}) {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    setPaymentDetails((prevState: any) => ({
      [paymentMethod]: {
        ...prevState[paymentMethod as keyof PaymentDetails],
        [field]: event.target.value,
      },
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Payment details submitted:", paymentDetails);

    // Handle the submission logic here
  };

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
    setPaymentDetails({});
  };

  return (
    <Card className="w-full max-w-md mx-0">
      <CardHeader>
        <CardDescription>
          Choose your preferred payment method and enter the details.
        </CardDescription>
      </CardHeader>
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
        </CardFooter>
      </form>
    </Card>
  );
}
