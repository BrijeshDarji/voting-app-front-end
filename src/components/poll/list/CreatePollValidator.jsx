import { withFormik } from "formik"
import * as Yup from "yup"

const CreatePollValidator = withFormik({
    validationSchema: Yup.object().shape({
        pollTitle: Yup
            .string()
            .required("Please enter a title"),
        pollOptions: Yup
            .string()
            .required("Please enter options")
    }),
    mapPropsToValues: (props) => {
        return {
            pollTitle: "",
            pollOptions: "",
        }
    },
    handleSubmit: (values) => { },
    displayName: "CreatePollForm",
    enableReinitialize: true,
    validateOnMount: true,
});

export default CreatePollValidator
