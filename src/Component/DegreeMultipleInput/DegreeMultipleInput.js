import React, {useState}from 'react'
import Style from './DegreeMultipleUnput.module.css'

const DegreeMultipleInput = ({sentData}) => {

    const [degree, setDegree] = useState({
        // degreeNumber: [1],
        degreeRecord: [
            {
                degreeName: "",
                passingYear: "",
                session: "",
                result: ""
            }
        ]
    }) //set the degree part

    // degreeStoreHandler in this part we store data into array as a object
    const degreeStoreHandler = (e,ind) => {
        e.preventDefault();
        const value = [...degree.degreeRecord] //get the previous state value
        value[ind][e.target.name] = e.target.value //set the new value
        setDegree({degreeRecord: value}) //store the new value 
    }
  
    // degreeItemDeleteHandler
    const degreeItemDeleteHandler = (e, ind) => {
        const inputIndex = ind
        e.preventDefault();
        const newDegree = degree.degreeRecord.filter((item, ind) => ind != inputIndex)
        setDegree({
            degreeRecord:newDegree
        })
    }
    // console.log(degree.degreeRecord);

    // Degree Increase Handler
    const degreeIncreaseHandler = (e) => {
        e.preventDefault();
        setDegree({
            degreeRecord: [
                ...degree.degreeRecord, //keep the previous data of the state
                {
                    degreeName: "",
                    passingYear: "",
                    session: "",
                    result: ""
                } //create a new object of degree
            ],
        })
    }
    // console.log(degree);
    sentData(degree.degreeRecord) //sent the data to root form 
    return (
        <>
            {/* degree dynamically generate */}
                            {
                                degree.degreeRecord.map((record , ind)=> {
                                    // console.log(ind);
                                    return (
                                       <React.Fragment key = {ind}>
                                            {/* number of degree */}
                                            <div className="mb-3 d-flex justify-content-between">
                                                <label 
                                                htmlFor="contactNumber" className="form-label"><strong>Degree {ind + 1}</strong></label>
                                                {
                                                    ind+1 > 1 &&  <button onClick={(e) => degreeItemDeleteHandler(e, ind)}><i class="fas fa-minus-square"></i></button> 
                                                }
                                            </div>

                                            {/* degreeName */}
                                            <div className="mb-3">
                                                <label 
                                                htmlFor="contactNumber" className="form-label">Degree Name</label>
                                                <input 
                                                type="text" 
                                                className="form-control" id="exampleInputPassword1"
                                                value = {degree.degreeRecord[ind].degreeName}
                                                name = "degreeName"
                                                onChange = {(e) => degreeStoreHandler(e, ind)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label 
                                                htmlFor="contactNumber" className="form-label">Result</label>
                                                <input 
                                                type="text" 
                                                name = "result"
                                                className="form-control" id="exampleInputPassword1"
                                                value = {degree.degreeRecord[ind].result}
                                                onChange = {(e) => degreeStoreHandler(e, ind)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label 
                                                htmlFor="contactNumber" className="form-label">Session</label>
                                                <input 
                                                type="text" 
                                                name = "session"
                                                className="form-control" id="exampleInputPassword1"
                                                value = {degree.degreeRecord[ind].session}
                                                onChange = {(e) => degreeStoreHandler(e, ind)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label 
                                                htmlFor="contactNumber" className="form-label">Passing Year</label>
                                                <input 
                                                type="text" 
                                                name = "passingYear"
                                                className="form-control" id="exampleInputPassword1"
                                                value = {degree.degreeRecord[ind].passingYear}
                                                onChange = {(e) => degreeStoreHandler(e, ind)}/>
                                            </div>
                                       </React.Fragment>
                                    )
                                })
                            }
                            {/* degree increase part */}
                            <div className = {`d-flex justify-content-end `}>
                                <button 
                                className= {`btn btn-primary mb-3 ${Style.increaseDecreseButton}`}
                                onClick = {(e) => degreeIncreaseHandler(e)}>Add More Degree</button>
                            </div>

        </>
    )
}

export default DegreeMultipleInput
