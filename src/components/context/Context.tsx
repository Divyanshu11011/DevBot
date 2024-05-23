import { createContext, useState } from "react";
import runChat from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [responses, setResponses] = useState({});
    const [history, setHistory] = useState([]); // New state to maintain chat history

    const delayPara = (index, nextWord, prompt) => {
        setTimeout(function () {
            setResponses((prev) => ({
                ...prev,
                [prompt]: (prev[prompt] || "") + nextWord,
            }));
        }, 10 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResults(false);
        setHistory([]); // Clear history for a new chat
    };

    const onSent = async (prompt) => {
        setLoading(true);
        setShowResults(true);
        let response;
        let currentPrompt = prompt || input;
        setResponses((prev) => ({ ...prev, [currentPrompt]: "" }));

        if (prompt !== undefined) {
            response = await runChat(prompt, history);
            setRecentPrompt(prompt);
        } else {
            setPrevPrompts((prev) => [...prev, input]);
            setRecentPrompt(input);
            response = await runChat(input, history);
        }

        try {
            let responseArray = response.split("**");
            let newResponse = "";
            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<b>" + responseArray[i] + "</b>";
                }
            }
            let newResponse2 = newResponse.split("*").join("<br/>");
            let newResponseArray = newResponse2.split("");
            for (let i = 0; i < newResponseArray.length; i++) {
                const nextWord = newResponseArray[i];
                delayPara(i, nextWord + "", currentPrompt);
            }
            setHistory((prev) => [...prev, { prompt: currentPrompt, response: newResponse }]); // Update history
        } catch (error) {
            console.error("Error while running chat:", error);
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    const summarizeLink = async (link) => {
        setLoading(true);
        setShowResults(true);

        try {
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(link)}`;
            const response = await fetch(proxyUrl);
            const data = await response.json();
            const content = data.contents;

            const summary = await runChat(`Summarize this content: ${content}`, history);
            setResponses((prev) => ({
                ...prev,
                [link]: summary,
            }));
            setHistory((prev) => [...prev, { prompt: `Summarize this content: ${content}`, response: summary }]); // Update history
        } catch (error) {
            console.error("Error summarizing the link:", error);
            setResponses((prev) => ({
                ...prev,
                [link]: "Failed to summarize the link.",
            }));
        } finally {
            setLoading(false);
        }
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        input,
        setInput,
        showResults,
        loading,
        responses,
        newChat,
        summarizeLink,
        history, // Provide history in the context value
    };

    return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;
