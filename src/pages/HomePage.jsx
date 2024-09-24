import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <section className="flex flex-col items-center">
      <h1 className="sr-only">홈페이지</h1>
      <div className="home-bg w-full relative h-[70vh]">
        <div className="absolute right-[50%] translate-x-[50%] bottom-10 min-w-32 inline-flex flex-col gap-y-3">
          <Link className="relative" to="/explore">
            <span class="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
            <span class="fold-bold text-center relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900">
              둘러보기
            </span>
          </Link>
          <Link
            className="group relative inline-block focus:outline-none focus:ring"
            to="/quiz"
          >
            <span class="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
            <span class="fold-bold text-center relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900">
              퀴즈풀기
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
