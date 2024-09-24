import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <div>
      <Header />
      <main>
        <div className="mx-auto max-w-screen-xl p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
