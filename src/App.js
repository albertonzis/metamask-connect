import React, {useReducer} from 'react'
import Header from './ui/Header'
import {globalState} from './utils/globalState'
import {reducer} from './utils/reducer'

const App = () => {
  const [state, dispatch] = useReducer(reducer, globalState())
  return (
    <>
      <Header reducer={{state, dispatch}}/>
    </>
  )
}

export default App
