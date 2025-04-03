import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Rectangle,
} from "recharts";

/**
 * Converts numeric day to French letter
 * @param {number} day - Day number (1-7)
 * @returns {string} Single letter representation of the day in French
 */
const dayToLetterFR = (day) => {
  const days = {
    1: "L",
    2: "M",
    3: "M",
    4: "J",
    5: "V",
    6: "S",
    7: "D",
  };
  return days[day];
};

/**
 * Calculates trend values for start and end of chart
 * @param {Array<{day: number, sessionLength: number}>} data - Raw session data
 * @returns {{startTrend: number, endTrend: number}} Calculated trend values
 */
const calculateTrends = (data) => {
  const firstPoint = data[0].sessionLength;
  const secondPoint = data[1].sessionLength;
  const lastPoint = data[data.length - 1].sessionLength;
  const beforeLastPoint = data[data.length - 2].sessionLength;

  return {
    startTrend: firstPoint + (firstPoint - secondPoint),
    endTrend: lastPoint + (lastPoint - beforeLastPoint),
  };
};

/**
 * Formats raw data for chart and adds two trend points :
 * - A trend point before the first data point to extend the line to the left
 * - A trend point after the last data point to extend the line to the right
 *
 * @param {Array<{day: number, sessionLength: number}>} data - Raw session data
 * @returns {Array<{day: string, sessionLength: number}>}
 */
const formatChartData = (data) => {
  const { startTrend, endTrend } = calculateTrends(data);

  const formattedData = data.map((item) => ({
    day: dayToLetterFR(item.day),
    sessionLength: item.sessionLength,
  }));

  return [
    { day: "", sessionLength: startTrend },
    ...formattedData,
    { day: "", sessionLength: endTrend },
  ];
};

/**
 * Line chart displaying average session durations throughout the week
 * @component
 * @param {object} props
 * @param {Array<{day: number, sessionLength: number}>} props.data - Raw session data
 * @returns {JSX.Element} Line chart component
 */
function AverageSessionsChart({ data }) {
  const formattedData = formatChartData(data);

  /**
   * Custom tooltip component for the chart
   * @param {object} props - Recharts tooltip props
   * @returns {JSX.Element|null} Tooltip component
   */
  const CustomTooltip = ({ payload, label }) => {
    if (!label) return null;
    return (
      <div className="bg-white p-2 text-[0.6rem] font-medium">
        <p>{`${payload?.[0]?.value} min`}</p>
      </div>
    );
  };

  /**
   * Custom dot appearing when hovering the line chart
   * @param {object} props - Recharts active dot props
   * @returns {JSX.Element|null}
   */
  const CustomActiveDot = ({ index, cx, cy }) => {
    if (index === 0 || index === 8) {
      return null;
    }
    return <circle cx={cx} cy={cy} r={5} fill="#fff" />;
  };

  /**
   * Custom cursor component that creates a dark overlay effect on the chart
   * Shows a semi-transparent black rectangle from cursor position to right edge
   * @param {Object} props - Component props
   * @param {Array<{x: number, y: number}>} props.points - Array containing cursor coordinates
   * @param {number} props.width - Total width of the chart area
   * @returns {JSX.Element|null} Rectangle overlay or null when cursor position x = 0
   */
  const CustomCursor = ({ points, width }) => {
    const { x } = points[0];

    if (x === 0) return null;
    return (
      <Rectangle
        fill="#000000"
        opacity={0.1}
        x={x}
        y={0}
        width={width - x}
        height={300}
      />
    );
  };

  return (
    <div className="bg-primary-dark h-full w-full rounded-md text-xs">
      <ResponsiveContainer>
        <LineChart
          data={formattedData}
          margin={{ top: 70, right: 0, bottom: 40, left: 0 }}
        >
          <text
            x={30}
            y={45}
            className="fill-white/60 text-[0.94rem] font-medium"
          >
            Durée moyenne des sessions
          </text>
          {/* X axis shows days as letters with custom styling */}
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "rgba(255,255,255,0.6)",
              fontSize: "0.75rem",
              fontWeight: 500,
            }}
            dy={20}
          />
          {/* Y axis is hidden but domain is extended by 10 units on both ends for better visualization */}
          <YAxis hide={true} domain={["dataMin-10", "dataMax+10"]} />
          <Tooltip cursor={<CustomCursor />} content={<CustomTooltip />} />
          <Line
            dataKey="sessionLength"
            type="natural"
            stroke="url(#whiteGradient)"
            strokeWidth={2}
            dot={false}
            activeDot={<CustomActiveDot />}
          />
          {/* Gradient definition for the line from transparent to solid white */}
          <defs>
            <linearGradient id="whiteGradient" x1="0%" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AverageSessionsChart;
