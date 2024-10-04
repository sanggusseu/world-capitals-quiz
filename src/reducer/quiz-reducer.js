export const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  showResult: false,
  selectedAnswer: '',
  answered: false,
};

export default function quizReducer(state, action) {
  switch (action.type) {
    case 'setQuestions':
      return { ...state, questions: action.payload };
    case 'nextQuestion':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        selectedAnswer: '',
        answered: false,
      };
    case 'incrementScore':
      return { ...state, score: state.score + 1 };
    case 'resetQuiz':
      return initialState;
    case 'showResult':
      return { ...state, showResult: true };
    case 'selectedAnswer': {
      const answer = action.payload;
      return { ...state, selectedAnswer: answer, answered: true };
    }
    default:
      throw new Error('존재하지 않는 action 입니다.');
  }
}
