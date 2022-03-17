import React, {useState} from 'react'

const ProductCategory = ({categoryList, categorySelectData, currentData}) => {
    const [category, setCategory] = useState(categoryList ? categoryList : [])

    // const initialSelectData = currentData != "[]" ? currentData : [""]
    // console.log(currentData);
    const [categoryData, setCategorySelectData] = useState([""]) //set the select data 
    // console.log(categoryData);
    // selectedDataHandler
    const selectedDataHandler = (e, ind) => {
        e.preventDefault();
        const data = [...categoryData] //get the previous data
        data[ind] = e.target.value
        setCategorySelectData(data)
    }

    categorySelectData(categoryData)

    return (
        <>
           {
               categoryData.map((item, index) => (
                    <div className = {`mb-2`} key = {index}>
                        <label htmlFor="form select">Category {index + 1}</label>
                        <select class="form-select" aria-label="Default select example"  onChange = {(e) => selectedDataHandler(e, index)}>
                            <option selected>Open this select menu</option>
                            {
                                category.map((item, ind) => {
                                    return (
                                        <option value= {item} key = {ind} selected = {item} >{item}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
               ) )
           }
            
           <div className= {`d-flex justify-content-end `}>
                <button onClick={(e) => {
                    e.preventDefault();
                    setCategorySelectData([...categoryData, ""])
                }}>Add more</button>
           </div>
        </>
    )
}

export default ProductCategory
