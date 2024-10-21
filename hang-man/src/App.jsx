import { useState, useEffect } from "react";
import { DATA } from "./data.js";
import "./App.css";

const alphabet = [
  "A",
  "B",
  "C",
  "Ç",
  "D",
  "E",
  "F",
  "G",
  "Ğ",
  "H",
  "I",
  "İ",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "Ö",
  "P",
  "R",
  "S",
  "Ş",
  "T",
  "U",
  "Ü",
  "V",
  "Y",
  "Z",
];

function App() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerArray, setAnswerArray] = useState([]);
  const [keywords, setKeyWords] = useState([]);
  const [wrong, setWrong] = useState(false);

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const setKeyWord = (keyword) => {
    if (keywords.length < answer.length) {
      keywords.push(keyword);
      setKeyWords([...keywords]);
    }
    if (keywords.length === answer.length) {
      if (answer === keywords.join("")) {
        // Doğru cevap
        if (index + 1 < DATA.length) {
          setIndex(index + 1);
        } else {
          // Tüm sorular bitti, index'i artırma
          setKeyWords([]);
          setAnswer(""); // Yanıtı boş bırak
          return; // Sonraki adımda işlem yapma
        }
        setKeyWords([]);
      } else {
        setWrong(true);
      }
    }
  };

  useEffect(() => {
    setWrong(false);
    if (index < DATA.length) {
      // Sadece geçerli soruları göster
      const answer = DATA[index].answer.toLowerCase();
      setAnswer(answer);
      setQuestion(DATA[index].question);
      const stringToArray = answer.split("");
      // Yanıtın karışık harflerini oluştur
      stringToArray.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
      stringToArray.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
      stringToArray.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
      const alphabetLowerData = stringToArray.map((letter) =>
        letter.toLowerCase()
      );
      setAnswerArray(shuffle(alphabetLowerData));
    }
  }, [index]);

  const removeKeyword = (index) => {
    keywords.splice(index, 1);
    setKeyWords([...keywords]);
  };

  return (
    <div className="App">
      {answer !== "" ? ( // Sorular bitmediyse
        <div>
          <div>
            <span className={"question-name"}>{question}</span>
          </div>
          <div className={"question-area"}>
            {keywords.map((item, index) => (
              <span
                style={{
                  borderBottom: wrong ? "3px solid red" : "3px solid #ddd",
                }}
                className={"question"}
                onClick={() => removeKeyword(index)}
                key={index}
              >
                {item}
              </span>
            ))}
          </div>

          <div className={"button-area"}>
            {answerArray.map((item, index) => (
              <button
                className={"button"}
                key={index}
                onClick={() => setKeyWord(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      ) : (
        // Tüm sorular bittiğinde gösterilecek mesaj
        <div className={"empty-message"}>
          Sorular Bitti! Seni seviyorum askımmm
        </div>
      )}
    </div>
  );
}

export default App;
