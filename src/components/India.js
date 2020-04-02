import React,{useEffect, useState} from 'react'
import Axios from 'axios'
import './style.css'


function India() {
    const [states, setStates] = useState([]);
    const [data, setData] = useState([]);
    const [info, setInfo] = useState([]);
    const [count, setCount] = useState(0);
    const [color,setColor]=useState('');
    const [width,setWidth]=useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [loading,setLoading]=useState(false);

    useEffect(() => {

        
        const RAPIDAPI_REQUEST_HEADERS = {
            'X-RapidAPI-Host': 'corona-virus-world-and-india-data.p.rapidapi.com'
            , 'X-RapidAPI-Key': 'c81aaf7080msh81ddbbfa13356a0p1fa514jsnb933c2593299'            
          };
        Axios.get("https://corona-virus-world-and-india-data.p.rapidapi.com/api_india",{headers:RAPIDAPI_REQUEST_HEADERS})
        .then(resp=>{
            console.log(resp.data.state_wise["Andhra Pradesh"],"andhra");       
            setData(resp.data.state_wise["Andhra Pradesh"])
             setLoading(true)
           let Anantapur=resp.data.state_wise["Andhra Pradesh"].district.Anantapur.confirmed;
           let Chittoor=resp.data.state_wise["Andhra Pradesh"].district.Chittoor.confirmed;
           let East=resp.data.state_wise["Andhra Pradesh"].district["East Godavari"].confirmed;
           let Guntur=resp.data.state_wise["Andhra Pradesh"].district.Guntur.confirmed;
           let Krishna=resp.data.state_wise["Andhra Pradesh"].district.Krishna.confirmed;
           let Kurnool=resp.data.state_wise["Andhra Pradesh"].district.Kurnool.confirmed;
           let Prakasam=resp.data.state_wise["Andhra Pradesh"].district.Prakasam.confirmed;
           let Nellore=resp.data.state_wise["Andhra Pradesh"].district["S.P.S. Nellore"].confirmed;
           let Visakhapatnam=resp.data.state_wise["Andhra Pradesh"].district.Visakhapatnam.confirmed;
           let west=resp.data.state_wise["Andhra Pradesh"].district["West Godavari"].confirmed;   
           let ysr=resp.data.state_wise["Andhra Pradesh"].district["Y.S.R."].confirmed
               
           let arr=[
               {"state":"Anantapur","confirmed":Anantapur},{"state":"Chittoor","confirmed":Chittoor},
               {"state":"East Godavari","confirmed":East},{"state":"Guntur","confirmed":Guntur},
               {"state":"Krishna","confirmed":Krishna},{"state":"Kurnool","confirmed":Kurnool},
               {"state":"Prakasam","confirmed":Prakasam},{"state":"Nellore","confirmed":Nellore},
               {"state":"Visakhapatnam","confirmed":Visakhapatnam},{"state":"west Godavari","confirmed":west},
               {"state":"ysr","confirmed":ysr}            
            ]
            setTimeout(() => {
                let len=arr.length-1;                    
            if(count===len){
                setCount(0)
            }
            else{
                setCount(count+1)
            }
            var ColorCode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
           console.log(ColorCode)
           setColor(ColorCode)
            
            }, 1000);            
           console.log(arr[count],"states");
           setStates(arr)
           setInfo(arr[count])

           
        

        })
    }, [count])
    return (
        <div className="bg" style={{width:width,height:height}}>
            <h2 style={{color:"floralwhite"}}>COVID19 Andhra Statastics</h2>
            {loading ?
            <div style={{backgroundColor:"white",opacity:"0.8"}}>
           <h3>Total Cases : {data.confirmed}</h3>
            <h3>Total Recovered :{data.recovered}</h3>
            <h3>Total Deaths : {data.deaths}</h3>
            <h3>Last Updated : {data.lastupdatedtime}</h3>
            </div>:<h2 style={{color:"red"}}>Loading...</h2>}
             {loading ?
              <div style={{backgroundColor:color,margin:"30px",height:"100px"}}>
                <h2 style={{color:"black"}}>State : {info.state}</h2>
                <h2 style={{color:"red"}}>confirmed Cases : {info.confirmed}</h2>
              </div>:<h2 style={{color:"red"}}>Loading...</h2>}
              {loading ?
            <div className="table">
            <table>
  <tr>
    <th>SNO</th>
    <th>State</th> 
    <th>confirmed</th>
  </tr> 

                { states.map((i,index)=>(
                    <React.Fragment>
                        <tr>
                <td>{index+1}</td>
                            <td><p>{i.state}</p></td>
                            <td> <p>{i.confirmed}</p></td>    
                       </tr>                        
                        
                    </React.Fragment>
                ))}
                </table>
            </div>:<h2 style={{color:"red"}}>Loading...</h2>}
            
        </div>
    )
}

export default India
