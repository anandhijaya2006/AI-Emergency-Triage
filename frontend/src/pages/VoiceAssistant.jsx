
import { useEffect, useState } from "react";

const content = {
  English: {
    title: "Tamil + English Voice Assistant",
    subtitle: "Describe your concern using your voice or by typing.",
    placeholder: "Example: I have a headache...",
    listen: "🎙️ Start Speaking",
    stop: "Stop Listening",
    speak: "🔊 Read Response",
    clear: "Clear",
    welcome:
      "Hello! I can help you find basic first-aid information. I cannot diagnose medical conditions.",
    urgent:
      "This may be an emergency. Call 112 in India or your local emergency number now. Do not wait for this website.",
    response:
      "I can provide general first-aid information, but I cannot diagnose your symptoms. If symptoms are severe or worsening, seek urgent medical care.",
    error:
      "Voice recognition is unavailable. Please type your concern instead.",
    inputLabel: "Your concern",
    responseLabel: "Assistant response",
  },
  Tamil: {
    title: "தமிழ் + English குரல் உதவியாளர்",
    subtitle: "உங்கள் பிரச்சினையைப் பேசியோ தட்டச்சு செய்தோ தெரிவிக்கலாம்.",
    placeholder: "உதாரணம்: எனக்கு தலைவலி இருக்கிறது...",
    listen: "🎙️ பேசத் தொடங்கவும்",
    stop: "பேசுவதை நிறுத்தவும்",
    speak: "🔊 பதிலைக் கேட்கவும்",
    clear: "அழிக்கவும்",
    welcome:
      "வணக்கம்! முதலுதவி பற்றிய அடிப்படை தகவல்களை வழங்க உதவுகிறேன். என்னால் நோயைக் கண்டறிய முடியாது.",
    urgent:
      "இது அவசரநிலையாக இருக்கலாம். இந்தியாவில் 112 என்ற எண்ணையோ அல்லது உங்கள் உள்ளூர் அவசர எண்ணையோ உடனே அழைக்கவும். இந்த இணையதளத்தின் பதிலுக்காகக் காத்திருக்க வேண்டாம்.",
    response:
      "அடிப்படை முதலுதவி தகவல்களை வழங்க முடியும். ஆனால் நோயைக் கண்டறிய முடியாது. அறிகுறிகள் கடுமையாக இருந்தாலோ அதிகரித்தாலோ உடனடியாக மருத்துவ உதவி பெறுங்கள்.",
    error:
      "குரல் வசதி கிடைக்கவில்லை. உங்கள் பிரச்சினையைத் தட்டச்சு செய்யவும்.",
    inputLabel: "உங்கள் பிரச்சினை",
    responseLabel: "உதவியாளரின் பதில்",
  },
};

function VoiceAssistant() {
  const [language, setLanguage] = useState("English");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(content.English.welcome);
  const [listening, setListening] = useState(false);

  const text = content[language];

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);


function getResponse(value) {
  const words = value.toLowerCase();

  const emergencyWords = [
    "chest pain",
    "difficulty breathing",
    "cannot breathe",
    "can't breathe",
    "unconscious",
    "severe bleeding",
    "not breathing",
    "stroke",
    "seizure",
    "sudden severe headache",
    "worst headache",
    "vision problem",
    "blurred vision",
    "weakness",
    "confusion",
    "head injury",
    "stiff neck",
    "மூச்சு விட முடியவில்லை",
    "நினைவிழந்த",
    "கடுமையான இரத்தப்போக்கு",
    "திடீர் கடுமையான தலைவலி",
    "பார்வை மங்குதல்",
    "கழுத்து விறைப்பு",
  ];

  if (emergencyWords.some((word) => words.includes(word))) {
    return text.urgent;
  }

  const headacheWords = [
    "headache",
    "head ache",
    "head pain",
    "தலைவலி",
    "தலை வலிக்கிறது",
  ];

  if (headacheWords.some((word) => words.includes(word))) {
    return language === "Tamil"
      ? "தலைவலிக்கு பல காரணங்கள் இருக்கலாம். லேசான தலைவலியாக இருந்தால் தண்ணீர் குடித்து, அமைதியான இடத்தில் ஓய்வெடுத்து, நெற்றியில் குளிர்ந்த துணியை வைக்கலாம். தலைவலி திடீரென மிகவும் கடுமையாகத் தொடங்கினால், பார்வை அல்லது பேச்சில் மாற்றம், கை கால் பலவீனம், குழப்பம் அல்லது காய்ச்சலுடன் கழுத்து விறைப்பு இருந்தால் உடனடியாக அவசர மருத்துவ உதவி பெறுங்கள். தலைவலி தொடர்ந்து இருந்தாலோ அதிகரித்தாலோ மருத்துவரை அணுகுங்கள். இது நோயறிதல் அல்ல."
      : "Headaches can have different causes. If the headache is mild, try drinking water, resting in a quiet place, and placing a cool cloth on your forehead. Seek emergency help immediately if it starts suddenly and is extremely severe, or comes with vision or speech changes, weakness, confusion, or fever with a stiff neck. Contact a healthcare professional if it persists or worsens. This is not a diagnosis.";
  }

  return language === "Tamil"
    ? "உங்கள் அறிகுறிகளை இன்னும் கொஞ்சம் விளக்குங்கள். எப்போது தொடங்கியது? எவ்வளவு கடுமையாக உள்ளது? வேறு அறிகுறிகள் உள்ளனவா? கடுமையான அறிகுறிகள் இருந்தால் உடனடியாக மருத்துவ உதவி பெறுங்கள்."
    : "Please describe your symptoms in more detail. When did they start? How severe are they? Do you have any other symptoms? Seek urgent medical help for severe or concerning symptoms.";
}

  function startListening() {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setResponse(text.error);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === "Tamil" ? "ta-IN" : "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
      setResponse(getResponse(transcript));
    };

    recognition.onerror = () => {
      setListening(false);
      setResponse(text.error);
    };

    recognition.start();
  }

  function readResponse() {
    if (!("speechSynthesis" in window)) {
      setResponse(text.error);
      return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(response);
    speech.lang = language === "Tamil" ? "ta-IN" : "en-IN";
    speech.rate = 0.9;

    window.speechSynthesis.speak(speech);
  }

  function submitMessage(event) {
    event.preventDefault();

    if (!message.trim()) return;

    window.speechSynthesis?.cancel();
    setResponse(getResponse(message));
  }

  function changeLanguage(value) {
    window.speechSynthesis?.cancel();
    setLanguage(value);
    setResponse(content[value].welcome);
  }

  return (
    <div className="voice-page">
      <div className="voice-heading">
        <div>
          <h2>{text.title}</h2>
          <p>{text.subtitle}</p>
        </div>

        <select
          value={language}
          onChange={(event) => changeLanguage(event.target.value)}
          aria-label="Choose language"
        >
          <option value="English">English</option>
          <option value="Tamil">தமிழ் (Tamil)</option>
        </select>
      </div>

      <section className="voice-card">
        <div className="voice-icon">🎙️</div>

        <h3>{language === "Tamil" ? "எப்படி உதவலாம்?" : "How can I help you?"}</h3>
        <p>{text.welcome}</p>

        <button
          className="voice-primary-button"
          type="button"
          onClick={startListening}
          disabled={listening}
        >
          {listening ? text.stop : text.listen}
        </button>

        <form onSubmit={submitMessage}>
          <label>{text.inputLabel}</label>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={text.placeholder}
            rows={4}
          />

          <div className="voice-actions">
            <button type="submit">
              {language === "Tamil" ? "பதிலைப் பெறவும்" : "Get Response"}
            </button>

            <button type="button" onClick={readResponse}>
              {text.speak}
            </button>

            <button
              type="button"
              onClick={() => {
                setMessage("");
                setResponse(text.welcome);
                window.speechSynthesis?.cancel();
              }}
            >
              {text.clear}
            </button>
          </div>
        </form>
      </section>

      <section className="voice-response">
        <h3>{text.responseLabel}</h3>
        <p>{response}</p>
        <small>
          This is basic decision-support information, not a diagnosis.
          Voice recognition may not identify every emergency correctly.
        </small>
      </section>

      <div className="voice-emergency">
        <strong>🚨 Emergency?</strong>
        <p>Call 112 in India or your local emergency number. Do not rely on this assistant in an emergency.</p>
        <a href="tel:112">Call 112</a>
      </div>
    </div>
  );
}

export default VoiceAssistant;
