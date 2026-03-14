"use client";

import { motion } from "motion/react";

const stats = [
  { num: "12,000+", label: "Users empowered through MamaFund" },
  { num: "5,000+", label: "Telemedicine consultations facilitated" },
  { num: "3,000+", label: "Developers in Kampala Dev Hub" },
  { num: "$2M+", label: "Monthly transactions via NilePay" },
  { num: "800+", label: "Developers placed internationally" },
  { num: "6,000+", label: "Farmers reached via Tugende" },
];

export function StatsGrid() {
  return (
    <div className="rounded-2xl border border-border bg-card/50 p-8 md:p-12 mb-20">
      <h3 className="text-center mb-10" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}>
        Impact by the <span className="text-primary italic">numbers</span>
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="text-center"
          >
            <div className="text-primary mb-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 600 }}>
              {stat.num}
            </div>
            <div className="text-muted-foreground" style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
