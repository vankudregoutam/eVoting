import * as Yup from 'yup';

export const logInSchema = Yup.object({
    id: Yup.number().min(0).required('Please enter your id'),
    pass: Yup.string().min(4).max(10).required('Please enter your password')
})