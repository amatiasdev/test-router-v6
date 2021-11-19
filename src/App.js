import './App.css';
import './styles.css'
import { useState, useEffect, useMemo } from 'react';
import InfoCity from './Components/InfoCity/InfoCity';
import Table from './Components/Table/Table';
import axios from 'axios';
function App() {


  const [data, setData] = useState([]);

  const [elementSelect, setElementSelect] = useState(null);

  useEffect(() => {

/*POST {
  body: {
    {"_id":"5952983359954a0adbf7ab09","cityid":"MXAS0002","validdateutc":"20170627T140000Z","winddirectioncardinal":"SSE","probabilityofprecip":"40","relativehumidity":"90","name":"Aguascalientes","date-insert":"2017-06-27T17:36:43.084Z","longitude":"-102.296","state":"Aguascalientes","lastreporttime":"20170627T092449Z","skydescriptionlong":"Tormentas dispersas","stateabbr":"AGU","tempc":"17","latitude":"21.87982","iconcode":"96","windspeedkm":"6"}
  },
  headers: {
    "Content-type": "application/json",
    "Autorization": "Bearer kdashfbkldnfaslfjdsnks.d"
  }
  //FET
}*/

    localStorage.setItem('token', 'Bearer kdashfbkldnfaslfjdsnks.d');
    

    //ERROR 500 >
    //ERROR 404 >

    axios.put("https://api.datos.gob.mx/v1/condiciones-atmosfericas", {name:"Aldo"});
    axios.patch("https://api.datos.gob.mx/v1/condiciones-atmosfericas", {name:"Aldo"});
    axios.delete("https://api.datos.gob.mx/v1/condiciones-atmosfericas/234");

    

    axios.post("https://api.datos.gob.mx/v1/condiciones-atmosfericas", {id:"234567ygdf", name:"Aldo"}).then(res => {
      setData(res.data.results);
    }).catch(err => {
      console.log(err);
    })

  }, []);


  return (
    <div>
      <div className="container">
        {
          elementSelect ?
            <InfoCity elementSelect={elementSelect} setElementSelect={setElementSelect} />
            :
            <Table data={data} setElementSelect={setElementSelect} />
        }

      </div>
    </div>
  );
}

export default App;
