import React, { useEffect, useReducer } from 'react';
import Result from '../components/quizpage/Result';
import quizReducer, { initialState } from '../reducer/quiz-reducer';
import { resetQuizLogic } from '../utils/quiz-logic';

export default function QuizPage() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const {
    questions,
    currentQuestionIndex,
    score,
    showResult,
    answered,
    selectedAnswer,
  } = state;
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    resetQuiz();
  }, []);

  const handleAnswer = answer => {
    if (!answered) {
      dispatch({ type: 'selectedAnswer', payload: answer });
      if (answer === questions[currentQuestionIndex].correctAnswer) {
        dispatch({ type: 'incrementScore' });
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      dispatch({ type: 'nextQuestion' });
    } else {
      dispatch({ type: 'showResult' });
    }
  };

  const resetQuiz = () => {
    resetQuizLogic(dispatch);
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
      <Result count={questions.length} score={score} resetQuiz={resetQuiz} />
    );
  }

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
