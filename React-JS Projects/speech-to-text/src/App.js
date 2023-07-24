import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition, } from "react-speech-recognition";
import { useClipboard } from "use-clipboard-copy";

import "./App.css";

const App = () => {
    const [textToCopy, setTextToCopy] = useState("");
    const clipboard = useClipboard();

    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    const startListening = () => {
        if (browserSupportsSpeechRecognition) 
        {
            SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
        }
    };

    const stopListening = () => {
        if (browserSupportsSpeechRecognition) 
        {
            SpeechRecognition.stopListening();
        }
    };

    const handleCopyToClipboard = () => {
        clipboard.copy(transcript);
        setTextToCopy(transcript);
    };

    const handleClear = () => {
        resetTranscript();
        setTextToCopy("");
    };

    if (!browserSupportsSpeechRecognition) 
    {
        return <div>Speech recognition is not supported in your browser.</div>;
    }

    return (
        <div className="App">
        <h1>Speech to Text Converter</h1>

        <div className="container">{transcript}</div>

        <div className="buttons">
            <button onClick={startListening}>Start Listening</button>
            <button onClick={stopListening}>Stop Listening</button>
            <button onClick={handleCopyToClipboard}>
                {textToCopy ? "Copied!" : "Copy to clipboard"}
            </button>
            <button onClick={handleClear}>Clear</button>
        </div>
        </div>
    );
};

export default App;