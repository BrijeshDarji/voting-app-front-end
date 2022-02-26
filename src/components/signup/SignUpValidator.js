import { withFormik } from "formik"
import * as Yup from "yup"

const SignUpValidator = withFormik({
    validationSchema: Yup.object().shape({
        username: Yup.string().required('Enter an user name'),
        email: Yup
            .string()
            .required("Enter an email")
            // eslint-disable-next-line
            .matches(/^([a-zA-Z0-9_\-\.\+]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, {
                message: "Enter valid email address",
            }),
        password: Yup
            .string()
            .required("Please enter password")
            .min(8, "Password must be of minimum 8 characters")
            .max(8, "Password must be of maximum 8 characters")
    }),
    mapPropsToValues: (props) => {
        return {
            email: "",
            password: "",
        }
    },
    handleSubmit: (values) => { },
    displayName: "SignUpForm",
    enableReinitialize: true,
    validateOnMount: true,
});

export default SignUpValidator
