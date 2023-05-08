import React,{useEffect,useState} from 'react'
import HighchartsReact from "highcharts-react-official"
import Highcharts, { getOptions } from "highcharts"
import axios from 'axios';
import GCSummary from './GCSummary';

const Charts = () => {

    // var [data,setData] = useState({});
    const [heapData,setHeapData] = useState('');
    // const [cpuData,setcpuData] = useState([]);
    const [options,setOptions]=useState({});
    const [reservedSizeChartList,setReservedSizeChartList]=useState([]);

    function getValues(arr, b, c) {
        return arr.map((obj) => [obj[b], obj[c]]);
      }
    
      useEffect(() => {
        console.log("Entered chart component")
        axios.get('http://localhost:8080').then(
            response => {
                setHeapData(response.data)
                // console.log(heapData)
            }).catch(err => console.log(err));
            
    },[]);

    const getOptionsLocal = (arr,b,c,xname,yname) => {
        // console.log("here",arr)
        var temp = getValues(arr,b,c);
        // console.log(temp)
        var options = {
            title : {
                text : c+" vs "+b
            },
            credits: {
                enabled: false
            },
            xAxis: {
                title: {
                  text: xname,
                },
              },
              yAxis: {
                title: {
                  text: yname,
                },
              },
                series: [{
                    data: temp
                }]
            }
            return options;
    }

    const getOptionsLocal2 = (arr,b,c,d,xname,yname) => {
        // console.log("here",arr)
        var temp = getValues(arr,b,c);
        var temp1 = getValues(arr,b,d);
        // console.log(temp)
        var options = {
            title : {
                text : c+" & "+d+" vs "+b
            },
            credits: {
                enabled: false
            },
            xAxis: {
                title: {
                  text: xname,
                },
              },
              yAxis: {
                title: {
                  text: yname,
                },
              },
            series: [
                {
                    name : c,
                    data: temp
                },
                {
                    name : d,
                    data: temp1
                }
        ]
        }
            return options;
    }


  return (
     <div>
        {/* {console.log(heapData)} */}
        {
          
        heapData ? 
        (<div>
            <HighchartsReact highcharts={Highcharts} options={getOptionsLocal(heapData.heapSummaryDataList,"startTime","reservedSize","Start Time (ms)","Heap Size")} />
            <HighchartsReact highcharts={Highcharts} options={getOptionsLocal(heapData.heapSummaryDataList,"startTime","heapUsed","Start Time (ms)","Heap Size")} />
            <HighchartsReact highcharts={Highcharts} options={getOptionsLocal(heapData.cpuLoadDataList,"startTime","CpuJvmUserPercentage","Start Time (ms)","Percentage")} />
            <HighchartsReact highcharts={Highcharts} options={getOptionsLocal(heapData.cpuLoadDataList,"startTime","CpuJvmSystemPercentage","Start Time (ms)","Percentage")} />
            <HighchartsReact highcharts={Highcharts} options={getOptionsLocal(heapData.cpuLoadDataList,"startTime","CpuMachineTotalPercentage","Start Time (ms)","Percentage")} />
            <HighchartsReact highcharts={Highcharts} options={getOptionsLocal2(heapData.cpuLoadDataList,"startTime","TotalJVMPercentage","CpuMachineTotalPercentage","Start Time (ms)","Percentage")} />
            <HighchartsReact highcharts={Highcharts} options={getOptionsLocal(heapData.gcSummary.gcPhasePauseDataList,"startTime","duration","Start Time (ms)","Duration (ms)")} />
            <GCSummary data = {heapData.gcSummary}/>
        </div>
        )
         : "Loading..."}
    </div>
  )
}
export default Charts