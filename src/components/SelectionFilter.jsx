import React, {useRef, useState} from 'react';

const SelectionFilter = ({name, options, onChangeHandler, value, enable, enableHandler}) => {

    const checkboxRef = useRef();
    const onSwitchToggle = () => {
        checkboxRef.current.click();
        setEnabled(!enabled)
    }

    const [enabled, setEnabled] = useState(false);

    return (
        <div className="selectionFilterContainer">

            <label htmlFor={name}>Use {name} filter: </label>
            <div className={`switch${enabled ? ' toggled' : ''}`} onClick={onSwitchToggle}>
                <input type="checkbox" ref={checkboxRef} id={name} name={name} value={!enable} onChange={e=>enableHandler(e)}/>
                <span className={`switchBall${enabled ? ' right':''}`}></span>
            </div>

            <select disabled={!enable} name={name} id={name} value={value} onChange={e=>onChangeHandler(e)}>
                {
                    options.map((option, index)=>{
                        return <option key={index} value={option}>{option}</option>
                    })
                }
            </select>
        </div>
    )
}

export default SelectionFilter;