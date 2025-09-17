/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        cloudLoop: {
          "0%": { transform: "translateX(-20vw)" },
          "100%": { transform: "translateX(100vw)" },
        },
      },
      animation: {
        cloudLoop: "cloudLoop 30s linear infinite",
      },
      colors: {
        comunismo: '#EA0A27'
      }
    },
  },
  plugins: [],
};
