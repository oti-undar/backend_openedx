export function parseFormDataToObject(formData: FormData): Record<string, any> {
  const result: Record<string, any> = {}

  for (const [key, value] of formData.entries()) {
    setNestedValue(result, key, value)
  }

  return result
}

function setNestedValue(obj: any, path: string, value: any) {
  const keys = path.split(/[\[\].]/).filter(key => key !== '')
  let current = obj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    const nextKey = keys[i + 1]

    if (!current[key]) {
      current[key] = /^\d+$/.test(nextKey) ? [] : {}
    }

    current = current[key]
  }

  const finalKey = keys[keys.length - 1]
  current[finalKey] = value
}
