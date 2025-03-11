import {
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router";
// import "./payment.css";
import Button from "../../components/ui/Button";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import CardForm from "./components/CardForm";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_pk);

const CheckOutForm = () => {
  const { state } = useLocation();
  const axiosSecure = useAxiosSecure();
  const [monthDuration, setMonthDuration] = useState(1);
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();

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

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!elements || !stripe) return;

    setIsLoading(true);
    // get card element reference for validation
    const card = elements.getElement(CardNumberElement);

    if (!card) {
      // do something
      return;
    }

    try {
      // create payment method with my card
      const { error: paymentMethodErr, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card,
          billing_details: {
            email: user.email,
            name: user.displayName,
          },
        });

      if (paymentMethodErr) {
        return console.log(paymentMethodErr);
      }

      // confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: paymentMethod.id,
        }
      );

      if (paymentIntent.status === "succeeded") {
        alert("payment success");
      } else {
        setErr("payment confirmation failed!");
      }

      // if "paymentIntent" is successful then -> store payment history and show alert or bla, bla
      console.log(paymentIntent);
    } catch (error) {
      setErr(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
      <form
        onSubmit={handlePayment}
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <CardForm />
            <Button type="submit" disabled={!stripe || !elements || isLoading}>
              {isLoading ? "Loading..." : "Pay"}
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
