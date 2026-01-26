"use client"

import { Card, CardContent } from "@/components/ui/card"
import { HandHeart, BadgeDollarSign, Headset, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"

const items = [
  {
    title: "Instant & Easy Bookings",
    description: "Time is money. Save both when you book with us.",
    icon: HandHeart,
    color: "text-red-400",
  },
  {
    title: "Lowest Price Guarantee",
    description: "Find a lower price and we'll match it. No questions asked.",
    icon: BadgeDollarSign,
    color: "text-red-400",
  },
  {
    title: "24x7 Assistance",
    description: "If you have a doubt or a query, we're always a call away.",
    icon: Headset,
    color: "text-red-400",
  },
  {
    title: "100% Verified Listings",
    description: "We promise to deliver what you see on the website.",
    icon: ShieldCheck,
    color: "text-emerald-500",
  },
]

export default function Features() {
  return (
    <section className="w-full bg-white p-16 md:py-24">
      <div className="mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
            Book Your Perfect Accommodation
          </h2>

          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            Take the hassle out of securing your student home for the best years of your life
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="group border-none shadow-md hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 flex flex-col items-start">
                  <item.icon
                    className={`h-10 w-10 ${item.color} transition-transform duration-300 group-hover:scale-110`}
                  />

                  <h3 className="mt-6 text-lg font-semibold text-gray-900 transition-colors group-hover:text-gray-700">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-gray-600">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}