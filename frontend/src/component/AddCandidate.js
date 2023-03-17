import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
// import { useNavigate } from 'react-router-dom';
import { Icon } from 'react-icons-kit'
import { trash } from 'react-icons-kit/feather/trash'
// import Routes from './Routes'

const initialValues = {
    name: '',
    partyname: ''
}


function Addcandidate() {
    // const navigate = useNavigate()
    const [data, setData] = useState([]);

    const handleDelete = () => {
        
    }

    // delete book from LS
    // const deleteCandidate=(isbn)=>{
    //     const filteredBooks=books.filter((element,index)=>{
    //       return element.isbn !== isbn
    //     })
    //     setbooks(filteredBooks);
    //   }

    useEffect(() => {
        fetch('http://localhost:5000/getAllCandidate', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                console.log(data, 'candidateData');
                setData(data.data)
            })
    }, [])

    const handleSubmit = (e) => {

        const { name, partyname } = values;

        fetch('http://localhost:5000/addCandidate', {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                name, partyname
            })
        })
        // Chenged here
        .then(() => {
            fetch('http://localhost:5000/getAllCandidate', {
                method: 'GET'
            }).then(res => res.json())
                .then(data => {
                    console.log(data, 'candidateData');
                    setData(data.data)
                })
        })
    }

    const { values, errors, handleBlur, handleChange } = useFormik({
        initialValues: initialValues,   // this initialValues will be passed to values after submitting
        onSubmit: (vḁlues) => {
            console.log("🚀 ~ file: Registration.js:20 ~ Registration ~ vḁlues", vḁlues)
        }
    });
    console.log("🚀 ~ file: Registration.js:20 ~ Registration ~ errors", errors)
    return (
        <div className='wrapper'>
            <h1>Candidates</h1>
            <p>Add candidtes standing in election</p>
            <div className="card mx-5" style={{ width: '45rem' }}><br />
            {/* changed onSubmit */}
                <form method="POST" className='form-container' onSubmit={(e) => { e.preventDefault(); handleSubmit(e) }}> 
                    {/* <div className="mb-3 row">
                        <label htmlFor="img" className="col-sm-4 col-form-label">Symbol</label>
                        <div className="col-sm-10 w-50">
                            <input type="file" autoComplete='off' className="form-control" name="img" id="img" onChange={handleChange} onBlur={handleBlur} accept='.jpeg, .png, .jpg' />
                        </div>
                    </div> */}
                    <div className="mb-3 row">
                        <label htmlFor="name" className="col-sm-4 col-form-label">Name</label>
                        <div className="col-sm-10 w-50">
                            <input type="text" autoComplete='off' className="form-control" name="name" id="name" value={values.name} onChange={handleChange} onBlur={handleBlur} placeholder='Enter Name' required />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="name" className="col-sm-4 col-form-label">Party Name</label>
                        <div className="col-sm-10 w-50">
                            <input type="text" autoComplete='off' className="form-control" name="partyname" id="partyname" value={values.partyname} onChange={handleChange} onBlur={handleBlur} placeholder='Enter Party Name' required />
                        </div>
                    </div>
                    <button className="btn btn-primary" >ADD</button>
                </form>
            </div>
            <div className="view-container">
                <div className="table-responsive">
                    <table className='table'>
                        <thead>
                            <tr>
                                {/* <th>Symbol</th> */}
                                <th>Name</th>
                                <th>Party Name</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(i => (

                                <tr key={i._id}>
                                    {/* <td>{i.img}</td> */}
                                    {/* <td><img src='{i.img}' width={100} /></td> */}
                                    <td>{i.name}</td>
                                    <td>{i.partyname}</td>
                                    <td><Icon icon={trash} onClick={handleDelete} /></td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Addcandidate
