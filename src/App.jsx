import { Outlet } from 'react-router-dom';
import Header from './components/Header';

export default function App() {
  return (
    <div>
      <Header />
      <main>
        <div className="mx-auto max-w-screen-xl p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
