"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Star, Check, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";

export default function MatchingPage() {
  const users = [
    {
      id: 1,
      name: "Oruc Melikov",
      age: 18,
      bio: "BHOS student · Designing",
      image:
        "https://res.cloudinary.com/dzw2udcre/image/upload/v1769996921/oruc_ftgei9.png",
    },
    {
      id: 2,
      name: "Aysel Karimova",
      age: 21,
      bio: "Economics · Loves clean spaces",
      image:
        "https://res.cloudinary.com/dzw2udcre/image/upload/v1769996920/nermin_xe9oat.png",
    },
    {
      id: 3,
      name: "Elvin Mammadov",
      age: 23,
      bio: "Software engineering · Night owl",
      image:
        "https://res.cloudinary.com/dzw2udcre/image/upload/v1769997004/images_wp4qzi.jpg",
    },
  ];

  const [index, setIndex] = useState(0);
  const [step, setStep] = useState<"matching" | "matched" | "subscription">(
    "matching",
  );
  const [showPayment, setShowPayment] = useState(false);

  const currentUser = users[index];

  const swipe = (direction: "left" | "right") => {
    if (direction === "right") {
      setStep("matched");
    } else {
      setIndex((i) => Math.min(i + 1, users.length - 1));
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      {step === "matching" && currentUser && (
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <h1 className="text-xl font-semibold text-center mb-4 text-primary">
              Find your roommate
            </h1>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentUser.id}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src={currentUser.image}
                  alt={currentUser.name}
                  loading="eager"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute bottom-0 w-full bg-black/50 p-4 text-white">
                  <p className="font-semibold">
                    {currentUser.name}, {currentUser.age}
                  </p>
                  <p className="text-sm">{currentUser.bio}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center mt-6 px-4">
              <Button
                size="lg"
                onClick={() => swipe("left")}
                className="p-0 rounded-full w-14 h-14 bg-white hover:bg-white"
              >
                <X strokeWidth={4} className="h-full! w-full! text-red-500" />
              </Button>

              <Button
                size="icon"
                className="p-0 rounded-full w-10 h-10 bg-white hover:bg-white"
              >
                <Star className="text-blue-500" />
              </Button>

              <Button
                onClick={() => swipe("right")}
                className="p-0 rounded-full w-14 h-14 bg-white hover:bg-white"
              >
                <Heart
                  width={36}
                  strokeWidth={3}
                  className="text-green-500 h-full! w-full!"
                />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "matched" && (
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <h1 className="text-2xl font-bold text-primary mb-4">
              Congratulations 🎉
            </h1>
            <p className="mb-6 text-muted-foreground">It’s a match!!!</p>

            <div className="flex justify-center gap-4 mb-8">
              <img
                src="https://res.cloudinary.com/dzw2udcre/image/upload/v1769997180/images_ky8vgr.jpg"
                className="w-28 h-36 object-cover rounded-xl"
              />
              <img
                src={currentUser.image}
                className="w-28 h-36 object-cover rounded-xl"
              />
            </div>

            <Button
              className="w-full bg-primary text-white mb-3"
              onClick={() => setStep("subscription")}
            >
              Say hello 👋
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setStep("matching")}
            >
              Keep swiping
            </Button>
          </CardContent>
        </Card>
      )}

      {step === "subscription" && (
        <div className="w-full max-w-3xl">
          <h1 className="text-2xl font-bold text-center text-primary mb-8">
            Choose your subscription
          </h1>

          <div className="grid md:grid-cols-3 gap-6">
            <SubscriptionCard
              name="Yoldas"
              badge="Bronze"
              features={["15 matches", "Messaging"]}
              onSelect={() => setShowPayment(true)}
              price="2.99$/month"
            />
            <SubscriptionCard
              name="Sirdas"
              badge="Silver"
              features={["30 matches", "Messaging"]}
              onSelect={() => setShowPayment(true)}
              price="4.99$/month"
            />
            <SubscriptionCard
              name="Dost"
              badge="Gold"
              features={["Unlimited matches", "24/7 Priority support"]}
              onSelect={() => setShowPayment(true)}
              price="11.99$/month"
            />
          </div>
        </div>
      )}

      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Card payment</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
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
              <CreditCard className="mr-2 h-4 w-4" /> Pay now
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
    <Card className={highlight ? "border-primary" : ""}>
      <CardContent className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-1">{name}</h2>
        <span
          className={`inline-block mb-4 px-3 py-1 text-xs font-semibold rounded-full ${badge === "Bronze" ? "bg-amber-200 text-amber-800" : badge === "Silver" ? "bg-slate-200 text-slate-800" : "bg-yellow-300 text-yellow-900"}`}
        >
          {badge} Premium
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
