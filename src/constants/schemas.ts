import * as yup from 'yup'

// ContactForm validation schema 
export const ContactFormSchema = yup.object({
  phone: yup.string().transform((val) => (val ? String(val).trim() : ''))
    .required('Phone is required').min(6, 'Phone must have at least 9 digits'), // enforce minimum digits
}).required();