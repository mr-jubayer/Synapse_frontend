import { useState } from "react";
import Histories from "./components/Histories";
import PromptBox from "./components/PromptBox";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const Chats = () => {
  const [chats, setChats] = useState([
    {
      _id: 0,
      userPrompt: "hello! how are you?",
      botReply: "Hi! there I'm good, how about you?",
      image: "",
      timestamp: "",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleSendPrompt = async (e) => {
    e.preventDefault();

    setLoading(true);
    const prompt = e.target.prompt.value;
    const doc = {
      _id: chats.length,
      userPrompt: prompt,
      botReply: "loading",
      image: "",
      timestamp: new Date(),
    };

    setChats((prev) => {
      return [...prev, doc];
    });

    // send prompt to backend
    const { data } = await axiosSecure.post(
      `${import.meta.env.VITE_api_url}/api/chats/create-chat`,
      {
        userEmail: user?.email || null,
        userPrompt: prompt,
        botReply: "loading",
        image: "",
        timestamp: new Date(),
      }
    );

    console.log(data);

    const updateState = (prevChats) => {
      return prevChats.map((chat) => {
        const oldTime = JSON.stringify(chat.timestamp);
        const updateTime = JSON.stringify(data.result.timestamp);

        if (oldTime == updateTime) {
          return data.result;
        }

        return chat;
      });
    };

    setChats(updateState);

    setLoading(false);
  };
  return (
    <div className={"relative"}>
      <Histories chats={chats} />
      <PromptBox handleSendPrompt={handleSendPrompt} loading={loading} />
    </div>
  );
};

export default Chats;
