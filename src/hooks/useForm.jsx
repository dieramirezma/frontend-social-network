import { useState } from 'react'

export const useForm = (initialObj = {}) => {
  const [form, setForm] = useState(initialObj)

  const changed = ({ target }) => {
    const { name, value } = target

    setForm({
      ...form,
      [name]: value
    })

    console.log({ name, value })
  }

  return {
    form,
    changed
  }
}
