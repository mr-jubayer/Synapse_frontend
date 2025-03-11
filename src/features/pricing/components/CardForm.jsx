import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";

const CardForm = () => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-xl text-black">
      try with: 4242 4242 4242 4242
      <div>
        <label>Card Number</label>
        <CardNumberElement className="bg-n-2 p-2 rounded" />
      </div>
      <div>
        <label>Expiration Date</label>
        <CardExpiryElement className="bg-n-2 p-2 rounded" />
      </div>
      <div>
        <label>CVC</label>
        <CardCvcElement className="bg-n-2 p-2 rounded" />
      </div>
    </div>
  );
};

export default CardForm;
