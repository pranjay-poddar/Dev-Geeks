import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
const COLORS = ['#4285B0', '#FF9F00', '#FFFF00', '#48BB78', '#4A4A4A'];

const PieChartComponent = ({ data, dataKey = 'value', nameKey = 'name' }) => (
  <PieChart width={350} height={300}>
    <Pie
      data={data}
      dataKey={dataKey}
      nameKey={nameKey}
      cx="50%"
      cy="50%"
      innerRadius={60}
      outerRadius={80}
      fill="#4285B0"
      paddingAngle={10}
      label
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend verticalAlign="bottom" align="left" height={100} />
  </PieChart>
);

export default PieChartComponent;
