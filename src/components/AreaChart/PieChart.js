import React from "react";
import "./styles.css";
import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
  Label
} from "recharts";
// import moment from "moment";

// console.log(
//   moment(1612390027112).startOf("minute").add(1, "minutes").toISOString()
// );
// const data01 = [
//   { name: "Active Campagins", value: 90 },
//   { name: "Inactive Campagins", value: 25 },
//   { name: "ICPs with no campagins", value: 10 }
// ];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Bullet = ({ backgroundColor, size }) => {
  return (
    <div
      className="CirecleBullet"
      style={{
        backgroundColor,
        width: size,
        height: size
      }}
    ></div>
  );
};

const CustomizedLegend = (props) => {
  const { payload } = props;
  return (
    <ul className="LegendList">
      {payload.map((entry, index) => (
        <li key={`item-${index} flex`}>
          <div className="BulletLabel">
            <Bullet backgroundColor={entry.payload.fill} size="10px" />
            <div className="BulletLabelText">{entry.value}</div>
          </div>
          <div style={{ marginLeft: "20px" }}>{entry.payload.value}</div>
        </li>
      ))}
    </ul>
  );
};

const CustomLabel = ({ viewBox, labelText, value }) => {
  const { cx, cy } = viewBox;
  return (
    <g>
      <text
        x={cx}
        y={cy}
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
        alignmentBaseline="middle"
        fontSize="15"
      >
        {labelText}
      </text>
      <text
        x={cx}
        y={cy + 20}
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
        alignmentBaseline="middle"
        fill="#0088FE"
        fontSize="26"
        fontWeight="600"
      >
        {value}
      </text>
    </g>
  );
};

export default function PC({pieData}) {
  const dataPie = pieData?.map((item, index)=>({
    name: item['dataKey'],
    value: 40
  }))
  return (
    <div style={{ width: "100%", height: 420 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={dataPie}
            dataKey="value"
            cx={280}
            cy={100}
            innerRadius={80}
            outerRadius={100}
          >
            {dataPie.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
            <Label
              content={<CustomLabel labelText="POD" value={15} />}
              position="center"
            />
          </Pie>
          <Legend content={<CustomizedLegend />} wrapperStyle={{top: '229px'}}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
