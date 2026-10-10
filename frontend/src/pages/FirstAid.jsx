
import { useState } from "react";

const topics = [
  {
    id: "bleeding",
    title: "Bleeding",
    tamilTitle: "இரத்தப்போக்கு",
    icon: "🩹",
    keywords: "cut wound blood bleeding",
    steps: [
      "Apply firm, continuous pressure with clean gauze or cloth.",
      "If blood soaks through, add more material without removing the first layer.",
      "For severe bleeding, call emergency services immediately.",
    ],
    tamil: [
      "சுத்தமான துணி அல்லது காஸ் வைத்து காயத்தின் மீது தொடர்ந்து அழுத்தம் கொடுக்கவும்.",
      "துணியில் இரத்தம் ஊறினால், முதல் துணியை அகற்றாமல் மேலே மற்றொரு துணியை வைக்கவும்.",
      "கடுமையான இரத்தப்போக்கு இருந்தால் உடனடியாக அவசர உதவியை அழைக்கவும்.",
    ],
    avoid: "Do not remove deeply embedded objects. Do not delay emergency care for severe bleeding.",
    avoidTamil: "காயத்தில் ஆழமாகப் பதிந்த பொருட்களை அகற்ற வேண்டாம். கடுமையான இரத்தப்போக்குக்கு மருத்துவ உதவியைத் தாமதிக்க வேண்டாம்.",
  },
  {
    id: "burns",
    title: "Burns",
    tamilTitle: "தீக்காயம்",
    icon: "🔥",
    keywords: "fire hot water burn scald",
    steps: [
      "Cool the burn under cool running water for 20 minutes.",
      "Remove nearby jewellery or clothing unless it is stuck to the skin.",
      "Cover loosely with a clean, non-fluffy dressing.",
      "Seek urgent care for large, deep, chemical or electrical burns, or burns affecting the face or airway.",
    ],
    tamil: [
      "தீக்காயத்தை குளிர்ந்த ஓடும் நீரில் 20 நிமிடங்கள் குளிர்விக்கவும்.",
      "தோலில் ஒட்டாத நகைகள் அல்லது ஆடைகளை மெதுவாக அகற்றவும்.",
      "சுத்தமான, பஞ்சு உதிராத துணியால் தளர்வாக மூடவும்.",
      "பெரிய அல்லது ஆழமான தீக்காயம், ரசாயன அல்லது மின்சாரத் தீக்காயம், முகம் அல்லது சுவாசப்பாதையில் தீக்காயம் இருந்தால் உடனடி மருத்துவ உதவி பெறவும்.",
    ],
    avoid: "Do not apply ice, butter, toothpaste or creams. Do not burst blisters or pull away stuck clothing.",
    avoidTamil: "பனிக்கட்டி, வெண்ணெய், பற்பசை அல்லது கிரீம் தடவ வேண்டாம். கொப்புளங்களை உடைக்கவோ ஒட்டிய ஆடைகளை இழுக்கவோ வேண்டாம்.",
  },
  {
    id: "choking",
    title: "Choking",
    tamilTitle: "மூச்சுத்திணறல்",
    icon: "🫁",
    keywords: "choking food stuck throat",
    steps: [
      "If the person can cough forcefully and speak, encourage them to keep coughing.",
      "If they cannot speak, breathe or cough effectively, call emergency services immediately.",
      "Follow recognised first-aid guidance appropriate to the person's age. Give first aid only as trained.",
      "If the person becomes unresponsive, follow the emergency dispatcher's instructions. Begin CPR if trained and indicated.",
    ],
    tamil: [
      "அந்த நபரால் வலுவாக இருமவும் பேசவும் முடிந்தால், தொடர்ந்து இருமச் சொல்லவும்.",
      "பேசவோ சுவாசிக்கவோ அல்லது திறம்பட இருமவோ முடியாவிட்டால் உடனடியாக அவசர உதவியை அழைக்கவும்.",
      "வயதுக்கு ஏற்ற அங்கீகரிக்கப்பட்ட முதலுதவி வழிமுறைகளைப் பின்பற்றவும். பயிற்சி பெற்றிருந்தால் மட்டுமே அதற்கேற்ற முதலுதவி அளிக்கவும்.",
      "நபர் சுயநினைவின்றி போனால் அவசர உதவி வழங்குபவரின் வழிமுறைகளைப் பின்பற்றவும். தேவையானால் பயிற்சி பெற்றிருந்தால் CPR அளிக்கவும்.",
    ],
    avoid: "Do not blindly put your fingers into the person's mouth.",
    avoidTamil: "பார்க்காமல் விரல்களை வாய்க்குள் செலுத்த வேண்டாம்.",
  },
  {
    id: "fainting",
    title: "Fainting",
    tamilTitle: "மயக்கம்",
    icon: "🩺",
    keywords: "fainting dizzy collapse unconscious",
    steps: [
      "Help the person lie flat in a safe place and check whether they respond and breathe normally.",
      "If they do not wake promptly, are not breathing normally, or have serious symptoms, call emergency services immediately.",
      "If they are unresponsive and not breathing normally, begin CPR if trained and follow dispatcher instructions.",
      "If they recover, let them rest and seek medical advice, especially if the fainting is new or unexplained.",
    ],
    tamil: [
      "பாதுகாப்பான இடத்தில் நபரைப் படுக்க வைத்து, அவர் பதிலளிக்கிறாரா மற்றும் இயல்பாக சுவாசிக்கிறாரா எனப் பார்க்கவும்.",
      "விரைவில் சுயநினைவு திரும்பவில்லை, இயல்பாக சுவாசிக்கவில்லை அல்லது கடுமையான அறிகுறிகள் இருந்தால் உடனடியாக அவசர உதவியை அழைக்கவும்.",
      "சுயநினைவின்றி இயல்பாக சுவாசிக்கவில்லை என்றால், பயிற்சி பெற்றிருந்தால் CPR தொடங்கி அவசர உதவி வழிமுறைகளைப் பின்பற்றவும்.",
      "சுயநினைவு திரும்பினாலும் ஓய்வெடுக்க உதவவும். குறிப்பாக இது முதல் முறை அல்லது காரணம் தெரியாத மயக்கம் என்றால் மருத்துவ ஆலோசனை பெறவும்.",
    ],
    avoid: "Do not give food or drink to someone who is unconscious or not fully alert.",
    avoidTamil: "சுயநினைவின்றி இருப்பவருக்கோ முழுமையாக விழிப்புடன் இல்லாதவருக்கோ உணவு அல்லது பானம் கொடுக்க வேண்டாம்.",
  },
];


function FirstAid() {
  const [language, setLanguage] = useState("English");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filteredTopics = topics.filter((topic) =>
    `${topic.title} ${topic.tamilTitle} ${topic.keywords}`
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  const selectedTopic = topics.find((topic) => topic.id === selected);

  return (
    <div className="first-aid-page">
      <div className="first-aid-heading">
        <div>
          <h2>First-Aid Guidance</h2>
          <p>Simple first-aid information in English and Tamil.</p>
        </div>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="English">English</option>
          <option value="Tamil">தமிழ் (Tamil)</option>
        </select>
      </div>

      <div className="first-aid-alert">
        <strong>🚨 Serious or life-threatening emergency?</strong>
        <p>Call 112 in India or your local emergency number immediately.</p>
        <a href="tel:112">📞 Call 112</a>
      </div>

      <input
        className="first-aid-search"
        type="search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setSelected(null);
        }}
        placeholder="Search bleeding, burns, choking..."
      />

      <div className="first-aid-grid">
        {filteredTopics.map((topic) => (
          <button
            type="button"
            key={topic.id}
            className="first-aid-topic"
            onClick={() =>
              setSelected(
                selected === topic.id ? null : topic.id
              )
            }
          >
            <span>{topic.icon}</span>

            <strong>
              {language === "Tamil"
                ? topic.tamilTitle
                : topic.title}
            </strong>

            <small>
              {selected === topic.id
                ? "Hide details ▲"
                : "View details ▼"}
            </small>
          </button>
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <p>No matching topic found. Try another search word.</p>
      )}

      {selectedTopic && (
        <div
          key={selectedTopic.id}
          className="first-aid-visible-panel"
        >
          <h2>
            {selectedTopic.icon}{" "}
            {language === "Tamil"
              ? selectedTopic.tamilTitle
              : selectedTopic.title}
          </h2>

          <h3>
            {language === "Tamil"
              ? "என்ன செய்ய வேண்டும்"
              : "✅ What to do"}
          </h3>

          <ol>
            {(language === "Tamil"
              ? selectedTopic.tamil
              : selectedTopic.steps
            ).map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>

          <h3>
            {language === "Tamil"
              ? "எதைத் தவிர்க்க வேண்டும்"
              : "⚠️ What to avoid"}
          </h3>

          <p>
            {language === "Tamil"
              ? selectedTopic.avoidTamil
              : selectedTopic.avoid}
          </p>

          <button
            type="button"
            onClick={() => setSelected(null)}
            className="first-aid-close-button"
          >
            {language === "Tamil"
              ? "மூடு"
              : "✖ Close Details"}
          </button>
        </div>
      )}

      <p className="first-aid-disclaimer">
        Educational guidance only. This information does not replace
        professional training, emergency services or medical assessment.
        Follow emergency dispatcher instructions.
      </p>
    </div>
  );
}

export default FirstAid;
