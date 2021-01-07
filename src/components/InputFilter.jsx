const InputFilter = ({label, name,value, onChangeHandler, type, prefix}) => {
    return(
        <div className="inputFilterContainer">
            <label htmlFor={name} id={name} name={name}>{label}</label>

            <div className="inputWrapper">
                <span className="prefix">{` ${prefix}`}</span>
                <input type={type ? type : 'text'} 
                inputMode={type==='number' ? 'numeric' : ''} 
                id={name} name={name}
                value={value}
                onChange={(e)=>onChangeHandler(e)}/>
            </div>

        </div>
    )
}

export default InputFilter;