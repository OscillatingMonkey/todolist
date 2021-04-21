// Template 0.5

import { useState, useEffect } from 'react'

const RESERVED = [
  'valid'
]

function useForm(config) {
  const [form, setForm] = useState({})
  const [submittableForm, setSubmittableForm] = useState({})
  const [validations, setValidations] = useState({})
  const [fieldUpdate, setFieldUpdate] = useState(null)
  const [valid, setValid] = useState(false)

  useEffect(() => {
    const updatedForm = {}
    const updatedSubmittableForm = {}
    const updatedValidations = {}
    let updatedIsValid = true

    config.forEach(({ label, defaultValue, validation }) => {
      const value = defaultValue || ''

      updatedValidations[label] = validation

      updatedForm[label] = {
        value,
        validations: validation(value)
      }

      if (updatedForm[label].validations.length > 0) {
        updatedIsValid = false
      }

      updatedSubmittableForm[label] = value
    })

    setValidations(updatedValidations)
    setSubmittableForm(updatedSubmittableForm)
    setForm(updatedForm)
    setValid(updatedIsValid)
  }, [])

  useEffect(() => {
    if (!fieldUpdate) return

    const { label, value } = fieldUpdate

    if (RESERVED.includes(label)) return
    if (!form[label]) return

    const updatedForm = Object.assign({}, form)
    const updatedSubmittableForm = Object.assign({}, submittableForm)

    updatedForm[label] = {
      value,
      validations: validations[label](value)
    }

    updatedSubmittableForm[label] = value

    setForm(updatedForm)
    setSubmittableForm(updatedSubmittableForm)
  }, [fieldUpdate])

  useEffect(() => {
    const totalValidations = Object.keys(form).reduce((curr, label) => {
      return curr + form[label].validations.length
    }, 0)

    setValid(totalValidations === 0)
  }, [form])

  return [
    form,
    (label, value) => setFieldUpdate({ label, value }),
    submittableForm,
    valid
  ]
}

export default useForm
