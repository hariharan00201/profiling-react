import React,{useEffect,useState} from 'react'
import HighchartsReact from "highcharts-react-official"
import Highcharts, { color } from "highcharts"
// import Highcharts from 'highcharts/gantt';
import HighchartsGantt from 'highcharts/modules/gantt';
// import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import GCSummary from './GCSummary';
import accessibility  from 'highcharts/modules/accessibility'

HighchartsGantt(Highcharts);
accessibility(Highcharts);




const Charts = () => {

  
  
  
  // options1.yAxis.categories = ['Thread 1', 'Thread 2', 'Thread 3'];


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
        axios.get('http://3.93.246.151:8080').then(
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

    const getOptionsForGanttChart = (data) => {
      const options1 = {
        chart: {
          type: 'gantt',
          height: 1000
        },
        title: {
          text: 'Gantt Chart'
        },
        plotOptions: {
          gantt: {
            // milestone: {
            //   marker: {
            //     symbol: 'triangle'
            //   }
            // },
            groupPadding: 0.1,
            pointPadding: 0.1
          },
          series: {
            turboThreshold: 0
          },
          // column: {
          //   groupPadding: 0.3
          // },
          // row: {
          //   groupPadding: 0.1
          // }
        },
        // legend: {
        //   layout: 'vertical',
        //   align: 'right',
        //   verticalAlign: 'middle'
        // },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          uniqueNames: true,
          breaks: [{
            breakSize: 0.5,
            from: 0,
            to: 0,
          },
          {
            breakSize: 0.5,
            from: 1,
            to: 1,
          }
        ],
          // type: 'category',
          // grid: {
          //   columns: [{
          //     title: {
          //       text: 'Threads'
          //     },
              // categories: ['Thread 1', 'Thread 2', 'Thread 3']
          //   }]
          // },
          // categories: ['State A', 'State B']
        },
        series: data.slice(0,15)
        // [
          
          
          
          // {
          // name: 'Thread 1',
          // data: [
          //   data[0],data[33]
          //   {
          //   name: 'Thread 1',
          //   start: Date.UTC(2023, 4, 10, 12, 0),
          //   end: Date.UTC(2023, 4, 10, 13, 0),
          //   state:'A',
          //   color:'black'
          // }, {
          //   name: 'Thread 1',
          //   start: Date.UTC(2023, 4, 10, 13, 0),
          //   end: Date.UTC(2023, 4, 10, 14, 0)
          // }
        // ],
        // }, 
        // {
        //   // name: 'Thread 2',
        //   data: [{
        //     name: 'Thread 2',
        //     start: Date.UTC(2023, 4, 10, 12, 30),
        //     end: Date.UTC(2023, 4, 10, 13, 30)
        //   }, {
        //     name: 'Thread 2',
        //     start: Date.UTC(2023, 4, 10, 13, 30),
        //     end: Date.UTC(2023, 4, 10, 14, 30)
        //   }]
        //  }, {
        //   // name: 'Thread 3',
        //   data: [{
        //     name: 'Thread 3',
        //     start: Date.UTC(2023, 4, 10, 12,45),
        //     end: Date.UTC(2023,4 ,10 ,13 ,45)
        //   }, {
        //     name: 'Thread 3',
        //     start: Date.UTC(2023 ,4 ,10 ,13 ,45),
        //     end: Date.UTC(2023 ,4 ,10 ,14 ,45)
          // }
        // ]
        //  },]
      };
      return options1;
    }

    // const convertDate = (data) => {
    //   var res = []
    //   for(var datum of data){
    //     // console.log(datum)
    //     var dateString = datum.start+"";
    //     datum.start = 0//Date.UTC(
    //     //   dateString.substring(0, 4),
    //     //   dateString.substring(5, 7) - 1,
    //     //   dateString.substring(8, 10),
    //     //   dateString.substring(11, 13),
    //     //   dateString.substring(14, 16),
    //     //   dateString.substring(17, 19));
    //     //   dateString = datum.end+"";
    //     datum.end = 10//Date.UTC(
    //     //   dateString.substring(0, 4),
    //     //   dateString.substring(5, 7) - 1,
    //     //   dateString.substring(8, 10),
    //     //   dateString.substring(11, 13),
    //     //   dateString.substring(14, 16),
    //     //   dateString.substring(17, 19));
    //       res.push(datum)
    //   }
    //   return res;
    // }

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