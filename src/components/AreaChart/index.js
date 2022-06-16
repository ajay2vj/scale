import React from 'react';
// import moment from 'moment';
// import 'moment-timezone';
import {
  // AreaChart,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ReferenceLine,
} from 'recharts';
export default function AC({
  data,
  areaData,
  legendContent,
  Ylabel,
  XdataKey,
  refLine,
  width = 670,
  ticks = 5,
  height = 250,
  wrapperStyle,
}) {
  const DataFormater = (number) => {
    if (number > 1000000000) {
      return (number / 1000000000).toString() + 'B';
    } else if (number > 1000000) {
      return (number / 1000000).toString() + 'M';
    } else if (number > 1000) {
      return (number / 1000).toString() + 'K';
    } else {
      return number.toString();
    }
  }

  // const timeZone = moment.tz.guess();
  // const time = new Date();
  // const timeZoneOffset = time.getTimezoneOffset();
  // const timeformat = moment.tz.zone(timeZone).abbr(timeZoneOffset);

  return (
    <ResponsiveContainer width='100%' height={230}>
      <LineChart
        width={width}
        height={height}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 15,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey={XdataKey} stroke="black" allowDuplicatedCategory={false} style={{ fontSize: '12', fontWeight: '600' }}>

          <Label
            value={`Time`}
            position="bottom"
            offset={0}
            style={{ textAnchor: 'middle', fontSize: '14',fontWeight:'600'}}
          />
        </XAxis>
        <YAxis stroke="black" allowDecimals={false} tickFormatter={DataFormater} tickCount={ticks} style={{ fontSize: '12', fontWeight: '600' }}>
          <Label
            value={Ylabel}
            position="left"
            angle={-90}
            offset={8}
            style={{ textAnchor: 'middle', fontSize: '14',fontWeight:'600'}}
          />
        </YAxis>
        <Tooltip wrapperStyle={wrapperStyle} />
        {refLine && (
          <ReferenceLine y={refLine} stroke="#E23939" strokeWidth="1" />
        )}
        {areaData?.map(({ dataKey, stroke }) => (
          <Line
            key={dataKey}
            type="monotone"
            dataKey={dataKey}
            stroke={stroke}
            dot={false}
            isAnimationActive={true}
          />
        ))}

    
        <Legend
          align="left"
          verticalAlign="bottom"
          height={50}
          iconSize={8}
          iconType="circle"
          layout="horizontal"
          wrapperStyle={{ width:'auto', top: '95%', left: 35, right: 0, position: 'initial',display: 'flex' }}
          // style={{
          //   display: 'flex',
          //   overflowX: 'auto',
          //   flexWrap: 'wrap',
          //   backgroundColor: 'black'
          // }}
        // content={() => legendContent}
        />

        <div className=" hidden">{legendContent}</div>
 
      </LineChart>
    </ResponsiveContainer>
  );
}
