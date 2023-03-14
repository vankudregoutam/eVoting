import * as Yup from 'yup';

export const adminlogInSchema = Yup.object({
    adminid: Yup.number().min(0).required('Please enter your id'),
    adminpass: Yup.string().min(4).max(10).required('Please enter your password')
})