import React from "react";
import { useFormik } from 'formik';
import { adminlogInSchema } from './AdminValidate';
import { useNavigate } from "react-router-dom";

export default function AdminLogin(props) {
    const initialValues = {
        id: '',
        pass: '',
    }
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const { id, pass } = values;
        fetch('http://localhost:5000/admin', {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                id, pass
            })
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .then(res => navigate('/addCandidate'))
    }

    const { values, errors, touched, handleBlur, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: adminlogInSchema,
        onSubmit: (vḁlues) => {
            console.log("🚀 ~ file: Registration.js:20 ~ Registration ~ vḁlues", vḁlues)
        }
    });
    console.log("🚀 ~ file: Registration.js:20 ~ Registration ~ errors", errors)

    return (
        <>
            <div className='container my-5'>
                <center>
                    <h3>Admin Login</h3><br />
                    <div className="card mx-5" style={{ width: '40rem' }}>
                        <div className="card-body mx-5">
                            <div className='auth-form-container my-3'>
                                <form action="" className='login-form ms-5' onSubmit={handleSubmit}>
                                    <div className="mb-3 row">
                                        <label htmlFor="adminid" className="col-sm-4 col-form-label">ID</label>
                                        <div className="col-sm-10 w-50">
                                            <input type="integer" className="form-control" autoComplete='off' maxLength={10} name="id" id="id" value={values.id} onChange={handleChange} onBlur={handleBlur} />
                                            {errors.id && touched.id ? (<p className='form-error' style={{ color: 'red' }}>{errors.id}</p>) : null}
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="pass" className="col-sm-4 col-form-label">Password</label>
                                        <div className="col-sm-10 w-50">
                                            <input type="password" className="form-control" autoComplete='off' name="pass" id="pass" value={values.pass} onChange={handleChange} onBlur={handleBlur} placeholder='**** ****' />
                                            {errors.pass && touched.pass ? (<p className='form-error' style={{ color: 'red' }}>{errors.pass}</p>) : null}
                                        </div>
                                    </div>
                                    <button className="btn btn-primary mx-2">LogIn</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </center>
            </div>
            <br />
            <br />
            <br />
        </>
    )
}