import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Text,
} from "recharts";

/**
 * Formats performance data with French labels in specific order
 * @param {Array} performanceData - Raw performance data
 * @returns {Array} Formatted data with French labels
 */
const formatChartData = (performanceData) => {
  const frenchLabels = {
    intensity: "Intensité",
    speed: "Vitesse",
    strength: "Force",
    endurance: "Endurance",
    energy: "Energie",
    cardio: "Cardio",
  };

  // Define desired order
  const orderedTypes = [
    "intensity",
    "speed",
    "strength",
    "endurance",
    "energy",
    "cardio",
  ];

  // Create an object that links performance types to their ID numbers
  // Exemple : {cardio: 1, ...}
  const kindMap = {};
  for (const [id, type] of Object.entries(performanceData.kind)) {
    kindMap[type.toLowerCase()] = parseInt(id);
  }

  // Create array in specific order with performance values and French labels
  return orderedTypes.map((type) => ({
    value: performanceData.data.find((item) => item.kind === kindMap[type])
      .value,
    kind: frenchLabels[type],
  }));
};

/**
 * Displays user's performance data in a radar chart
 * @param {Object} props - Component props
 * @param {Object} props.data - Raw performance data
 * @returns {JSX.Element} A radar chart showing performance metrics
 */
function PerformanceChart({ data }) {
  const formattedData = formatChartData(data);

  /**
   * Custom tick component for radar chart labels positioning
   * @param {Object} props - Component props
   * @param {Object} props.payload - Data for the current tick
   * @param {number} props.x - X coordinate of the tick
   * @param {number} props.y - Y coordinate of the tick
   * @param {number} props.cx - X coordinate of the center
   * @param {number} props.cy - Y coordinate of the center
   * @returns {JSX.Element} A customized Text component for the radar chart tick
   */
  const CustomTick = ({ payload, x, y, cx, cy }) => {
    const LABEL_OFFSET = 15; // Distance to move labels from their original position

    // Calculate if text is on left/right/top/bottom or middle
    const isMiddleX = x === cx;
    const isMiddleY = y === cy;
    const isLeft = x < cx;
    const isTop = y < cy;

    // No offset if in middle, otherwise move left/right and up/down
    const dx = isMiddleX ? 0 : isLeft ? -LABEL_OFFSET : LABEL_OFFSET;
    const dy = isMiddleY ? 0 : isTop ? -LABEL_OFFSET : LABEL_OFFSET;

    return (
      <Text
        x={x}
        y={y}
        dx={dx}
        dy={dy}
        fill="#FFF"
        textAnchor="middle"
        fontWeight={500}
      >
        {payload.value}
      </Text>
    );
  };

  return (
    <div className="h-full w-full rounded-md bg-[#282D30] text-xs">
      <ResponsiveContainer>
        <RadarChart
          margin={{ top: 25, right: 25, bottom: 25, left: 25 }}
          data={formattedData}
        >
          <PolarGrid radialLines={false} stroke="#ffffff" />
          <PolarAngleAxis dataKey="kind" tick={<CustomTick />} />
          <Radar dataKey="value" fill="rgba(255, 1, 1, 0.70)" />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PerformanceChart;
