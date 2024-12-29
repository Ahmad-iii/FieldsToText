import { ref } from 'vue'

export const useDynamicFields = () => {
  const fields = ref([])

  const addField = (label) => {
    const newId = Date.now()
    fields.value.push({
      id: newId,
      label: label,
      value: '',
      placeholder: 'Enter your text here'
    })
  }

  const removeField = (id) => {
    if (fields.value.length > 0) {
      fields.value = fields.value.filter((field) => field.id !== id)
    }
  }

  return { fields, addField, removeField }
}
