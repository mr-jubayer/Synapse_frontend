import { botIcon } from "../../../assets";
import { NoMessage } from "./NoMessage";

const Histories = ({ chats }) => {
  if (!chats.length) {
    return <NoMessage />;
  }

  return (
    <div className="flex items-center px-5 lg:px-7.5 xl:px-10 lg:pt-0 pt-28 pb-44 lg:w-8/12 mx-auto">
      <div className="w-full  p-4 text-white/90">
        {chats.map((chat) => (
          <div key={chat._id}>
            {/* user prompts */}
            <div className="flex justify-end ">
              <p className="px-5 py-2 bg-n-4/20 rounded-full rounded-tr-none text-sm">
                {chat.userPrompt}{" "}
              </p>
            </div>

            {/* bot replies */}
            <div className="flex gap-3 mt-3 text-sm lg:w-8/12 w-10/12">
              <img
                src={botIcon}
                alt={"bot icon"}
                className="grayscale-100 invert-100 size-6"
              />

              {chat.botReply === "loading" ? (
                <div className="py-1 opacity-60 flex h-5 -mt-9">
                  <span className="animate-pulse text-6xl block">.</span>
                  <span className="animate-pulse text-6xl block delay-75">
                    .
                  </span>
                  <span className="animate-pulse text-6xl block delay-100">
                    .
                  </span>
                </div>
              ) : (
                <div>
                  <p> {chat.botReply} </p>
                  <img src="sdfsd" alt="" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Histories;
