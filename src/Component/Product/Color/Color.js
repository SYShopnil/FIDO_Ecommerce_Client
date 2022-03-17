import React, {useState} from 'react'

const Color = ({sentData, currentData}) => {
    const availableColor = ["red", "green", "blue", "grey"] //my default color

    const initialState = currentData != "[]"  ? currentData : [{
        colorName: "",
        stockAvailable: 0
    }] //check that is it a edit phase or create phase if edit phase then 1st one is execute 

    const [stockInfo, setStockInfo ] = useState(initialState) //set the stock available state

    
    // addMoreColorHandler
    const addMoreColorHandler = (e) => {
        e.preventDefault();
        setStockInfo([
            ...stockInfo,
            {
                colorName: "",
                stockAvailable: 0
            }
        ])
    }

    //itemRemoveHandler
    const itemRemoveHandler = (e, ind) => {
        e.preventDefault();
        const clickItemIndex = ind //store the index of the clicked item 
        const newStock = [...stockInfo] //store the latest stock info
        const afterFilter = newStock.filter((item, ind) => ind != clickItemIndex) //find those data who's are not equal to the index of
        setStockInfo(afterFilter)
    }

    // dataChangeHandler
    const dataChangeHandler = (e, ind) => {
        const myValue = e.target.value //store the value 
        const myInputIndex = ind //store the index here 
        const newData = [...stockInfo] //store the current state of stock info
        newData[myInputIndex][e.target.name] = myValue //store the value
        setStockInfo(newData)
    }
    // console.log(stockInfo);
    sentData(stockInfo) //sent the color data 
    return (
        <div>
            {
                stockInfo.map((item, ind) => {
                    const {colorName:storeColor, stockAvailable} = item //get the item from state
                    // console.log(item);
                    return (
                        <div>
                            {/* color part */}
                            <div className = {`d-flex justify-content-between`}>
                                 <label htmlFor="color" className="form-label">Color: {ind + 1}</label>
                                {
                                    ind+1 > 1 && <button className = {`mb-2`} onClick={(e) => itemRemoveHandler(e , ind)}>Remove</button>
                                }
                            </div>
                            <select 
                            lassName="form-select" 
                            aria-label="Default select example" 
                            value = {`${storeColor}`}
                            onChange={(e) => dataChangeHandler(e, ind)}
                            name = "colorName">
                                {
                                    availableColor.map((color, ind) => (
                                        <option value = {color} key = {ind} >{color.toLocaleUpperCase()}</option>
                                    ))
                                }
                            </select>

                            {/* quentety part */}
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Qty</label>
                                <input 
                                type="number" 
                                className="form-control" 
                                id="exampleInputEmail1" 
                                aria-describedby="emailHelp"
                                value = {`${stockAvailable}`}
                                onChange={(e) => dataChangeHandler(e, ind)}
                                name = "stockAvailable"/>
                            </div>
                    </div>

                    )
                })
            }
            <div className = {`d-flex justify-content-end`}>
                <button onClick = {(e) => addMoreColorHandler(e)}>Add more Color</button>
            </div>
        </div>
    )
}

export default Color
