import { useEffect, useState } from 'react';
import axios from 'axios';
import TableData from './TableData';

export default function Table() {
  const [data, setData] = useState([]);

  const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const RANGE = 'Sheet1';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`,
        );

        const fetchedData = response.data.values.slice(1).map(row => ({
          code: row[0],
          country: row[1],
          capital: row[2],
        }));
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
      }
    };

    fetchData();
  }, [SPREADSHEET_ID, API_KEY, RANGE]);

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
