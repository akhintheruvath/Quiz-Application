import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Trivia from "./components/Trivia";
import { Timer } from "./components/Timer";

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$0");
  const data = [
    {
      id: 1,
      question: "Who is the first prime minister of India ?",
      answers: [
        {
          text: "A. Mahatma Gandhi",
          correct: false
        },
        {
          text: "B. Jawaharlal Nehru",
          correct: true
        },
        {
          text: "C. Indira Gandhi",
          correct: false
        },
        {
          text: "D. Dr B.R.Ambedkar",
          correct: false
        }
      ]
    },
    {
      id: 2,
      question: "Which of the following keywords is used to define a variable in Javascript ?",
      answers: [
        {
          text: "A. var",
          correct: false
        },
        {
          text: "B. let",
          correct: false
        },
        {
          text: "C. int",
          correct: false
        },
        {
          text: "D. Both A and B",
          correct: true
        }
      ]
    },
    {
      id: 3,
      question: "Which keyword is used to declare a constant variable in javascript ?",
      answers: [
        {
          text: "A. var",
          correct: false
        },
        {
          text: "B. let",
          correct: false
        },
        {
          text: "C. const",
          correct: true
        },
        {
          text: "D. None of the above",
          correct: false
        }
      ]
    }
  ];

  let moneyPyramid = useMemo(() => {
    return [
      { id: 1, amount: "$100" },
      { id: 2, amount: "$200" },
      { id: 3, amount: "$300" },
      { id: 4, amount: "$500" },
      { id: 5, amount: "$1000" },
      { id: 6, amount: "$2000" },
      { id: 7, amount: "$5000" },
      { id: 8, amount: "$10000" },
      { id: 9, amount: "$20000" },
      { id: 10, amount: "$50000" },
      { id: 11, amount: "$100000" },
      { id: 12, amount: "$200000" },
      { id: 13, amount: "$500000" },
      { id: 14, amount: "$1000000" },
      { id: 15, amount: "$2000000" }
    ].reverse();
  })

  useEffect(() => {
    questionNumber > 1 && setEarned(moneyPyramid.find(m => {
      return m.id === questionNumber - 1;
    }).amount);
  }, [moneyPyramid, questionNumber])

  return (
    <div className="App">
      <div className="main">
        {
          stop
            ? <h1 className="endText">You earned {earned}</h1>
            : <>
              <div className="top">
                <div className="timer">
                  <Timer 
                    setStop={setStop}
                    questionNumber={questionNumber}
                  />
                </div>
              </div>
              <div className="bottom">
                <Trivia
                  data={data}
                  setStop={setStop}
                  questionNumber={questionNumber}
                  setQuestionNumber={setQuestionNumber}
                  setEarned={setEarned}
                  moneyPyramid={moneyPyramid}
                />
              </div>
            </>
        }
      </div>
      <div className="pyramid">
        <ul className="moneyList">
          {
            moneyPyramid && moneyPyramid.map(obj => {
              return (
                <li key={obj.id} className={questionNumber === obj.id ? "moneyListItem active" : "moneyListItem"} >
                  <span className="moneyListItemNumber">{obj.id}</span>
                  <span className="moneyListItemAmount">{obj.amount}</span>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default App;