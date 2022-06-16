import _ from 'lodash';

const colors = ['#300cfa', '#17b794', '#fb0505', '#6ed0e0', '#c6308a', '#74500c', '#788183', '#eab83a', '#CE6315', '#249D6F']
const areaDataGenerator = (value, name) => {
    
    let result = value?.map((item, index) => ({
        dataKey: item?.metric?.[name],
        stroke: colors[index],
        fill: "rgba(255, 255, 255, 0)"
    }))
    return result
}

export const transformData = (data,setArea,metricName,metricName1) =>{
  let metrics = data?.map((e) => e.metric[metricName]);
  const finalValues = [];
  if (data?.length > 0) {
    let area = areaDataGenerator(data, metricName);
    let area2 = area.filter((e) => e.dataKey !== undefined);
    setArea(area2);

    const simpleForm = data
      ?.map((item) => {
        return item?.values?.map((valueItem) => ({
          timestamp: valueItem?.[0],
          unit: parseInt(valueItem?.[1]),
          [metricName1]: item?.metric?.[metricName],
        }));
      })
      .flat();

const finalForm = simpleForm?.reduce(
  (accumulator, currentVal) => {
    const { timestamp, unit } = currentVal;
    const currentItemVal = currentVal[metricName1];
    let newObj = accumulator;
    if (newObj?.[timestamp]) {
      newObj[timestamp] = { ...newObj?.[timestamp], [currentItemVal]: unit };
    } else {
      newObj[timestamp] = { [currentItemVal]: unit };
    }
    return newObj;
  },
  {},
);
    const result = Object.keys(finalForm)?.map((item) => ({
      Name: item,
      ...finalForm[item],
    }));
    result?.forEach((e) => {
      let keys = Object.keys(e).slice(1);
      let diffkeys = _.difference(metrics, keys);
      let result1 = _.map(diffkeys, (e) => {
        return { [e]: 0 };
      });
      finalValues.push(_.merge(e, ...result1));
    });
  }
  return finalValues;
}