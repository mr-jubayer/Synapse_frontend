import SendBtn from "./SendBtn";

const PromptBox = ({ handleSendPrompt, loading }) => {
  return (
    <div className="fixed bottom-0 pb-6 pt-3 flex justify-center w-full px-3 bg-primary">
      <form onSubmit={handleSendPrompt} className=" max-w-2xl w-full">
        <label className="flex items-center relative w-full">
          <textarea
            className="bg-[#1A1A2E] relative outline-none w-full  px-3 py-2 text-[#ffffffcd] rounded-md resize-none focus:ring focus:ring-1 "
            rows={3}
            name="prompt"
            placeholder="Ask Ai Anything.."
          ></textarea>
          <SendBtn loading={loading} />
        </label>
      </form>
    </div>
  );
};

export default PromptBox;
