import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <header>
        <h1>Hi</h1>
      </header>
      <Outlet />
    </div>
  );
}
