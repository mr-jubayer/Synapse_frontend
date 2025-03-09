import "./helper.css";

const Input = ({
  placeholder,
  type,
  className = "",
  onChange,
  value,
  name,
  ...rest
}) => {
  const controlled = value ? { onChange, value } : {};

  const classes =
    "bg-[#1A1A2E] relative outline-none w-full  px-3 py-2 text-white/60 rounded-md  focus:ring focus:ring-1  ";

  return (
    <input
      name={name || "input"}
      type={type || "text"}
      placeholder={placeholder || "Enter your input"}
      {...controlled}
      className={`${className} ${classes}`}
      {...rest}
    />
  );
};

export default Input;
