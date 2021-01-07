import React from 'react';
import InputFilter from './InputFilter';
import SelectionFilter from './SelectionFilter';

const Filters = (
    {
     filtersCollapsed,
     handleCollapseFilters,

     enableRegionFilter, regionValue, regionOptions, setEnableRegionFilterHandler, setRegionHandler,
     enableEstateFilter, estateValue, estateOptions, setEnableEstateFilterHandler, setEstateHandler,
     enableSpecFilter, specValue, specOptions, setSpecHandler, setEnableSpecFilterHandler,

     setMinPriceHandler, setMaxPriceHandler, minPrice, maxPrice, 
     setMinFloorHandler, setMaxFloorHandler, minFloor, maxFloor,
     minUsableArea, maxUsableArea, setMinUsableAreaHandler, setMaxUsableAreaHandler
    }
    ) => {

    const handleCollapseBtnOnClick = (e) => {
        e.preventDefault();
        handleCollapseFilters();
    }

    return (
        <>
            <form id="filters" className={filtersCollapsed ? 'collapsed' : 'expanded'}>
            <div className="innerContainer">

                <SelectionFilter
                enable={enableRegionFilter} enableHandler={setEnableRegionFilterHandler} value={regionValue} 
                name="region" options={regionOptions} onChangeHandler={setRegionHandler}/>

                <SelectionFilter
                enable={enableEstateFilter} enableHandler={setEnableEstateFilterHandler} value={estateValue} 
                name="estate" options={estateOptions} onChangeHandler={setEstateHandler}/>

                <SelectionFilter
                enable={enableSpecFilter} enableHandler={setEnableSpecFilterHandler} value={specValue} 
                name="spec" options={specOptions} onChangeHandler={setSpecHandler}/>

                <div className="inputFilter">
                    
                    <InputFilter type={'number'} 
                    label="Floor(min): " name="minFloor" 
                    prefix="Flr." value={minFloor} 
                    onChangeHandler={setMinFloorHandler} />

                    <InputFilter type={'number'} 
                    label="Floor(max): " name="maxFloor" 
                    prefix="Flr."value={maxFloor} 
                    onChangeHandler={setMaxFloorHandler} />

                </div>

                <div className="inputFilter">
                    <InputFilter type={'number'} 
                    label="Price(min): " name="minPrice" 
                    prefix="$" value={minPrice} 
                    onChangeHandler={setMinPriceHandler}/> 
                    
                    <InputFilter type={'number'} 
                    label="Price(max): " name="maxPrice" 
                    prefix="$" value={maxPrice} 
                    onChangeHandler={setMaxPriceHandler}/> 
                </div>
                
                <div className="inputFilter">
                    <InputFilter type={'number'} 
                    label="Usable Area(min): " name="minUsableArea" 
                    prefix="ft." value={minUsableArea} 
                    onChangeHandler={setMinUsableAreaHandler}/> 

                    <InputFilter type={'number'} 
                    label="Usable Area(max): " name="maxUsableArea" 
                    prefix="ft." value={maxUsableArea} 
                    onChangeHandler={setMaxUsableAreaHandler}/> 
                </div>

            </div>

        </form>
            <button id="collapseFilter" onClick={(e)=>handleCollapseBtnOnClick(e)}>
                {filtersCollapsed ? 'Expand Filters' : 'Collapse Filters'}
            </button>
        </>
    )
}

export default Filters;