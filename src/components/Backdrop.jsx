export default function Backdrop({ isActive, onToggleSidebar }) {
  if (!isActive) return;
  return (
    <div
      onClick={onToggleSidebar}
      className="fixed z-10 inset-0 bg-black bg-opacity-50"
    ></div>
  );
}
