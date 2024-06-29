// recibimos un targetcon el formulario
export const SerializeForm = (form) => {
  const formData = new FormData(form)
  // Objeto vacío
  const completeObj = {}

  for (const [name, value] of formData) {
    completeObj[name] = value
  }

  // Retornamos los datos del formulario en un objeto
  return completeObj
}
