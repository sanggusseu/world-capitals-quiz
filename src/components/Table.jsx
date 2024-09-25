import { useEffect, useState } from 'react';
import TableData from './TableData';
import jsonData from '/src/data/google-spread-sheets.json';

export default function Table() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchedData = jsonData.map(item => ({
      code: item.code,
      country: item.country,
      capital: item.capital,
    }));
    setData(fetchedData);
  }, []);

  if (data.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-center rtl:text-center">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                국기
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                국가
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                수도
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-center">
            {data.map(item => (
              <tr className="odd:bg-gray-50" key={item.code}>
                <TableData {...item} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
