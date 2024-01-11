import { useEffect, useState } from "react";
import "./Trivia.css";
import useSound from "use-sound";
import play from "../assets/play.wav";
import correct from "../assets/correct.wav";
import wrong from "../assets/wrong.wav";

const Trivia = ({
  data,
  setStop,
  questionNumber,
  setQuestionNumber,
  setEarned,
  moneyPyramid,
}) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  // useEffect(() => {
  //   letsPlay();
  // }, [letsPlay])

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  }

  const handleClick = (ans) => {
    setSelectedAnswer(ans);
    setClassName("answer active");
    delay(3000, () => {
      setClassName(ans.correct ? "answer correct" : "answer wrong");
    })
    delay(5000, () => {
      if(ans.correct) {
        correctAnswer();
        delay(4000, () => {
          setQuestionNumber(prev => prev + 1);
          setSelectedAnswer(null);
        })
      } else {
        wrongAnswer();
        delay(2000, () => {
          setStop(true);
        })
        if(questionNumber > 1) setEarned(moneyPyramid.at(1 - questionNumber).amount);
      }
    })
  }

  return (
    <div className="trivia">
        <div className="question">{question?.question}</div>
        <div className="answers">
          {
            question?.answers && question.answers.map((ans, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleClick(ans)}
                  className={selectedAnswer === ans ? className : "answer"}
                >
                  {ans.text}
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

export default Trivia;