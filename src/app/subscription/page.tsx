"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Check, CreditCard } from "lucide-react";

export default function SubscriptionPage() {
  const [showPayment, setShowPayment] = useState(false);

  return (
    <div className="w-full px-16 mx-auto py-10">
      <h1 className="text-2xl font-bold text-center text-primary mb-8">
        Choose your subscription
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <SubscriptionCard
          name="Arxayin"
          badge="Verified"
          features={["View statistics for each listing", "Up to 20 listings/month", "5 boosts"]}
          price="$29/month"
          onSelect={() => setShowPayment(true)}
        />
        <SubscriptionCard
          name="Arxayin+"
          badge="Verified"
          features={["View statistics for each listing", "Individual login for agents", "Unlimited listings/month", "20 boosts"]}
          price="$52/month"
          onSelect={() => setShowPayment(true)}
        />
      </div>

      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Card payment</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 justify-center">
            <input
              placeholder="Card number"
              className="w-full border rounded-md p-2"
            />
            <div className="flex gap-2">
              <input
                placeholder="MM/YY"
                className="w-full border rounded-md p-2"
              />
              <input
                placeholder="CVC"
                className="w-full border rounded-md p-2"
              />
            </div>
            <Button className="w-full bg-primary text-white">
              <CreditCard className="mr-2 h-4 w-4 mb-0 mt-auto" /> Pay now
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SubscriptionCard({
  name,
  badge,
  features,
  onSelect,
  highlight,
  price,
}: {
  name: string;
  badge: string;
  features: string[];
  onSelect: () => void;
  highlight?: boolean;
  price?: string;
}) {
  return (
    <Card className={`${highlight ? "border-2 border-primary" : ""}`}>
      <CardContent className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-1">{name}</h2>
        <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold rounded-full bg-green-200 text-green-800">
          {badge}
        </span>
        <ul className="space-y-2 mb-6">
          {features.map((f) => (
            <li key={f} className="flex items-center justify-center gap-2">
              <Check className="h-4 w-4 text-primary" /> {f}
            </li>
          ))}
        </ul>
        <Label className="block mb-4 text-2xl font-bold">
          {price ? price : "Free"}
        </Label>
        <Button className="w-full bg-primary text-white" onClick={onSelect}>
          Select
        </Button>
      </CardContent>
    </Card>
  );
}