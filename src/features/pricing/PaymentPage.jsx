import {
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, useNavigate } from "react-router";
// import "./payment.css";
import Button from "../../components/ui/Button";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import CardForm from "./components/CardForm";
import Section from "../../components/Section";
import toast from "react-hot-toast";
const stripePromise = loadStripe(import.meta.env.VITE_stripe_pk);

const paymentPackages = [
  {
    id: 1,
    label: "1 min",
    value: 0.6,
  },
  {
    id: 2,
    label: "1 mon",
    value: 1,
  },
  {
    id: 25,
    label: "2 mon",
    value: 2,
  },
  {
    id: 3,
    label: "3 mon",
    value: 3,
  },
  {
    id: 4,
    label: "4 mon",
    value: 4,
  },
  {
    id: 12,
    label: "12 mon",
    value: 12,
  },
];

const CheckOutForm = () => {
  const { state } = useLocation();
  const axiosSecure = useAxiosSecure();
  const [selectedPackage, setSelectedPackage] = useState(paymentPackages[1]);
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    let totalCost;

    if (selectedPackage.label === "1 min") {
      totalCost = selectedPackage["value"];
    }

    totalCost = parseFloat(state.price) * selectedPackage["value"];

    const getPaymentIntent = async () => {
      const { data } = await axiosSecure.post(
        "/api/payment/create-payment-intent",
        {
          totalCost: totalCost || 5,
          title: state.title,
        }
      );

      setClientSecret(data.client_secret);
    };

    getPaymentIntent();
  }, [state, selectedPackage]);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!elements || !stripe) return;

    setIsLoading(true);
    // get card element reference for validation
    const card = elements.getElement(CardNumberElement);

    if (!card) {
      setErr("something was wrong! try again.");
      setIsLoading(false);
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

      if (error) {
        setErr("Payment confirmation failed!");
      }

      if (paymentIntent.status === "succeeded") {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-black
             text-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="text-xl font-medium ">Payment success</p>
                  <p className="mt-1 text-sm ">
                    TransitionId: {paymentIntent.id}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-white hover:text-text-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ));
      }
      // if "paymentIntent" is successful then -> store payment history and show alert or bla, bla
      const result = {
        trxnId: paymentIntent.id,
        email: user.email,
        name: user.displayName,
        paymentAt: Date.now(),
        package: selectedPackage,
      };

      await axiosSecure.post("/api/payment/payment-history", {
        paymentInfo: result,
      });

      navigate("/");
    } catch (error) {
      setErr(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section className="isolate px-6 py-12 sm:py-14 lg:px-8">
      <form onSubmit={handlePayment} className="mx-auto  container">
        <div>
          <div>
            <CardForm
              paymentPackages={paymentPackages}
              selectedPackage={selectedPackage}
              perMonth={state.price}
              setSelectedPackage={setSelectedPackage}
              err={err}
              state={state}
            >
              <Button
                type="submit"
                disabled={!stripe || !elements || isLoading}
              >
                {isLoading ? "Loading..." : "Pay"}
              </Button>
            </CardForm>
          </div>
        </div>
      </form>
    </Section>
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
