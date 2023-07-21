import React from 'react';
import { motion } from 'framer-motion';

const Chart = () => {
  const chartData = [
    { month: 'January', sales: 65, profit: 28 },
    { month: 'February', sales: 59, profit: 48 },
    { month: 'March', sales: 80, profit: 40 },
    { month: 'April', sales: 81, profit: 19 },
    { month: 'May', sales: 56, profit: 86 },
    { month: 'June', sales: 55, profit: 27 },
    { month: 'July', sales: 72, profit: 35 },
    { month: 'August', sales: 93, profit: 52 },
    { month: 'September', sales: 68, profit: 42 },
    { month: 'October', sales: 87, profit: 31 },
    { month: 'November', sales: 75, profit: 23 },
    { month: 'December', sales: 64, profit: 37 },
  ];

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gradient-to-b from-purple-200 to-indigo-200">
      <h2 className="text-2xl font-semibold mb-4">Sales and Profit Chart</h2>
      <motion.table
        className="table-auto w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <thead>
          <tr>
            <th className="px-4 py-2">Month</th>
            <th className="px-4 py-2">Sales</th>
            <th className="px-4 py-2">Profit</th>
          </tr>
        </thead>
        <tbody>
          {chartData.map((record, index) => (
            <motion.tr
              key={index}
              className="bg-white border-b hover:bg-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <td className="px-4 py-2">{record.month}</td>
              <td className="px-4 py-2">{record.sales}</td>
              <td className="px-4 py-2">{record.profit}</td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
};

export default Chart;
