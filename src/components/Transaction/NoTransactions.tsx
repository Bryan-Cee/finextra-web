import React from "react";
import MoneyMedium from "@/assets/img/multi-currency-medium-1x.webp";
import MoneyMedium2x from "@/assets/img/multi-currency-medium-2x.webp";
import MoneySmall from "@/assets/img/multi-currency-small-1x.webp";
import MoneySmall2x from "@/assets/img/multi-currency-small-2x.webp";

export const NoTransactions = () => {
  return (
    <div className="text-center">
      <picture>
        <source
          width="200"
          height="200"
          media="(max-width: 575px)"
          srcSet={`${MoneySmall.src} 1x, ${MoneySmall2x.src} 2x`}
        />
        <img
          alt="multi currency"
          data-testid="wds-multi-currency-illustration"
          className="m-auto p-4"
          loading="eager"
          src={MoneyMedium.src}
          srcSet={`${MoneyMedium.src} 1x, ${MoneyMedium2x.src} 2x`}
          width="300"
          height="300"
        />
      </picture>
      <h2 className="text-center text-2xl font-semibold leading-8">
        Nothing to show here yet
      </h2>
      <div className="m-t-1">
        <p>Your transactions will show here.</p>
      </div>
    </div>
  );
};
