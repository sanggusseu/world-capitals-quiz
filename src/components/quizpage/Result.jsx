export default function Result({ count, score, resetQuiz }) {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">퀴즈 결과</h2>
        <p className="text-xl mb-4">
          총 {count}문제 중 {score}문제를 맞추셨습니다!
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
