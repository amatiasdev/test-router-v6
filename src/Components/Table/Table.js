import { useState, useMemo } from 'react';
import moment from 'moment';

export default function Table({
    data,
    setElementSelect,
    setData
}) {

    const [currentPage, setCurrentPage] = useState(1);

    const dataFilter = useMemo(() => {
        const newData =  data.length > 0 ? data.filter((item, index) => index < currentPage * 10 && index >= (currentPage - 1) * 10) :[];
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

    const handleSelectCity = (element) => {
        console.log(element);
        setElementSelect(element);
    }

    const handleDelete = (city) => {
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
                                    <td>{item.cityid}</td>
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
