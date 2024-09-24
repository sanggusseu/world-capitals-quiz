import Flag from 'react-world-flags';

export default function TableData({ code, country, capital }) {
  return (
    <>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        <Flag
          className="size-10 block mx-auto"
          code={code}
          alt={`${country} 국기`}
        />
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">{country}</td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">{capital}</td>
    </>
  );
}
