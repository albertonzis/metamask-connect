export const reducer = (state, action) => {
  switch(action.type){
    case 'toast':
      return {...state, toast: { msg: action.payload.msg } }
    default:
      throw new Error("Type not defined")
  }
}
