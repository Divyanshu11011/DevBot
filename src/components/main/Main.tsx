import { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import googleIcon from "../../assets/google-icon-logo-svgrepo-com.svg";
import "./main.css";
import { Context } from "../context/Context";
import { UserInput } from "../searchbutton/searchbtn";
import { BentoGridThirdDemo } from "../defchatscreen/defchatgrid";
import { MultiStepLoader } from "../multi-step-loader/msloadercomponent";

const loadingStates = [
  { text: "Oh, it seems like you pasted a URL" },
  { text: "Grabbing my magnifying glass..." },
  { text: "Bribing the internet elves for data..." },
];


const Main = () => {
    const {
        onSent,
        recentPrompt,
        prevPrompts,
        showResults,
        loading,
        responses,
        setInput,
        input,
        summarizeLink,
        history
    } = useContext(Context);

    const messagesEndRef = useRef(null);
    const [link, setLink] = useState("");
    const [showLoader, setShowLoader] = useState(false);

    const handleCardClick = (promptText) => {
        setInput(promptText);
        onSent();
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (showResults) {
            scrollToBottom();
        }
    }, [responses, showResults]);

    

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let updatedPrompt = input;
        const urlMatch = input.match(/(http[s]?:\/\/[^\s]+)/g);

        if (urlMatch) {
            setShowLoader(true); // Show loader when URL is detected
            const url = urlMatch[0];
            const apiUrl = `https://extractorapi.com/api/v1/extractor/?apikey=2555a0590c4fb927b0d1c085184c516c1108c625&url=${encodeURIComponent(url)}`;
           
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                if (data && data.text) {
                    updatedPrompt += `\n\nWebsite content: ${data.text}`;
                }
            } catch (error) {
                console.error("Error fetching website content:", error);
            } finally {
                setShowLoader(false); // Hide loader after processing
            }
        }
        setInput(updatedPrompt);
        onSent();
    };

    const handleGoogleIconClick = (response) => {
        const searchQuery = encodeURIComponent(response);
        const googleSearchUrl = `https://www.google.com/search?q=${searchQuery}`;
        window.open(googleSearchUrl, "_blank");
    };

    const renderGoogleIcon = (response) => (
        <img 
            src={googleIcon} 
            alt="Google Icon" 
            className="small-icon" 
            
            onClick={() => handleGoogleIconClick(response)} // Attach click handler
        />
    );

    return (
        
        <div className="main">
            <div className="nav">
                <p></p>
                <img src={"https://api.dicebear.com/8.x/lorelei/svg?backgroundColor=b6e3f4,c0aede,d1d4f9"} alt="" />
            </div>
            <div className="main-container">
                {!showResults ? (
                    <>
                        <BentoGridThirdDemo />
                    </>
                ) : (
                    <div className="results">
                        {prevPrompts.map((prompt, index) => (
                            <div key={index} className="result">
                                <div className="result-title">
                                    <img src={"https://api.dicebear.com/8.x/lorelei/svg?backgroundColor=d1d4f9"} alt="" />
                                    <p>{prompt}</p>
                                </div>
                                <div className="result-data">
                                    <img src={assets.gemini_icon} alt="" />
                                    {loading && index === prevPrompts.length - 1 ? (
                                        <div className="loader">
                                            <hr />
                                            <hr />
                                            <hr />
                                        </div>
                                    ) : (
                                        <div>
                                            <p dangerouslySetInnerHTML={{ __html: responses[prompt] }}></p>
                                            {renderGoogleIcon(responses[prompt])} {/* Pass the response */}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}
                <div className="main-bottom fixed bottom-4 w-full">
                    <UserInput
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
            {showLoader && (
                <MultiStepLoader 
                    loadingStates={loadingStates} 
                    loading={showLoader} 
                    duration={2000} 
                />
            )}
        </div>
    );
};

export default Main;
