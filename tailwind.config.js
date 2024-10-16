const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    fontFamily: {
      anton: "Anton SC", // Added font family
    },
    backgroundImage: {
      mh: "url('/bgimage.webp')", // Added background image
    },
    extend: {
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        "infinite-slide": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        // Add new keyframes here
        "spin-slow2": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        "infinite-slide": "infinite-slide 30s linear infinite",
        spinslow: "spin 5s infinite", // New slow spin animation
        spinslow2: "spin-slow2 4s infinite", // Added new slow spin animation
      },
    },
  },
  plugins: [addVariablesForColors],
};
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
