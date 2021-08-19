import {useCallback} from 'react'

const Toast = ({reducer}) => {
  const {state: {toast: {msg}}, dispatch} = reducer

  const closeToast = useCallback((e) => {
    dispatch({type: 'toast', payload: {msg: ''}})
  }, [dispatch])

  return <> 
    {msg ?
    <div className='toast'>
      <ul>
        <li>{msg}</li>
        <li onClick={closeToast}>X</li>
      </ul>
    </div>
    : null}
  </>
}

export default Toast
