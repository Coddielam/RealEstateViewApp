import React from 'react';

const DataCell = ({cellData}) => {
    return (
        <td>{cellData}</td>
    );
}

const DataRow = ({rowData}) => {
    return (
        <tr>
            {Object.keys(rowData).map(key=>{
                return <DataCell key={key} cellData ={rowData[key]}/>
            })}
        </tr>
    )
}

const DataTable = (
    {data, 
     minPrice, maxPrice, 
     minFloor, maxFloor, 
     minUsableArea, maxUsableArea,
     
     enableEstateFilter, estate, 
     enableSpecFilter, spec,
     enableRegionFilter, region,
    }) => {
    /* destructure table headers */
    const headers = Object.keys(data[0]);

    let bodyData = [];

    let estateCondition = (enableEstateFilter, objEstate) => enableEstateFilter ? (objEstate === estate) : (true);
    let specCondition = (enableSpecFilter, objSpec) => enableSpecFilter ? (objSpec === spec) : (true);
    let regionCondition = (enableRegionFilter, objRegion) => enableRegionFilter ? (objRegion === region) : (true);

    let priceCondition = (objPrice) => (Number(objPrice) >= minPrice) && (maxPrice ? Number(objPrice) <= maxPrice : true);
    let floorCondition = (objFloor) => (Number(objFloor) >= minFloor) && (maxFloor ? Number(objFloor) <= maxFloor : true);
    let usableAreaCondition = (objUsableArea) => (Number(objUsableArea) >= minUsableArea) && (maxFloor ? Number(objUsableArea) <= maxUsableArea : true);
    

    let filteredData = data.filter(({Region, Price, Estate, Floor, Spec, UsableArea})=>{
        return (
            regionCondition(enableRegionFilter, Region) &&
            estateCondition(enableEstateFilter, Estate) && 
            specCondition(enableSpecFilter, Spec) &&
            priceCondition(Price) && 
            floorCondition(Floor) && 
            usableAreaCondition(UsableArea.slice(0,-1))
            )
    })

    filteredData.map((obj, index)=>{
        return bodyData.push(<DataRow key={index} rowData={obj}/>)
    })

    return (
        
        <table id="dataTable">
            <thead>
                <tr>
                    {headers.map(header=>{
                        return <th key={header}>{header}</th>
                    })}
                </tr>
            </thead>
            
            <tbody>
                {bodyData}
            </tbody>
            
        </table>
    );
}

export default DataTable;