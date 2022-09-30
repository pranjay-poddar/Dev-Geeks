import {useState,createContext,useEffect} from 'react'

export const Nasaprovider=createContext();
export const Datacontext = (props) => {
   const [nasa,setNasa]=useState([]);
   //
   useEffect(() => {
   const getTasks=async ()=>{
  //  setloading(true);   
    const tasksFromServer=await fetchnasa();
    
    setNasa(tasksFromServer);
  //  setLoading(false);

   }
getTasks();
   },[]);
const fetchnasa=async ()=>{
   const res=await fetch("https://eonet.sci.gsfc.nasa.gov/api/v3/events")
   const {events}=await res.json();
   console.log(events);
   return events;
}


    return (
        <Nasaprovider.Provider value={[nasa,setNasa]}>
        {props.children}
        </Nasaprovider.Provider>
    )
}

