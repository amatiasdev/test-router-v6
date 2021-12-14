import React, { useState, Fragment } from 'react';
import { IconButton } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import '../../../../../../Components/Usuarios/Usuario/DataTableService/StyleDataTable.css';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Tooltip from '@material-ui/core/Tooltip';
import {  Delete } from '@material-ui/icons';

const DinamicTable = (

) => {

    const [perception, setPerception] = useState('');
    const [percepciones, setPercepciones] = useState([
        {
            id: Math.random(),
            nombre: 'Sueldo',
        },
        {
            id: Math.random(),
            nombre: 'Aguinaldo',
        },
        {
            id: Math.random(),
            nombre: 'Prima Vacacional',
        },
        {
            id: Math.random(),
            nombre: 'Vales de Despensa',
        }
    ]);

    const [columnas, setColumnas] = useState([
        {
            id: 1,
            nombre: 'Nivel',
        },
        {
            id: 2,
            nombre: 'Puesto',
        }
    ]);

    const [puestos, setPuestos] = useState([
        {
            id: Math.random(),
            1: '1',
            2: 'Gerente',
        },
        {
            id: Math.random(),
            1: '6',
            2: 'Supervisor',
        },
        {
            id: Math.random(),
            1: '1',
            2: 'Operador',
        },
        {
            id: Math.random(),
            1: '10',
            2: 'Jefe de Produccion',

        },
    ]);


    const handleValuePuesto = (e, element, columna) => {
        
        setPuestos(
            puestos.map(item => {
                if (item.id === element.id) {

                    return {
                        ...item,
                        [columna.id]: e.target.value // 56
                    };

                }
            return item;
        }));
    }
    
    const replicateData = (columna) => {
        //aqui tengo duda we :(
        setPuestos(
            puestos.map(
                item => {
                return {
                    ...item, 
                    [columna.id]: puestos[0][columna.id]
                };            
        }));
    }
    

    const handleReplicateData = (e, columna) => {
        e.preventDefault();
        const response = window.confirm("¿Esta seguro de replicar los datos?");
        if(response){
            replicateData(columna);
        }
    }
    
    const handelDeleteColumn = (columna) => {
        setColumnas(prevState=>prevState.filter(item=>item.id !== columna.id));
        setPuestos(prevState=>{
            return prevState.map(item=>{
                delete item[columna.id];
                return item;
            })
        });
        percepciones.push(columna);
        /* setPercepciones(
            prevState => [...prevState, columna]
        ); */
    }
    

    console.log(percepciones);

    console.log(puestos)
    const Table = () => (
        <div>
            <table style={{ overflowX: "scroll" }} className="MuiTable-root">
                <thead className="MuiTableHead-root">
                    <tr className="MuiTableRow-root MuiTableRow-head">
                        {
                            columnas.map((columna, index ) => (
                                <th className="MuiTableCell-root MuiTableCell-head" key={columna?.id}>
                                    {columna?.nombre || "Sin nombre"}
                                    {
                                        index > 1 &&
                                        <IconButton  onClick={e =>{ handelDeleteColumn(columna)} }><Delete fontSize="small"/></IconButton>
                                    }
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody className="MuiTableBody-root">
                    {
                        puestos.map((puesto, indexPuestos) => {
                            return (
                                <tr className="MuiTableRow-root" key={puesto.id}>
                                    {
                                        columnas.map((columna, index) => (

                                            <td className="MuiTableCell-root" >
                                                {
                                                    index < 2 ?
                                                        puesto[columna.id] || ""
                                                        :
                                                        <input type="text" defaultValue={puesto[columna.id]} onBlur={e=>{handleValuePuesto(e, puesto, columna)}}/>
                                                }
                                                {
                                                    indexPuestos === 0 && index > 1 && 
                                                    <IconButton onClick={e=> handleReplicateData(e, columna)}>
                                                        <Tooltip title="Aplicar mismo monto" placement="left-start" >
                                                            <ArrowDropDownIcon fontSize="small"/>
                                                        </Tooltip>
                                                    </IconButton>
                                                }

                                            </td>
                                        ))
                                    }
                                </tr>
                            )

                        })
                    }
                </tbody>
            </table>
        </div>
    );



    const handleAddPerception = (e) => {
        e.preventDefault();

        if (perception !== '') {

            const newColumn = percepciones.find(per => per.id === +perception); //RETORNA UN OBJETO
            setColumnas([...columnas, newColumn]);//AGREGA NEW COLUMN AL ESTADO DE columnas 
            setPuestos(prevState => prevState.map(puesto => ({ ...puesto, [newColumn.id]: '0' })));//AGREGA NEW COLUMN AL ESTADO DE columnas
            setPercepciones(prevState => prevState.filter(per => per.id !== +perception));
            setPerception('');
        }
    }

    return (
        <div className="back MuiPaper-root MuiPaper-elevation2 MuiPaper-rounded">
            {

                <div className="row justify-content-between titleDinamicTable">
                    <div className="col-auto mr-auto ">
                        <label>Agregar Percepción</label>
                        <div className="form-inline" >
                            <select className="form-control" value={perception} onChange={e => { setPerception(e.target.value) }} >
                                <optgroup label="Agregar Percepción">
                                    <option value="">- Seleccione -</option>
                                    {
                                        percepciones.map(percepcion => (
                                            <option key={percepcion.id} value={percepcion.id}>{percepcion.nombre}</option>
                                        )
                                        )
                                    }
                                </optgroup>
                            </select>
                            <button className="form-control btn-third" onClick={handleAddPerception} style={{ marginLeft: "10px" }}>Agregar</button>
                        </div>
                    </div>
                    <div className="col-auto form-inline">
                        {
                            <button className="form-control btn-color" style={{ marginRight: "10px" }}>
                                <DoneIcon />
                            </button>
                        }
                        <button className="form-control btn-outline"  >
                            <CloseIcon />
                        </button>
                    </div>
                </div>
            }
            {
                <div style={{ overflowX: "scroll" }} className="ContenedorDataTable">
                    <Table />
                </div>
            }

        </div>

    );
}

export default DinamicTable;