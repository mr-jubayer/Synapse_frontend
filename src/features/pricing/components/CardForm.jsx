import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import Heading from "../../../components/Heading";
import { useEffect, useState } from "react";

const options = {
  style: {
    base: {
      color: "#FFFFFF",
      fontSize: "16px",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      "::placeholder": {
        color: "#B0B0B0",
      },
    },
  },
};

const classes = ` block w-full text-[#ffffffcd]  bg-[#1A1A2E]    px-3 py-2  rounded-md  focus:ring focus:ring-1 `;

const CardForm = ({
  children,
  paymentPackages,
  selectedPackage,
  setSelectedPackage,
  perMonth,
  err,
  state,
}) => {
  // useEffect(() => {
  //   const calculateTotalCost = parseFloat(perMonth) * selectedPackage.cost;

  //   console.log(calculateTotalCost);
  // }, [selectedPackage, perMonth]);

  const selectHandler = (e) => {
    const selected = paymentPackages.find((pk) => pk.label === e.target.value);
    setSelectedPackage(selected);
  };

  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            <Heading title="Payment" />

            <div className="flex lg:flex-row gap-6 flex-col-reverse lg:items-start lg:gap-12">
              <div className="w-full rounded-lg border border-gray-200   bg-[#110c1b] p-4 shadow-sm dark:border-gray-700  sm:p-6 lg:max-w-xl lg:p-8">
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="col-span-2 ">
                    <label
                      htmlFor="card-number-input"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Card number* ( 4242 4242 4242 4242 )
                    </label>
                    <div className="relative">
                      <CardNumberElement
                        id="card-number-input"
                        options={options}
                        className={classes}
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="card-expiration-input"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Card expiration*
                    </label>
                    <div className="relative">
                      <CardExpiryElement
                        id="card-expiration-input"
                        options={options}
                        className={classes}
                        placeholder="12/23"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="cvv-input"
                      className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      CVV*
                    </label>
                    <CardCvcElement
                      id="cvv-input"
                      options={options}
                      className={classes}
                      placeholder="•••"
                      required
                    />
                  </div>
                </div>

                {children}
                <div className="text-red-400 mt-3">{err}</div>
              </div>

              <div className="mt-6 grow sm:mt-8 lg:mt-0 ">
                <div className="space-y-4 rounded-lg border border-gray-100 bg-[#110c1b] p-6 dark:border-gray-700 ">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Subscription duration
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        <select
                          value={selectedPackage.label}
                          onChange={selectHandler}
                          className={`${classes} border-none`}
                        >
                          {paymentPackages.map((pd) => (
                            <option value={pd.label} key={pd.id}>
                              {" "}
                              {pd.label}{" "}
                            </option>
                          ))}
                          ={" "}
                        </select>
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Per Month
                      </dt>
                      <dd className="text-base font-medium text-green-500">
                        ${perMonth}
                      </dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total Pay
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      $91.00
                    </dd>
                  </dl>
                </div>

                <div className="mt-6 flex items-center justify-center gap-8">
                  <img
                    className="h-8 w-auto dark:hidden"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
                    alt=""
                  />
                  <img
                    className="hidden h-8 w-auto dark:flex"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg"
                    alt=""
                  />
                  <img
                    className="h-8 w-auto dark:hidden"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                    alt=""
                  />
                  <img
                    className="hidden h-8 w-auto dark:flex"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                    alt=""
                  />
                  <img
                    className="h-8 w-auto dark:hidden"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
                    alt=""
                  />
                  <img
                    className="hidden h-8 w-auto dark:flex"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-gray-500 dark:text-gray-400 sm:mt-8 lg:text-left">
              Payment processed by{" "}
              <a className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                Stripe{" "}
              </a>
              for{" "}
              <a className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                Synapse
              </a>{" "}
              - Sylhet Bangladesh
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CardForm;
