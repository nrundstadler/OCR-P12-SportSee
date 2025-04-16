import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";

function DailyActivityChart({ data }) {
  return (
    <div className="h-full w-full rounded-md bg-neutral-50 text-sm font-medium">
      <ResponsiveContainer>
        <BarChart
          data={data}
          barSize={7}
          barGap={8}
          margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
        >
          <text
            x={30}
            y={30}
            className="text-[0.94rem]"
            dominantBaseline="text-before-edge"
          >
            Activité quotidienne
          </text>
          <CartesianGrid vertical={false} strokeDasharray="3" />
          <XAxis
            dataKey="day"
            tickLine={false}
            tick={{ fill: "#9B9EAC" }}
            stroke="#DEDEDE"
            strokeWidth={2}
            tickFormatter={(value) => new Date(value).getDate()}
            dy={16}
          />
          <YAxis
            yAxisId="kilogram"
            orientation="right"
            axisLine={false}
            domain={["dataMin-2", "dataMax+1"]}
            tickLine={false}
            tickCount={3}
            tickMargin={25}
            tick={{ fill: "#9B9EAC" }}
          />
          <YAxis yAxisId="calories" domain={[0, "dataMax + 50"]} hide={true} />
          <Tooltip
            labelStyle={{
              display: "none",
            }}
            itemStyle={{
              fontSize: "0.6rem",
              backgroundColor: "var(--color-primary-dark)",
              padding: "0.7rem 0.2rem",
              margin: "0",
              color: "#fff",
              textAlign: "center",
            }}
            contentStyle={{
              backgroundColor: "var(--color-primary-dark)",
            }}
            separator=""
            formatter={(value, name) => {
              // extract the unit that is in the parenthesis ("Poids (kg)" => "kg")
              const unit = name.match(/\((.+)\)/)?.[1] ?? "";
              return [unit, value];
            }}
          />
          <Bar
            name="Poids (kg)"
            yAxisId="kilogram"
            dataKey="kilogram"
            fill="#282D30"
            radius={[3, 3, 0, 0]}
          />
          <Bar
            name="Calories brûlées (kCal)"
            yAxisId="calories"
            dataKey="calories"
            fill="var(--color-primary-dark)"
            radius={[3, 3, 0, 0]}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            iconSize="10"
            height={80}
            formatter={(value) => (
              <span
                style={{
                  color: "#74798C",
                  marginRight: value.includes("Poids") ? "2rem" : "0",
                }}
              >
                {value}
              </span>
            )}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default DailyActivityChart;
