"use client";
import React from "react";
import useSearchStore from "@/app/store/useSearchStore";
import Link from "next/link";
import { motion } from "framer-motion";

const formatDate = (iso: string): string => {
  const date = new Date(iso);
  return date.toLocaleString("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SearchHistoryPage: React.FC = () => {
  const { searchHistory } = useSearchStore();

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          Historial de Búsquedas
        </h1>

        {searchHistory.length === 0 ? (
          <p className="text-gray-500 text-center">
            Aún no realizaste ninguna búsqueda.
          </p>
        ) : (
          <motion.ul
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={listVariants}
          >
            {searchHistory.map((entry, index) => (
              <motion.li
                key={index}
                className="bg-blue-100 hover:bg-blue-200 transition-colors duration-200 text-blue-800 px-4 py-3 rounded-lg shadow-sm"
                variants={itemVariants}
              >
                <Link href={`/airports?name=${entry.query}`}>
                  <p className="font-semibold">{entry.query}</p>
                  <p className="text-sm text-blue-700 italic">
                    {formatDate(entry.timestamp)}
                  </p>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="border p-4 text-white text-center border-white cursor-pointer font-semibold rounded-lg bg-gradient-to-r from-[#006AFF] to-[#00F9FF] hover:opacity-80 shadow-md gap-2 hover:bg-blue-600 transition focus:outline-none"
          >
            Volver a buscar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchHistoryPage;