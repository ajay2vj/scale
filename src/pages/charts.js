import React, { useEffect, useState } from 'react'
import ChartBox from "../components/AreaChart/chartBox";
import Chart from "../components/AreaChart/index";
// import { data, areaData } from '../mock';
import { useQuery } from 'react-query';
import { transformData } from '../hooks';
export default function Charts(){
  const [chartData, setChartData] = useState()
  const [serviceArea, setServiceArea] = useState([]);
  const [convertedData, setConvertedData] = useState([])
  const dataFetch = async() => {
    fetch("http://216.48.189.38:9090/api/v1/query_range?query=container_memory_working_set_bytes%7Bnamespace=%22sathiyapk%22,container=%22POD%22%7D&start=1655057179&end=1655143579&step=9000")
    .then((data) => data.json())
    .then((res) => {
      setChartData(res)
      return res;
    });
  }
  const fetchAPIdata = useQuery('fetchData' ,dataFetch)
  function transFormData(){
    const transForm = transformData(chartData?.data?.result, setServiceArea, 'service', 'service')
    setConvertedData(transForm)
  }
  useEffect(()=>{
    transFormData()
  },[chartData])
  return(
    <div className='flex'>
      <ChartBox
        margin="ml-7"
        className="pl-6 w-full"
        description="Service by plot"
      >
        <Chart 
          data={convertedData}
          areaData={serviceArea}
          Ylabel="Data per sec"
          XdataKey="Name"
        />
      </ChartBox>
      <ChartBox
        margin="ml-2"
        className="pl-6 w-full"
        description="Service by plot"
      >
        <Chart 
          data={convertedData}
          areaData={serviceArea}
          Ylabel="Data per sec"
          XdataKey="Name"
        />
      </ChartBox>
    </div>
  )
}