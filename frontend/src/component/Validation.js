import * as Yup from 'yup';

export const signUpSchema = Yup.object({
    name: Yup.string().min(2).max(20).required('Please enter your name'),
    id: Yup.number().min(0).required('Please enter your id'),
    dob: Yup.date().required('Please enter your date of birth'),
    pass: Yup.string().min(4).max(10).required('Please enter your password'),
    conPass: Yup.string().required().oneOf([Yup.ref('pass'), null], 'Password must match')
})