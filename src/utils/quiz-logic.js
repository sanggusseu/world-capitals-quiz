import { generateIndexes, shuffleArray } from './quiz-utils';
import data from '/src/data/google-spread-sheets.json';

export const resetQuizLogic = dispatch => {
  dispatch({ type: 'resetQuiz' });

  const questionsIndexes = generateIndexes(data, 10);
  const answersIndexes = generateIndexes(data, 30, questionsIndexes);

  let questionsList = questionsIndexes.map(index => data[index]);
  let answersList = answersIndexes.map(index => data[index]);
  let options = [];
  questionsList = questionsList.map((question, index) => {
    options = [...answersList.slice(0, 3), questionsList[index]];
    answersList = answersList.slice(3);
    options = shuffleArray(options);
    return (question = {
      ...question,
      options,
      correctAnswer: question.capital,
    });
  });

  dispatch({ type: 'setQuestions', payload: [...questionsList] });
};
