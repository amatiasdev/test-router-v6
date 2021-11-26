import { useState, useMemo } from 'react';
import moment from 'moment';

export default function Table({
    data,
    setElementSelect,
    setData
}) {

    const [currentPage, setCurrentPage] = useState(1);

    const dataFilter = useMemo(() => {
        const newData =  data.filter((item, index) => index < currentPage * 10 && index >= (currentPage - 1) * 10) ;
        return newData;
    }, [data, currentPage]);


    const handlePrevPage = (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1)
        }
    }
    const handleNextPage = (e) => {
        e.preventDefault();
        if (currentPage < data.length / 10) {
            setCurrentPage(prev => prev + 1)
        }
    }

    const getItem = (item)=>{
        return data.find(element => +element.id===item.id)?.pepe;
    }

    const getIndexCity = ()=>{
        return data.findIndex(element => element.cityid==="MXAS0175");
    }

    let clicked = [];

    const addSameCity = (item)=>{
        clicked.push(item);
    }
    
    

    const handleSelectCity = (element) => {
        var nombre = "Juan";
        //const nombre =  "Aldo";

        console.log(nombre);
        //console.log(item);


        const indexCity = getIndexCity();
        //console.log(indexCity);
        if(indexCity>=0){
            console.log("CONGRATULATIONS!");
        }

        const filterM = clicked.filter(item => item.cityid === element.cityid);//RETORNA UN ARRAY CON LOS ELEMENTOS QUE COINCIDEN CON LA CIUDAD, RETORNA UN ARRAY VACIO SI NO ENCUENTRA NADA
        const findM= clicked.find(item => item.cityid === element.cityid);//RETORNA UN OBJETO ELEMENTO QUE COINCIDEN CON LA CIUDAD, RETORNA UNDEFINED SI NO ENCUENTRA NADA
        const findIndexM= clicked.findIndex(item => item.cityid === element.cityid);//RETORNA UN NUMERO QUE COINCIDEN CON LA CIUDAD, RETORNA -1 SI NO ENCUENTRA NADA

        /* console.log(filterM);
        console.log(filterM.id); *///ACCEDIENDO A UNA PROPIEDAD DE UN OBJETO
        /* if(filterM.length===0){ //FILTER
            addSameCity(element);
        }else{
            console.log("YA EXISTE");
        } */

        /* console.log(findM);
        console.log(findM);

        if(!findM){ //FIND       {}= A TRUE PARA EL IF 
            addSameCity(element);
        }else{ //UNDEFINED FALSE PARA EL IF
            console.log("YA EXISTE");
        } */

        if(findIndexM===-1){ //FINDINDEX       {}= A TRUE PARA EL IF 
            addSameCity(element);
        }else{ //UNDEFINED FALSE PARA EL IF
            console.log("YA EXISTE");
        }

        console.log(clicked);
        
        //setElementSelect(element);
    }
    console.log(clicked);
    var nombre="Oscar";
    console.log(nombre);

    const handleDelete = (city) => {
        const item = {};
        setData(prevState => prevState.filter(item => !(+item.relativehumidity > 80 && parseInt(item.relativehumidity) <90)));
    }
    
    
    return (
        <>
            <h1>Condiciones Atmosfericas</h1>
            <div className="row">
                <div className="buttons-pagination">
                    <div>
                        <button onClick={handlePrevPage}>Previous Page</button>
                    </div>
                    <div>
                        <button onClick={handleNextPage}>Next Page</button>
                    </div>
                </div>
                <div className="table-container">
                    <table className="table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Ciudad</th>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Probabilida de Precipitacion </th>
                                <th>Humedad Relativa</th>
                                <th>Ultimo Reporte</th>
                                <th>LLUEVE</th>
                                <th>ELIMINAR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataFilter.map(item => (
                                <tr key={item.id}>
                                    <td>{item._id}</td>
                                    <td onClick={e=>{handleSelectCity(item)}}>{item.cityid}</td>
                                    <td>{item.name}</td>
                                    <td>{item.state}</td>
                                    <td>{item.probabilityofprecip}</td>
                                    <td>{item.relativehumidity}</td>
                                    <td>{moment(item.lastreporttime).format("YYYY-MM-DD")}</td>
                                    <td>{`${item.probabilityofprecip > 60 || item.relativehumidity > 50 ? "SI" : "NO"}`}</td>
                                    <td><button onClick={e=>handleDelete(item)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <label className="grand-total">Total de registros = {data.length}</label>
            </div>
        </>
    )
}
