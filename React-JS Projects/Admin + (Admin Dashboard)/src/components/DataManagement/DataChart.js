import React from 'react';
import { motion } from 'framer-motion';

const DataChart = ({ data }) => {
  const chartVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="bg-white rounded-lg p-4 shadow"
      variants={chartVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4 }}
    >
      <table className="w-full">
        <thead>
          <tr>
            <th>Month</th>
            <th>Sales</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.month}>
              <td>{item.month}</td>
              <td>{item.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default DataChart;
