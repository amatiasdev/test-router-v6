import moment from 'moment'
import React from 'react'

function InfoCity({
    elementSelect,
    setElementSelect
}) {

    console.log(elementSelect)
    return (
        <div className="container-info">
            <div className="container-back-to-table">
                <button onClick={() => setElementSelect(null)}>Back to table</button>
            </div>

            <div className="container-info-city">
                <div className="container-info-city-title">
                    <h1>{elementSelect.name}</h1>
                </div>
                <div className="container-data">
                    <label><strong>ID: </strong> {elementSelect._id}</label>
                    <label><strong>City: </strong>{elementSelect.cityid}</label>
                </div>
                <div className="container-data">
                    <label><strong>Valid date utc: </strong>{elementSelect.validdateutc}</label>
                    <label><strong>Wind direction cardinal: </strong>{elementSelect.winddirectioncardinal}</label>
                </div>

                <div className="container-data">
                    <label><strong>Probability of precip: </strong>{elementSelect.probabilityofprecip}</label>
                     <label><strong>Relative humidity: </strong> {elementSelect.relativehumidity}</label>
                </div>

                <div className="container-data">
                     <label><strong>Name: </strong> {elementSelect.name}</label>
                     <label><strong>Date Insert: </strong> {elementSelect['date-insert']}</label>
                </div>

                <div className="container-data">
                     <label><strong>Longitude: </strong> {elementSelect.longitude}</label>
                     <label><strong>State: </strong> {elementSelect.state}</label>
                </div>

                <div className="container-data">
                     <label><strong>Lastreporttime: </strong> {moment(elementSelect.lastreporttime).format("YYYY-MM-DD hh:smm:ss")}</label>
                     <label><strong>Sky description long: </strong> {elementSelect.skydescriptionlong}</label>
                </div>
                <div className="container-data">
                     <label><strong>State abbr: </strong> {elementSelect.stateabbr}</label>
                     <label><strong>Tempc: </strong> {elementSelect.tempc}</label>
                </div>
                <div className="container-data">
                     <label><strong>Latitude: </strong> {elementSelect.latitude}</label>
                     <label><strong>Icon code: </strong> {elementSelect.iconcode}</label>
                </div>
                <div className="container-data">
                     <label><strong>Wind speed km: </strong> {elementSelect.windspeedkm}</label>
                </div>
            </div>
        </div>
    )
}

export default InfoCity
