import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const BarChartComponent = ({
  data,
  width = 500,
  height = 250,
  key1,
  key2,
  key3,
  key4,
  XAxisKey,
}) => {
  return (
    <BarChart width={width} height={height} data={data}>
      <CartesianGrid strokeDasharray="2 2" />
      <XAxis dataKey={XAxisKey} />
      <YAxis />
      <Tooltip />
      <Legend />
      {key1 && <Bar dataKey={key1} barSize={20} fill="#8884d8" />}
      {key2 && <Bar dataKey={key2} barSize={20} fill="#82ca9d" />}
      {key3 && <Bar dataKey={key3} barSize={20} fill="#e97171" />}
      {key4 && <Bar dataKey={key4} barSize={20} fill="#9d65c9" />}
    </BarChart>
  );
};

export default BarChartComponent;
