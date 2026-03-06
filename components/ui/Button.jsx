"use client";

import { motion } from "framer-motion";

export default function Button({ text }) {
  return (
    <motion.button
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{
        background: "var(--primary-500)",
        color: "white",
        padding: "14px 30px",
        borderRadius: "12px",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
      }}
    >
      {text}
    </motion.button>
  );
}
