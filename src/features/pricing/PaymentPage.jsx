import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router";
import Input from "../../components/ui/Input";
import "./payment.css";
import Button from "../../components/ui/Button";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_pk);

const CheckOutForm = () => {
  const { state } = useLocation();
  const axiosSecure = useAxiosSecure();
  const [monthDuration, setMonthDuration] = useState(1);
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const getPaymentIntent = async () => {
      const { data } = await axiosSecure.post(
        "/api/payment/create-payment-intent",
        {
          monthDuration: monthDuration,
          perMonth: state.price,
          title: state.title,
        }
      );

      setClientSecret(data.client_secret);
    };

    getPaymentIntent();
  }, [state, monthDuration]);

  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!elements || !stripe) return;

    // get card element reference for validation
    const card = elements.getElement(CardElement);

    if (!card) {
      // do something
      return;
    }

    // create payment method with my cart
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      return console.log(error);
    }

    console.log(paymentMethod);

    // confirm payment

    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email: user.email,
          name: user.displayName,
        },
      },

      // if "paymentIntent" is successful then -> store payment history and show alert or bla, bla
    });

    console.log(paymentIntent);
  };

  return (
    <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
          Contact sales
        </h2>
        <p className="mt-2 text-lg/8 text-gray-600">
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div>
      <form
        onSubmit={handlePayment}
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#ededed",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
            <Button type="submit" disabled={!stripe || !elements}>
              Pay
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckOutForm />
    </Elements>
  );
};

export default PaymentPage;

{
  /* <div>
<label
  htmlFor="first-name"
  className="block text-sm/6 font-semibold text-gray-900"
>
  First name
</label>
<div className="mt-2.5">
  <Input
    id="first-name"
    name="first-name"
    type="text"
    autoComplete="given-name"
  />
</div>
</div>
<div>
<label
  htmlFor="last-name"
  className="block text-sm/6 font-semibold text-gray-900"
>
  Last name
</label>
<div className="mt-2.5">
  <Input
    id="last-name"
    name="last-name"
    type="text"
    autoComplete="family-name"
  />
</div>
</div>
<div className="sm:col-span-2">
<label
  htmlFor="company"
  className="block text-sm/6 font-semibold text-gray-900"
>
  Company
</label>
<div className="mt-2.5">
  <Input
    id="company"
    name="company"
    type="text"
    autoComplete="organization"
  />
</div>
</div>
<div className="sm:col-span-2">
<label
  htmlFor="email"
  className="block text-sm/6 font-semibold text-gray-900"
>
  Email
</label>
<div className="mt-2.5">
  <Input
    id="email"
    name="email"
    type="email"
    autoComplete="email"
  />
</div>
</div>
<div className="sm:col-span-2">
<label
  htmlFor="phone-number"
  className="block text-sm/6 font-semibold text-gray-900"
>
  Phone number
</label>
<div className="mt-2.5">
  <div className="flex rounded-md bg-n-4 outline-1 -outline-offset-1 outline-gray-300 has-[Input:focus-within]:outline-2 has-[Input:focus-within]:-outline-offset-2 has-[Input:focus-within]:outline-indigo-600">
    <div className="grid shrink-0 grid-cols-1 focus-within:relative">
      <select
        id="country"
        name="country"
        autoComplete="country"
        aria-label="Country"
        className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pr-7 pl-3.5 text-base text-gray-300 bg-black placeholder:text-gray-400  sm:text-sm/6"
      >
        <option>US</option>
        <option>CA</option>
        <option>EU</option>
      </select>
    </div>
    <Input
      id="phone-number"
      name="phone-number"
      type="text"
      placeholder="123-456-7890"
      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
    />
  </div>
</div>
</div>
</div>
<div className="mt-10">
<button
type="submit"
className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
>
Let's talk
</button>
</div> */
}
