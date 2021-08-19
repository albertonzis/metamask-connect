//window.localStorage.clear()
export const globalState = () => {
  const storage = window.localStorage
  return { storage, toast:{ msg: '' } }
} 