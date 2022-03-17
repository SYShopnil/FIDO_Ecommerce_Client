import React, {useState}from 'react'
import TagsStyle from './Tags.module.css'

const Tags = ({sentData, title, currentData}) => {
        const initialState = currentData == "[]" 
        ? 
        {
            tagInput: "",
            tagStore: []
        } 
        :
        {
            tagInput: "",
            tagStore: currentData
        }  //check that is it a editable phase or not if is it in a editable phase then 2nd one is executed

        const [tags, setTags] = useState (initialState)
    // console.log(tagInput);

    // tagInputHanlder
    const tagInputHanlder = (e) => {
        e.preventDefault();
        // setTags([...tags, tagInput]) //set the add input here
        const newTag = tags.tagInput.toLocaleLowerCase()
        setTags({
            ...tags,
            tagStore: [...tags.tagStore, newTag]
        })
    }

    // tagRemoveHandler
    const tagRemoveHandler = (e, ind) => {
        e.preventDefault();
        const selectItemIndex = ind //store the index of selected items
        const {tagStore} = tags //get the store of tags
        const filterNewStore = tagStore.filter((item, ind) => ind != selectItemIndex)
        setTags({...tags, tagStore: filterNewStore})
    }

    sentData(tags.tagStore) //sent the data in to root file

    return (
        <>
            {/* tags */}
            <div className="mb-3">
                {/* tagInput Part */}
                <div className="mb-2">
                    <label for="exampleInputPassword1" className="form-label">{title}</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputPassword1"
                        onChange = { (e) => setTags({...tags, tagInput: e.target.value}) }/>

                    <div className= {`d-flex justify-content-end mt-2 `}>
                        <button onClick={(e) => tagInputHanlder(e)}>Add</button>
                    </div>
                </div>

                {/* tag Output part */}
                <div className = {`${TagsStyle.tagOutputWrapper} p-2`} >
                    {
                        tags.tagStore.map((item, ind) => {
                            return(
                                <span key = {ind}>
                                    <p className = {`m-2 btn btn-primary ${TagsStyle.tagOutputButton}`}>{item}
                                    <i className= {`${TagsStyle.tageOutputButtonCrossSign} far fa-times-circle`}  onClick = {(e) => tagRemoveHandler(e, ind)}></i></p>
                                </span>
                            )
                        })
                    }
                </div>

            </div>
        </>
    )
}

export default Tags
