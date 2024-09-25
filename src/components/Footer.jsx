import { useEffect } from 'react';

export default function Footer() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/kas/static/ba.min.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <footer className="fixed bottom-0 bg-gray-800 w-full min-h-[100px]">
      <ins
        className="kakao_ad_area"
        style={{ display: 'none' }}
        data-ad-unit="DAN-GtDM37wSZg5bWXlL"
        data-ad-width="320"
        data-ad-height="100"
      ></ins>
    </footer>
  );
}
