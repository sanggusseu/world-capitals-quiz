import React, { useState, useEffect } from 'react';
import data from '/src/data/google-spread-sheets.json';

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    resetQuiz();
  }, []);

  function makeQuestionsList() {
    let questionsIndexes = makeQuestionsIndexes();
    let answersIndexes = makeAnswersIndexes(questionsIndexes);

    questionsIndexes = questionsIndexes.map(index => data[index]);
    answersIndexes = answersIndexes.map(index => data[index]);
    return [questionsIndexes, answersIndexes];
  }

  function shuffleOptions(options) {
    let shuffledOptions = [...options];
    let currentIndex = shuffledOptions.length - 1;
    while (currentIndex > 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex + 1);
      [shuffledOptions[currentIndex], shuffledOptions[randomIndex]] = [
        shuffledOptions[randomIndex],
        shuffledOptions[currentIndex],
      ];

      currentIndex--;
    }
    return shuffledOptions;
  }

  function makeQuestionsIndexes() {
    const questionsIndexes = [];
    while (questionsIndexes.length < 10) {
      let index = Math.floor(Math.random() * data.length);
      questionsIndexes.includes(index) || questionsIndexes.push(index);
    }
    return questionsIndexes;
  }

  function makeAnswersIndexes(questionsIndexes) {
    const answersIndex = [];
    while (answersIndex.length < 30) {
      let index = Math.floor(Math.random() * data.length + 1);
      questionsIndexes.includes(index) ||
        answersIndex.includes(index) ||
        answersIndex.push(index);
    }
    return answersIndex;
  }

  const handleAnswer = answer => {
    if (!answered) {
      setSelectedAnswer(answer);
      setAnswered(true);
      if (answer === questions[currentQuestionIndex].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setScore(0);
    setShowResult(false);
    setAnswered(false);

    let [questionsList, answersList] = makeQuestionsList();
    let options = [];
    questionsList = questionsList.map((question, index) => {
      options = [...answersList.slice(0, 3), questionsList[index]];
      answersList = answersList.slice(3);
      options = shuffleOptions(options);
      return (question = {
        ...question,
        options,
        correctAnswer: question.capital,
      });
    });

    setQuestions([...questionsList]);
  };

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        로딩 중...
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">퀴즈 결과</h2>
          <p className="text-xl mb-4">
            총 {questions.length}문제 중 {score}문제를 맞추셨습니다!
          </p>
          <button
            onClick={resetQuiz}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            다시 시작하기
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">세계 수도 퀴즈</h2>
        <p className="text-lg mb-4 text-center">
          문제 {currentQuestionIndex + 1} / {questions.length}
        </p>
        <p className="text-xl mb-6 text-center font-semibold">
          {currentQuestion.country}의 수도는?
        </p>
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.capital)}
              className={`w-full p-4 text-left rounded ${
                selectedAnswer === option.capital
                  ? selectedAnswer === currentQuestion.correctAnswer
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              } ${answered && option.capital === currentQuestion.correctAnswer ? 'bg-green-500 text-white' : ''} transition duration-300`}
              disabled={answered}
            >
              {option.capital}
            </button>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleNext}
            className={`px-6 py-2 rounded ${
              answered
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition duration-300`}
            disabled={!answered}
          >
            {currentQuestionIndex === questions.length - 1
              ? '결과 보기'
              : '다음'}
          </button>
        </div>
      </div>
    </div>
  );
}
