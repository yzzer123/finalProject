import React,{Component} from 'react';
import {
  View,
} from 'react-native';
import {Echarts} from 'react-native-secharts'
class ReadChart extends Component{
    constructor(props){
        super(props);
        this.state={
            time:[],
            value:[]}
            
    }
    componentDidMount(){
        var listtime=[]
        var listvalue=[]
        fetch(`http://yzzer.top:5074/readTime/${global.user.id}`)
        .then(rep=>rep.json())
        .then(data=>{
          for(let i in data)
            if(i!=="id"&&i!=="createdAt")
            {
                listtime.push(i)
                listvalue.push(data[i]/60)
            }
        })
        .then(()=>{
            this.setState({time:listtime,value:listvalue})
        })
    }

    render(){
        const option={
            title:{
                left:'center',
              text:'Reading time',
              textStyle:{
                  fontSize:25,
                  
              },
              subtext:"分钟",
              subtextStyle:{
                  fontSize:15,
              }
            },
            tooltip:{},
            legend:{
              right:'right',
              data:['time'],
              textStyle:{
                  fontSize:'15'
              }
            },
            xAxis:{
              data:this.state.time
            },
            yAxis:{
              type:'value',
              axisLabel:{
                  fontSize:'15',
              }
            },
            series:[{
              name:'time',
              type:'line',
              data:this.state.value,
              areaStyle:{}
            }]
          }
        return(
            <View style={{marginTop:50}}>
                <Echarts option={option} height={400} />
            </View>
        )
    }


}


export default ReadChart