/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: [
          "averta",
          '"avenir w02"',
          "avenir",
          "helvetica",
          "arial",
          "sans-serif",
        ],
      },
      colors: {
        "content-primary": "#37517e",
        "content-secondary": "#5d7079",
        "content-tertiary": "#768e9c",
        "content-accent": "#0097c7",
        "content-accent-hover": "#0084b3",
        "content-accent-active": "#0077a5",
        "content-positive": "#008026",
        "content-positive-hover": "#006d13",
        "content-positive-active": "#006002",
        "content-negative": "#cf2929",
        "content-negative-hover": "#b80419",
        "content-negative-active": "#a7000d",
        "content-warning": "#9a6500",
        "content-warning-hover": "#855400",
        "content-warning-active": "#764700",
        "interactive-accent": "#00a2dd",
        "interactive-accent-hover": "#008fc9",
        "interactive-accent-active": "#0081ba",
        "interactive-positive": "#2ead4b",
        "interactive-positive-hover": "#069939",
        "interactive-positive-active": "#008b2b",
        "interactive-negative": "#e74848",
        "interactive-negative-hover": "#d03238",
        "interactive-negative-active": "#bf1e2c",
        "interactive-warning": "#df8700",
        "interactive-warning-hover": "#c97500",
        "interactive-warning-active": "#b86700",
        "interactive-secondary": "#c9cbce",
        "interactive-secondary-hover": "#b5b7ba",
        "interactive-secondary-active": "#a7a9ab",
        "background-screen": "#fff",
        "background-elevated": "#fff",
        "background-neutral": "#86a7bd1a",
        "background-accent": "#38c8ff1a",
        "background-positive": "#36c7971a",
        "background-negative": "#ff87871a",
        "background-warning": "#ffac001a",
        "background-overlay": "#0000001a",
        "border-neutral": "#0000001a",
        "border-overlay": "#0000001a",
        primary: "#37517e",
        secondary: "#5d7079",
        accent: "#00b9ff",
        positive: "#2ed06e",
        negative: "#f53636",
        warning: "#ffa600",
      },
      gridTemplateRows: {
        layout: "1fr 2rem",
      },
    },
  },
  plugins: [],
};
