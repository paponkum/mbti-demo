"use client";

import { chownSync } from "fs";
import { useEffect, useState } from "react";

const questions = [
  { id: 1, text: 'When you are at a social event, you typically:', options: [{ text: 'Enjoy being the center of attention and talking to many people.', value: 'E' }, { text: 'Prefer to have deep conversations with a few people you know well.', value: 'I' }] },
  { id: 2, text: 'After a long week, you are more likely to:', options: [{ text: 'Go out with friends and meet new people.', value: 'E' }, { text: 'Stay home and relax by yourself or with a close friend.', value: 'I' }] },
  { id: 3, text: 'When making decisions, you tend to:', options: [{ text: 'Focus on practical details and immediate realities.', value: 'S' }, { text: 'Consider future possibilities and abstract concepts.', value: 'N' }] },
  { id: 4, text: 'In your work, you prefer:', options: [{ text: 'Using established methods and dealing with concrete information.', value: 'S' }, { text: 'Exploring innovative ideas and thinking about the big picture.', value: 'N' }] },
  { id: 5, text: 'When resolving conflicts, you are more likely to:', options: [{ text: 'Rely on logical reasoning and objective criteria.', value: 'T' }, { text: 'Consider the emotions and values of everyone involved.', value: 'F' }] },
  { id: 6, text: 'In making decisions, you prioritize:', options: [{ text: 'Fairness and justice.', value: 'T' }, { text: 'Harmony and compassion.', value: 'F' }] },
  { id: 7, text: 'When planning a project, you prefer to:', options: [{ text: 'Have a detailed schedule and stick to it.', value: 'J' }, { text: 'Keep things flexible and open to change.', value: 'P' }] },
  { id: 8, text: 'In your daily life, you are more likely to:', options: [{ text: 'Follow a routine and be well-organized.', value: 'J' }, { text: 'Adapt to circumstances as they arise.', value: 'P' }] },
];

type Answer = {
  qid: number,
  ans: string,
}

export default function Home() {
  const [questionID, setQuestionID] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<string>();

  useEffect(() => {
    if (questionID > questions.length) {
      calculateMBTI();
    }
  }, [questionID])
  const handleChange = (questionID: number, optionValue: string) => {
    const newAnswers = [...answers];
    newAnswers.push({
      qid: questionID,
      ans: optionValue
    })
    setAnswers(newAnswers);
    if (questionID)
      setQuestionID(questionID + 1)
  };

  const restartQuiz = () => {
    setAnswers([]);
    setResult(undefined);
    setQuestionID(0);
  }
  const calculateMBTI = () => {
    const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    answers.forEach(answer => {
      if (answer) {
        switch (answer.ans) {
          case 'E':
            counts.E++;
            break;
          case 'I':
            counts.I++;
            break;
          case 'S':
            counts.S++;
            break;
          case 'N':
            counts.N++;
            break;
          case 'T':
            counts.T++;
            break;
          case 'F':
            counts.F++;
            break;
          case 'J':
            counts.J++;
            break;
          case 'P':
            counts.P++;
            break;
        }
      }
    });

    const mbti = (counts.E >= counts.I ? 'E' : 'I') +
      (counts.S >= counts.N ? 'S' : 'N') +
      (counts.T >= counts.F ? 'T' : 'F') +
      (counts.J >= counts.P ? 'J' : 'P');

    setResult(mbti);
  };
  return (
    <main className="container flex justify-center mx-auto min-h-screen">
      <div className="my-4">
        <h1 className="text-center my-4">MBTI Demo</h1>
        <div className="grid grid-cols-1">
          {questionID == 0 &&
            <>
              <h2 className="text-center mb-4">Are you ready?</h2>
              <button className="btn bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-2" onClick={() => setQuestionID(1)}>Start</button>
            </>
          }
          {questionID > 0 && questionID <= questions.length &&
            <>
              <h2 className="text-center mb-4">{questions.filter(question => question.id == questionID)[0].text}</h2>
              {questions.filter(q => q.id == questionID)[0].options.map((option, index) =>
                <button className="btn bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-2" onClick={() => handleChange(questionID, option.value)} key={index}>
                  {option.text}
                </button>)}
            </>
          }
          {questionID > questions.length &&
            <>
              <h2 className="text-center mb-4">Your MBTI is {result}</h2>
              <button className="btn bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-2" onClick={() => restartQuiz}>Restart</button>
            </>
          }
        </div>
      </div>
    </main>
  );
}
