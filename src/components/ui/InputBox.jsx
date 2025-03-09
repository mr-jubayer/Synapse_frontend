import Input from "./Input";

const InputBox = ({ label, ...rest }) => {
  return (
    <label>
      <p className="mb-2 text-n-2">{label} </p>
      <Input {...rest} />
    </label>
  );
};

export default InputBox;
