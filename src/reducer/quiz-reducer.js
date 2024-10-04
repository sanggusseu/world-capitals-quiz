export const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  showResult: false,
  selectedAnswer: '',
  answered: false,
};

export default function quizReducer(draft, action) {
  switch (action.type) {
    case 'setQuestions':
      draft.questions = action.payload;
      break;
    case 'nextQuestion':
      ++draft.currentQuestionIndex;
      draft.selectedAnswer = '';
      draft.answered = false;
      break;
    case 'incrementScore':
      ++draft.score;
      break;
    case 'resetQuiz':
      return initialState;
    case 'showResult':
      draft.showResult = true;
      break;
    case 'selectedAnswer': {
      const answer = action.payload;
      draft.selectedAnswer = answer;
      draft.answered = true;
      break;
    }
    default:
      throw new Error(`${action.type}존재하지 않는 action 입니다.`);
  }
}
