import React, { FunctionComponent, useState } from 'react';

interface TextToSpeechProps {
    text: string;
}

const TextToSpeech: FunctionComponent<TextToSpeechProps> = ({
    text
}: TextToSpeechProps) => {
    let speech = new SpeechSynthesisUtterance();
    speech.text = text;

    const start = () => {
        window.speechSynthesis.speak(speech);
    };

    const pause = () => {
        window.speechSynthesis.pause();
    };

    const resume = () => {
        window.speechSynthesis.resume();
    };

    const cancel = () => {
        window.speechSynthesis.cancel();
    };
    console.log(speech.volume);

    return (
        <div className="voice">
            <button onClick={start} className="btn-voice btn-voice-success"><i className="fas fa-microphone"></i></button>
            <button onClick={pause} className="btn-voice btn-voice-warning"><i className="fas fa-pause"></i></button>
            <button onClick={resume} className="btn-voice btn-voice-info"><i className="fas fa-play"></i></button>
            <button onClick={cancel} className="btn-voice btn-voice-danger"><i className="fas fa-window-close"></i></button>
        </div>
    )
}

export default TextToSpeech;
