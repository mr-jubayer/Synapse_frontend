import { useEffect, useState } from "react";
import Histories from "./components/Histories";
import PromptBox from "./components/PromptBox";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    const histories = async () => {
      const { data } = await axiosSecure(
        `${import.meta.env.VITE_api_url}/api/chats/user-chats/${user?.email}`
      );
      setChats(data);
    };
    if (user) {
      histories();
    }
  }, [user]);

  const handleSendPrompt = async (e) => {
    e.preventDefault();

    const prompt = e.target.prompt.value;
    if (!prompt) return;
    setLoading(true);

    const doc = {
      _id: chats.length,
      userPrompt: prompt,
      botReply: "loading",
      image: "",
      timestamp: new Date(),
      userEmail: user?.email || null,
    };

    setChats((prev) => {
      return [...prev, doc];
    });

    // send prompt to server
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
