import React, { useEffect, useReducer } from "react";
import XLSX from "xlsx";
import DataTable from "./components/DataTable";
import Filters from "./components/Filters";

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "COLLAPSE_FILTERS":
      return {...state, filtersCollapsed: payload};
    case "SET_DATAREADY":
      return { ...state, dataReady: payload };
    case "UPDATE_DATA":
      return { ...state, data: payload };
    case "SET_LOADED":
      return { ...state, loaded: payload };
    case "SET_FAIL":
      return { ...state, fail: payload };
    case "SET_MINPRICE":
      return { ...state, minPrice: payload };
    case "SET_MAXPRICE":
      return { ...state, maxPrice: payload };
    case "SET_ESTATE":
      return { ...state, estate: payload };
    case "SET_ERROR":
      return { ...state, error: payload };
    case "ENABLE_ESTATEFILTER":
      return {...state, enableEstateFilter: payload};
    case "SET_MINFLOOR":
      return {...state, minFloor: payload};
    case "SET_MAXFLOOR":
      return {...state, maxFloor: payload};
    case "SET_SPEC":
      return {...state, spec: payload};
    case "ENABLE_SPECFILTER":
      return {...state, enableSpecFilter: payload};
    case "SET_REGION":
      return {...state, region: payload};
    case "ENABLE_REGIONFILTER":
      return {...state, enableRegionFilter: payload};
    case "SET_MINUSABLEAREA":
      return {...state, minUsableArea: payload};
    case "SET_MAXUSABLEAREA":
      return {...state, maxUsableArea: payload};
    default:
      return state;
  }
}

function App() {
  const initialState = {
    data: [],
    filtersCollapsed: false,
    loaded: false,
    fail: false,
    minPrice: 0,
    maxPrice: '',
    minFloor: 0,
    maxFloor: '',
    error: false,
    estate: "",
    enableEstateFilter: false,
    spec:"",
    enableSpecFilter: false,
    region: "",
    enableRegionFilter: false,
    minUsableArea: 0,
    maxUsableArea: ''
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { 
    data, 
    filtersCollapsed,
    loaded, fail, error,
    minPrice, maxPrice, 
    minFloor, maxFloor,
    estate, enableEstateFilter,
    spec, enableSpecFilter,
    region, enableRegionFilter,
    minUsableArea, maxUsableArea
  } = state;

  /**
   * triggered when user uploads a file;
   * mainly for updating file if need be
   */
  const readFile = (file) => {
    const promise = new Promise((res, rej) => {
      /* read file */
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const arrayBuffer = e.target.result;
        /* now can read workbook */
        const workbook = XLSX.read(arrayBuffer, { type: "buffer" });
        const worksheetName = workbook.SheetNames[0];
        const workSheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(workSheet);
        res(data);
      };

      fileReader.onerror = (err) => rej(err);
    });

    promise.then((d) => {
      dispatch({ type: "UPDATE_DATA", payload: d[0] });
      dispatch({ type: "SET_LOADED", payload: true });
      return;
    });
  };

  /* fetching data and update data state on mount */
  useEffect(() => {
    /* fetch data from ./public/data.json */
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({ type: "UPDATE_DATA", payload: data[0] });
        dispatch({ type: "SET_ESTATE", payload: data[0][0]["Estate"] });
        dispatch({ type: "SET_SPEC", payload: data[0][0]["Spec"] });
        dispatch({ type: "SET_REGION", payload: data[0][0]["Region"] });
        dispatch({ type: "SET_LOADED", payload: true });
        return;
      })
      .catch((err) => {
        dispatch({ type: "SET_LOADED", payload: true });
        dispatch({ type: "SET_FAIL", payload: true });
        throw err;
      });
  }, []);

  const handleSetMinPrice = (e) => {
    dispatch({ type: "SET_MINPRICE", payload: e.target.value });
  };

  const handleSetMaxPrice = (e) => {
    dispatch({ type: "SET_MAXPRICE", payload: e.target.value });
  };

  const handleSetMinFloor = (e) => {
    dispatch({type: 'SET_MINFLOOR', payload: e.target.value})
  }

  const handleSetMaxFloor = (e) => {
    dispatch({type: 'SET_MAXFLOOR', payload: e.target.value})
  }

  const handleSetEstate = (e) => {
    dispatch({ type: "SET_ESTATE", payload: e.target.value });
  };

  const handleSetUseEstateFilter = () => {
    dispatch({type: "ENABLE_ESTATEFILTER", payload: !enableEstateFilter});
  }

  const handleSetSpec = (e) => {
    dispatch({type: "SET_SPEC", payload: e.target.value})
  }

  const handleSetUseSpecFilter = () => {
    dispatch({type: "ENABLE_SPECFILTER", payload: !enableSpecFilter});
  }

  const handleSetRegion = (e) => {
    dispatch({type: "SET_REGION", payload: e.target.value})
  }

  const handleSetUseRegionFilter = () => {
    dispatch({type: "ENABLE_REGIONFILTER", payload: !enableRegionFilter});
  }

  const handleSetMinUsableArea = (e) => {
    dispatch({type: "SET_MINUSABLEAREA", payload: e.target.value})
  }

  const handleSetMaxUsableArea = (e) => {
    dispatch({type: "SET_MAXUSABLEAREA", payload: e.target.value})
  }

  const handleCollapseFilters = () => {
    dispatch({type: "COLLAPSE_FILTERS", payload: !filtersCollapsed})
  }

  // get Estate options
  let estateArr = [];
  data.map((obj) => {
    return estateArr.indexOf(obj.Estate) === -1 && estateArr.push(obj.Estate);
  });

  // get Spec options
  let specArr = [];
  data.map(obj=>{
    return specArr.indexOf(obj.Spec) === -1 && specArr.push(obj.Spec);
  })

  // get Region options
  let regionArr = [];
  data.map(obj=>{
    return regionArr.indexOf(obj.Region) === -1 && regionArr.push(obj.Region);
  })

  return (
    <div className="App">

      <div id="EddieLogo">Eddie Lam <span>made this.</span></div>


      {/* <input
        type="file"
        name="XlFileLoader"
        id="XlFileLoader"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        onChange={(e) => {
          dispatch({ type: "SET_LOADED", payload: false });
          const file = e.target.files[0];
          readFile(file);
        }}
      /> */}

      <Filters
        /* collapse control */
        filtersCollapsed={filtersCollapsed}
        handleCollapseFilters={handleCollapseFilters}
        /* filtering price */
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPriceHandler={handleSetMinPrice}
        setMaxPriceHandler={handleSetMaxPrice}
        /* filtering floors */
        minFloor={minFloor}
        maxFloor={maxFloor}
        setMinFloorHandler={handleSetMinFloor}
        setMaxFloorHandler={handleSetMaxFloor}
        /* filtering usable area */ 
        minUsableArea={minUsableArea}
        maxUsableArea={maxUsableArea}
        setMinUsableAreaHandler={handleSetMinUsableArea}
        setMaxUsableAreaHandler={handleSetMaxUsableArea}
        /* filtering estates */
        enableEstateFilter={enableEstateFilter}
        estateValue={estate}
        estateOptions={estateArr}
        setEstateHandler={handleSetEstate}
        setEnableEstateFilterHandler={handleSetUseEstateFilter}
        /* filtering spec */
        enableSpecFilter={enableSpecFilter}
        specValue={spec}
        specOptions={specArr}
        setSpecHandler={handleSetSpec}
        setEnableSpecFilterHandler={handleSetUseSpecFilter}
        /* filtering region */
        enableRegionFilter={enableRegionFilter}
        regionValue={region}
        regionOptions={regionArr}
        setRegionHandler={handleSetRegion}
        setEnableRegionFilterHandler={handleSetUseRegionFilter}
      />

      {!fail ? (
        loaded ? (
          error ? (
            <h1>{error}</h1>
          ) : (
            <DataTable
              data={data}
              minPrice={minPrice}
              maxPrice={maxPrice}
              minFloor={minFloor}
              maxFloor={maxFloor}
              minUsableArea={minUsableArea}
              maxUsableArea={maxUsableArea}
              estate={estate}
              enableEstateFilter={enableEstateFilter}
              spec={spec}
              enableSpecFilter={enableSpecFilter}
              region={region}
              enableRegionFilter={enableRegionFilter}
            />
          )
        ) : (
          <h1>Still loading data...</h1>
        )
      ) : (
        <h1>Failed to fetch data...</h1>
      )}
    </div>
  );
}

export default App;
