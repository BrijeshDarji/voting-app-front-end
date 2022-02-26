import { withFormik } from "formik"
import * as Yup from "yup"

const PollDetailValidator = withFormik({
    validationSchema: Yup.object().shape({
        selectedOption: Yup
            .mixed()
            .test("selectedOption", 'Option is required', (value) => {
                return Object.keys(value).length
            })
    }),
    mapPropsToValues: (props) => {
        return {
            selectedOption: {},
        }
    },
    handleSubmit: (values) => { },
    displayName: "PollDetailForm",
    enableReinitialize: true,
    validateOnMount: true,
});

export default PollDetailValidator
