/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    "bg-orange-100",
    "bg-orange-500",
    "bg-red-100",
    "bg-red-500",
    "bg-yellow-100",
    "bg-yellow-500",
    "bg-green-100",
    "bg-green-500",

    "text-orange-800",
    "text-red-800",
    "text-yellow-800",
    "text-green-800",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
