import React,{useEffect,useState} from 'react'
import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts"
import HighchartsGantt from 'highcharts/modules/gantt';
import axios from 'axios';
import GCSummary from './GCSummary';
import accessibility  from 'highcharts/modules/accessibility'

HighchartsGantt(Highcharts);
accessibility(Highcharts);




const Charts = () => {

    const [heapData,setHeapData] = useState('');

    function getValues(arr, b, c) {
        return arr.map((obj) => [obj[b], obj[c]]);
      }
    
      useEffect(() => {
        console.log("Entered chart component")
        axios.get('http://localhost:8080/charts/'+window.localStorage.getItem("file")).then(
            response => {
                setHeapData(response.data)
            }).catch(err => console.log(err));
            
    },[]);
    

    const getOptionsLocal = (arr,b,c,xname,yname) => {
        var temp = getValues(arr,b,c);
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
        var temp = getValues(arr,b,c);
        var temp1 = getValues(arr,b,d);
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

    const getOptionsForGanttChart = (data) => {
      const options1 = {
        chart: {
          type: 'gantt',
          height: data.length*20+"",
        },
        title: {
          text: 'Gantt Chart'
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          uniqueNames: true,
       
        },
        plotOptions: {
          gantt: {
          },
        },
        series: data,
        tooltip: {
          pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.state1}</b><br/>' +
            'Start: {point.start:%e. %b %Y %I:%M:%S %p}<br/>' +
            'End: {point.end:%e. %b %Y %I:%M:%S %p}<br/>' +
            'All Data of Event: {point.tooltip}<br/>'
        },
      };
      return options1;
    }

  return (
     <div>
        {console.log(heapData)}
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
            <HighchartsReact highcharts={Highcharts} constructorType={"ganttChart"} options={getOptionsForGanttChart(heapData.threadEventsDataWrapperList)}/>
        </div>
        )
         : "Loading..."}
    </div>
  )
}
export default Charts