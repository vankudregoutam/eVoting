import React from 'react';
import { useFormik } from 'formik';
// import { useNavigate } from 'react-router-dom';
// import Routes from './Routes'

const initialValues = {
    name: '',
    partyname: ''
}


function Addcandidate() {
    // const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefalut();

        // navigate('/addCandidate')

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
        }).then((res) => res.json())

        // if(!values) {
        //     window.alert('Invalid Registration');
        //     console.log('Invalid Registration');
        // } else {
        //     // window.alert('Successfull Registration');
        //     console.log('Successfull Registration');
        // }
    }

    const { values, errors, handleBlur, handleChange } = useFormik({
        initialValues: initialValues,   // this initialValues will be passed to values after submitting
        // validationSchema: signUpSchema,
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
                <form action="/" onSubmit={handleSubmit}>
                    <div className="mb-3 row">
                        <label htmlFor="name" className="col-sm-4 col-form-label">Name</label>
                        <div className="col-sm-10 w-50">
                            <input type="text" autoComplete='off' className="form-control" name="name" id="name" value={values.name} onChange={handleChange} onBlur={handleBlur} placeholder='Enter Name' required />
                            {/* {errors.name && touched.name ? (<p className='form-error' style={{ color: 'red' }}>{errors.name}</p>) : null} */}
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="name" className="col-sm-4 col-form-label">Party Name</label>
                        <div className="col-sm-10 w-50">
                            <input type="text" autoComplete='off' className="form-control" name="partyname" id="partyname" value={values.partyname} onChange={handleChange} onBlur={handleBlur} placeholder='Enter Party Name' required />
                            {/* {errors.name && touched.name ? (<p className='form-error' style={{ color: 'red' }}>{errors.name}</p>) : null} */}
                        </div>
                    </div>
                    <button className="btn btn-primary" >ADD</button><br /><br />
                </form>
            </div>
            {/* <div className="view-container">
                    {candidates.length > 0 && <>
                        <div className="table-responsive">
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Party Name</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <View candidates={candidates}/>
                                </tbody>
                            </table>
                        </div>
                    </>}
                    {candidates.length < 1 && <div>No Candidates are added yet</div> }
                </div> */}
        </div>
    )
}

export default Addcandidate
