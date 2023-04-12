import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { signUpSchema } from './Validation';
import { getAuth, createUserWithAnonymously } from 'firebase/auth';

const initialValues = {
    name: '',
    id: '',
    dob: '',
    pass: '',
    conPass: '',
}

export default function Registration(props) {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, id, dob, pass, conPass } = values;

        // if (!errors) {
            fetch('http://localhost:5000/register', {
                method: 'POST',
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    name, id, dob, pass, conPass
                })
            }).then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
    }

    const { values, errors, touched, handleBlur, handleChange } = useFormik({
        initialValues: initialValues,   // this initialValues will be passed to values after submitting
        validationSchema: signUpSchema,
        onSubmit: (vḁlues) => {
            console.log("🚀 ~ file: Registration.js:20 ~ Registration ~ vḁlues", vḁlues)
        }
    });
    console.log("🚀 ~ file: Registration.js:20 ~ Registration ~ errors", errors)

    return (
        <>
            <div className='container my-5'>
                <center>
                    <h3>Create your own Account</h3><br />
                    <div className="card mx-5"><br />
                        <div className="card-body mx-5">
                            <div className='auth-form-container my-3'>
                                <form action="/" className='register-form ms-5' onSubmit={handleSubmit}>
                                    <div className="mb-3 row">
                                        <label htmlFor="name" className="col-sm-4 col-form-label">Name</label>
                                        <div className="col-sm-10 w-50">
                                            <input type="text" autoComplete='off' className="form-control" name="name" id="name" value={values.name} onChange={handleChange} onBlur={handleBlur} placeholder='Enter Name' />
                                            {errors.name && touched.name ? (<p className='form-error' style={{ color: 'red' }}>{errors.name}</p>) : null}
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="id" className="col-sm-4 col-form-label">Voter ID</label>
                                        <div className="col-sm-10 w-50">
                                            <input type="integer" autoComplete='off' className="form-control" maxLength={10} name="id" id="id" value={values.id} onChange={handleChange} onBlur={handleBlur} placeholder='1234567890' />
                                            {errors.id && touched.id ? (<p className='form-error' style={{ color: 'red' }}>{errors.id}</p>) : null}
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="dob" className="col-sm-4 col-form-label">Date of Birth</label>
                                        <div className="col-sm-10 w-50">
                                            <input type="date" autoComplete='off' className="form-control" name="dob" id="dob" value={values.dob} onChange={handleChange} onBlur={handleBlur} />
                                            {errors.dob && touched.dob ? (<p className='form-error' style={{ color: 'red' }}>{errors.dob}</p>) : null}
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="pass" className="col-sm-4 col-form-label">Create Password</label>
                                        <div className="col-sm-10 w-50">
                                            <input type="password" autoComplete='off' className="form-control" name="pass" id="pass" value={values.pass} onChange={handleChange} onBlur={handleBlur} placeholder='**** ****' />
                                            {errors.pass && touched.pass ? (<p className='form-error' style={{ color: 'red' }}>{errors.pass}</p>) : null}
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="conPass" className="col-sm-4 col-form-label">Confirm Password</label>
                                        <div className="col-sm-10 w-50">
                                            <input type="password" autoComplete='off' className="form-control" name="conPass" id="conPass" value={values.conpass} onChange={handleChange} onBlur={handleBlur} placeholder='**** ****' />
                                            {errors.conPass && touched.conPass ? (<p className='form-error' style={{ color: 'red' }}>{errors.conPass}</p>) : null}
                                        </div>
                                    </div>
                                    <button className="btn btn-primary mx-5" >Register</button> <br />
                                    <div className="btn" onClick={() => navigate('/login')}>Already have an account? Login Here.</div>
                                </form>
                            </div>
                        </div>
                    </div>
                </center>
            </div>
            <br />
        </>
    )
}
