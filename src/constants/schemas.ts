import * as yup from 'yup'

// ContactForm validation schema 
export const ContactFormSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().transform((val) => (val ? String(val).trim() : ''))
    .required('Phone is required').min(6, 'Phone must have at least 9 digits'), // enforce minimum digits

}).required();