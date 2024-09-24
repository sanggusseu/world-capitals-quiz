import { Link } from 'react-router-dom';
import { IoClose, IoMenu } from 'react-icons/io5';
import { useState } from 'react';
import Backdrop from './Backdrop';

export default function Header() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const handleToggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };
  return (
    <>
      <header className="bg-gray-800 text-white">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <Link to="/">세계 수도 퀴즈</Link>
            </div>

            <div className="md:flex md:items-center md:gap-12">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link
                      to="/"
                      className="flex w-full py-2 text-white transition hover:text-white/75"
                    >
                      홈
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/explore"
                      className="flex w-full py-2 text-white transition hover:text-white/75"
                    >
                      둘러보기
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/quiz"
                      className="flex w-full py-2 text-white transition hover:text-white/75"
                    >
                      퀴즈
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="block md:hidden">
                <button
                  type="button"
                  onClick={handleToggleSidebar}
                  className="rounded p-2 text-2xl text-white transition hover:text-white/75"
                >
                  <IoMenu />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <aside
        className={`absolute z-20 top-0 bottom-0 left-0 block p-10 min-w-72 bg-gray-800 md:hidden transform transition-transform duration-300 ease-in-out ${sidebarIsOpen ? '-translate-x-0' : '-translate-x-full'}`}
      >
        <header className="flex items-center justify-between text-white mb-5">
          <h2>전체 메뉴</h2>
          <button
            type="button"
            onClick={handleToggleSidebar}
            aria-label="전체 메뉴 닫기 버튼"
            className="text-2xl"
          >
            <IoClose />
          </button>
        </header>
        <nav aria-label="Global">
          <ul
            className="flex flex-col items-start gap-2 text-sm"
            onClick={handleToggleSidebar}
          >
            <li className="w-full">
              <Link
                to="/"
                className="flex w-full py-2 text-white transition hover:text-white/75"
              >
                홈
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/explore"
                className="flex w-full py-2 text-white transition hover:text-white/75"
              >
                둘러보기
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/quiz"
                className="flex w-full py-2 text-white transition hover:text-white/75"
              >
                퀴즈
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <Backdrop
        isActive={sidebarIsOpen}
        onToggleSidebar={handleToggleSidebar}
      />
    </>
  );
}
