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
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    const quizQuestions = selected.map(item => {
      const options = [
        item.capital,
        ...shuffled
          .filter(q => q.capital !== item.capital)
          .slice(0, 3)
          .map(q => q.capital),
      ].sort(() => 0.5 - Math.random());
      return {
        country: item.country,
        options,
        correctAnswer: item.capital,
      };
    });
    setQuestions(quizQuestions);
  }, []);

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
              onClick={() => handleAnswer(option)}
              className={`w-full p-4 text-left rounded ${
                selectedAnswer === option
                  ? selectedAnswer === currentQuestion.correctAnswer
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              } ${answered && option === currentQuestion.correctAnswer ? 'bg-green-500 text-white' : ''} transition duration-300`}
              disabled={answered}
            >
              {option}
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
