import { useState } from "react";
import Section from "../../components/Section";
import Histories from "./components/Histories";
import PromptBox from "./components/PromptBox";

const Chats = () => {
  const [chats, setChats] = useState([
    {
      _id: 0,
      userPrompt: "hello! how are you?",
      botReply: "Hi! there I'm good, how about you?",
      image: "",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSendPrompt = (e) => {
    e.preventDefault();

    setLoading(true);

    const prompt = e.target.prompt.value;

    setChats((prev) => {
      return [
        ...prev,
        { _id: prompt, userPrompt: prompt, botReply: "loading", image: "" },
      ];
    });
    //   send prompt to backend

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
