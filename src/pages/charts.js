import React, { useEffect, useState } from 'react'
import ChartBox from "../components/AreaChart/chartBox";
import Chart from "../components/AreaChart/index";
// import { data, areaData } from '../mock';
import { useQuery } from 'react-query';
import { transformData } from '../hooks';
import PC from '../components/AreaChart/PieChart';
export default function Charts(){
  const [chartData, setChartData] = useState()
  const [serviceArea, setServiceArea] = useState([]);
  const [convertedData, setConvertedData] = useState([])
  const [pieChart, setPieChart] = useState()
  const [pieArea, setPieArea] = useState([]);
  const [, setConvertedPieData] = useState([])
  const dataFetch = async() => {
    fetch("http://216.48.189.38:9090/api/v1/query_range?query=container_memory_working_set_bytes%7Bnamespace=%22sathiyapk%22,container=%22POD%22%7D&start=1655057179&end=1655143579&step=9000",
      // {
      //   headers: {
      //     'Access-Control-Allow-Origin': '*',
      //     'Access-Control-Allow-Methods': 'GET, DELETE, HEAD, OPTIONS',
      //     'Access-Control-Allow-Credentials': true
      //   },
      // }
    )
    .then((data) => data.json())
    .then((res) => {
      setChartData(res)
      return res;
    });
  }
  const fetchAPIdata = useQuery('fetchData' ,dataFetch)
  function transFormData(){
    const transForm = transformData(chartData?.data?.result, setServiceArea, 'pod', 'pod')
    setConvertedData(transForm)
  }
  useEffect(()=>{
    transFormData()
  },[chartData])

  const dataPieFetch = async() => {
    fetch("http://216.48.189.38:9090/api/v1/query_range?query=container_memory_working_set_bytes%7Bnamespace=%22sathiyapk%22,container=%22POD%22%7D&start=1655057179&end=1655143579&step=9000",
      // {
      //   headers: {
      //     'Access-Control-Allow-Origin': '*',
      //     'Access-Control-Allow-Methods': 'GET, DELETE, HEAD, OPTIONS',
      //     'Access-Control-Allow-Credentials': true
      //   },
      // }
    )
    .then((data) => data.json())
    .then((res) => {
      setPieChart(res)
      return res;
    });
  }
  const fetchAPIPiedata = useQuery('dataPieFetch' ,dataPieFetch)
  function transFormPieData(){
    const transForm = transformData(pieChart?.data?.result, setPieArea, 'pod', 'pod')
    setConvertedPieData(transForm)
  }
  useEffect(()=>{
    transFormPieData()
  },[pieChart])
  // console.log(pieArea, 'pieArea')
  // console.log(convertedPieData, 'convertedPieData')
  return(
    <div className='flex'>
      <ChartBox
        margin="ml-7"
        className="pl-6 w-full"
        description="Pod by plot"
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
        description="Pod by plot"
      >
        <PC 
          pieData={pieArea}
        />
      </ChartBox>
    </div>
  )
}