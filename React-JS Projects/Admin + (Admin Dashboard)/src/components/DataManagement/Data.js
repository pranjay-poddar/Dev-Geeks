import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Data = () => {
  const [data, setData] = useState([
    { id: 1, name: 'Sales', value: 13845 },
    { id: 2, name: 'Users', value: 532 },
    { id: 3, name: 'Revenue', value: 5862 },
    { id: 4, name: 'Orders', value: 245 },
  ]);

  const handleDataClick = (id) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, value: item.value + 1 };
      }
      return item;
    });
    setData(updatedData);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen py-16 bg-gradient-to-b from-indigo-400 to-blue-500">
      <h2 className="text-3xl font-semibold text-white mb-6">Data</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((item) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-lg shadow-lg p-6 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDataClick(item.id)}
          >
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-600">Value: {item.value}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-white mb-4">Additional Information</h3>
        <p className="text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sollicitudin est ut nisl
          facilisis, eu congue magna eleifend. Suspendisse luctus euismod orci, id aliquam tellus
          tincidunt a. Fusce accumsan quam sed mi rutrum sagittis. Nulla bibendum interdum velit,
          vel accumsan nunc pretium sed. Curabitur at gravida leo. Sed commodo quam arcu, ac
          dignissim elit scelerisque ut. Etiam et luctus eros, in scelerisque urna. Donec
          ullamcorper, nunc ut bibendum feugiat, felis neque luctus sem, et feugiat elit ex ut nisl.
          In auctor eros sed purus finibus scelerisque. In auctor, velit non blandit bibendum, mi
          neque vulputate ex, ac vestibulum dolor dui in tellus.
        </p>
        <p className="text-white">
          Phasellus sed sagittis purus. Suspendisse potenti. Integer lobortis laoreet varius. Sed
          posuere massa sit amet luctus porttitor. Nullam scelerisque metus urna, in pharetra sem
          tincidunt nec. Nullam consectetur luctus felis, eu cursus lectus egestas vitae. Morbi
          auctor pulvinar velit, non suscipit nunc gravida a. Vivamus malesuada rhoncus aliquam.
        </p>
      </div>
    </div>
  );
};

export default Data;
