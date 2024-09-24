import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <section className="flex flex-col items-center h-screen">
      <h1 className="sr-only">홈페이지</h1>
      <div>
        {/* TODO: 이미지 설정하기 */}
        <img src="" alt="" />
      </div>

      <div className="inline-flex flex-col gap-y-3">
        <Link
          className="group relative inline-block focus:outline-none focus:ring"
          to="/explore"
        >
          <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

          <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
            둘러보기
          </span>
        </Link>
        <Link
          className="group relative inline-block focus:outline-none focus:ring"
          to="/quiz"
        >
          <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

          <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
            퀴즈풀기
          </span>
        </Link>
      </div>
    </section>
  );
}
