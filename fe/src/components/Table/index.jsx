const Table = ({ headers, rows }) => {
  return (
    <table className="table-auto w-full border-collapse text-lg mb-6">
      <thead>
        <tr className="bg-blue-500">
          {headers.map((header, index) => (
            <th
              className="border border-blue-300 text-white px-4 py-2"
              key={index}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows &&
          rows.map((row, index) => (
            <tr key={index}>
              {Object.entries(row).map(([key, value]) => (
                <td
                  className="p-2 border border-slate-300 text-center"
                  key={key}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
