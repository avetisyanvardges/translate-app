import * as yup from 'yup'
import { revertToYupMessageFormat } from '../helpers'

yup.setLocale({
  mixed: {
    required: ({ path }) =>
      `${revertToYupMessageFormat(path)} is a required field`,
  },
  string: {
    min: ({ min, path }) =>
      `${revertToYupMessageFormat(path)} must be at least ${min} characters`,
  },
})

export default yup
