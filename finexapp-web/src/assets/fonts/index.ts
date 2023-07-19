import localFont from "@next/font/local";

export const Metropolis = localFont<"--font-metropolis">({
  variable: "--font-metropolis",
  src: [
    {
      path: "./Metropolis-Black.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Metropolis-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Metropolis-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Metropolis-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Metropolis-Light.otf",
      weight: "300",
      style: "normal",
    },
  ],
});


