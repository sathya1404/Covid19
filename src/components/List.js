import React,{useState,useEffect} from 'react'
import Axios from 'axios';
import logo from '../assets/logo.png'
import OverflowScrolling from 'react-overflow-scrolling';   
import './style.css'

function List() {
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const[name,setName]=useState('')
    const [loading,setLoading]=useState(false);
    const [totalcases, setTotalCases] = useState('');
    const [totaldeaths, setTotaldeaths] = useState('');
    const [width,setWidth]=useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight)
    
    // const [show, setShow] = useState(true)

    useEffect(() => {
        const RAPIDAPI_REQUEST_HEADERS = {
            'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
            , 'X-RapidAPI-Key': 'c81aaf7080msh81ddbbfa13356a0p1fa514jsnb933c2593299'            
          };
      Axios.get("https://covid-193.p.rapidapi.com/statistics",{ headers: RAPIDAPI_REQUEST_HEADERS })
      .then(resp=>{
          console.log(resp.data.response)
          setLoading(true)
          setData(resp.data.response);  
          let cas=resp.data.response.map(i=>[i.cases.total]);
          setTotalCases(cas.flat().reduce((x,y)=>x+y))
          let death=resp.data.response.map(i=>[i.deaths.total]);
          setTotaldeaths(death.flat().reduce((x,y)=>x+y))                    
      })
    }, [])

    let clickHandler=(country)=>{    
        localStorage.setItem("name",country)  
      setData([])
      setList(data.filter(i=>i.country===country))     
    }
    let refreshPage=()=>{
        window.location.reload(false)       
    }    
    let handleChange=(e)=>{
     let name=e.target.value;
     setName(name)
     let fill=data.filter(i=>{
         let nam=name.toLowerCase();
         let val=i.country.toLowerCase();
        return val==nam
    })
    if(fill.length>0){
        setData([])
        setList(fill)
    }
    console.log(fill,'hs')
   
    }
    const size=window.innerWidth>650 ? 100 : 50;
    return (
        <div >
            <div className="bg" style={{width:width,height:height}}>
            {/* <img src={logo} className="logo" width="70px" style={{borderRadius:"50%",textAlign:"left"}}/> */}
                 {totalcases &&
                 <div className="cases">
                 <span >Total Cases :{totalcases}</span>
                 <span style={{color:'red',margin:"10px"}}>Total Deaths :{totaldeaths}</span>
                 </div> 
                 } 
                          

            <h1 className="title"><b style={{backgroundColor:"red"}}>C</b>ovid 19 statistics</h1> <br/>
            {data.length>0 &&
            <input type="text" placeholder="enter your country name" size={size} onChange={handleChange}/>
            } 
             <div style={{overflowY:"scroll",height:"500px",margin:"10px"}}>
            <div >
            { list.map(i=>(
                <React.Fragment>
                    <div className="card">
                        <h2 className="content-4" >{i.country}</h2>
                              <h3 className="card-content">New Cases : {i.cases.new}</h3>   
                              <h3 className="card-content">Active Cases : {i.cases.active}</h3>
                              <h3 className="card-content">Critical Cases : {i.cases.critical}</h3>
                              <h3 className="card-content">Recovered : {i.cases.recovered}</h3>
                              <h3 className="card-content">Total Cases :{i.cases.total}</h3>
                              <h3 className="card-content">New deaths : {i.deaths.new}</h3>
                              <h3 className="card-content">Total Deaths :{i.deaths.total}</h3>
                              <button onClick={refreshPage}>Back</button>
                    </div>
                </React.Fragment>
            ))            
            }
            </div>            
            <div >                         
            { loading ? data.map(i=>(
                <React.Fragment>
                    <div className="cards" onClick={e=>clickHandler(i.country)}>
                     <h2 className="content-1" >{i.country}</h2>
                     <h3 className="content-2" >Total Cases : {i.cases.total}</h3>
                     <h3 className="content-3">Recovered : {i.cases.recovered}</h3>
                     <h3 className="content-4">Total deaths : {i.deaths.total}</h3>
                     <h3 className="content-5">Date : {i.day}</h3>            

                    </div>
                </React.Fragment>
            )):<div><h2 className="content-4">Loading....</h2></div>}
            </div> 
            </div>  
                {loading &&
                <div className="content-5" style={{textAlign:"right"}}>
                   <h3>Developed By : A SAI MOHAN</h3>                   
                </div> }                       
            
             </div>
           
        </div>
    )
}

export default List
