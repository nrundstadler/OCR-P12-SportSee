import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

/**
 * React component that displays a score as a radial progress bar
 * @param {Object} props - React component props
 * @param {number} props.score - Score value between 0 and 1
 * @returns {React.ReactElement} A radial chart showing score percentage
 */
const ScoreChart = ({ scorePercentage }) => {
  const data = [
    {
      name: "Score",
      value: scorePercentage,
      fill: "var(--color-primary)",
    },
  ];

  return (
    <div className="h-full w-full rounded-md bg-neutral-50">
      <ResponsiveContainer>
        <RadialBarChart
          innerRadius={80}
          barSize={10}
          data={data}
          startAngle={90}
          endAngle={450}
        >
          <circle cx="50%" cy="50%" fill="white" r="80" />
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar background={true} dataKey="value" cornerRadius={10} />
          <text
            x={30}
            y={45}
            className="fill-[#20253A] text-[0.94rem] font-medium"
          >
            Score
          </text>
          <text
            x="50%"
            y="44%"
            textAnchor="middle"
            className="fill-[#20253A] text-2xl font-bold"
          >
            {scorePercentage}%
          </text>
          <text
            x="50%"
            y="54%"
            textAnchor="middle"
            className="fill-[#74798C] text-base font-medium"
          >
            de votre
          </text>
          <text
            x="50%"
            y="62%"
            textAnchor="middle"
            className="fill-[#74798C] text-base font-medium"
          >
            objectif
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreChart;
