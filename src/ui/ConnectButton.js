import { useState, useEffect } from "react";

const BSC_CHAIN_ID = 0x38;

const ConnectButton = ({reducer}) => {
  const [walletAddress, setWalletAddress]= useState('')
  const {state: {storage}, dispatch} = reducer

  const checkProvider = () => {
    if (!window.ethereum) {
      dispatch({type: 'toast', payload: {msg: 'No provider was found. Please consider install MetaMask' }})
      return false
    }
    return true;
  }

  const getChainId = async () => {
    const chainId = await window.ethereum.request({method: 'eth_chainId'})
    if (parseInt(chainId) !== BSC_CHAIN_ID){
      dispatch({type: 'toast', payload: {msg: 'You should connect to BSC network' }})
      return null
    } 
    return chainId
  }

  const connectWallet = async () => {
    if(storage.getItem('isConnected') !== 'true') {
      return requestAccounts()
    }
  }

  const requestAccounts = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const account = (accounts[0]).toString()
      if (account) {
        storage.setItem('walletAddress', account)
        storage.setItem('isConnected', 'true')
        return account
      } 
    } catch(err) {
      if (err.code === 4001) {
        dispatch({type: 'toast', payload: {msg: 'Please connect to MetaMask' }})
      } else if (err.code === -32002){
        dispatch({type: 'toast', payload: {msg: 'Already trying to connect check your MetaMask' }})
      }
    }
    return false
  }

  const handleConnection = async (e) => {
    if (checkProvider() && await getChainId() && await connectWallet()) {
      handleAccountsChanged()
    } 
    setWalletAddress(storage.getItem('walletAddress'))
  }

  const handleAccountsChanged = () => {
    if (storage.getItem('isConnected') === 'true'){
      window.ethereum.on('accountsChanged', (accounts) => {
        const account = accounts[0]
        if (storage.getItem('walletAddress') !== account) {
          storage.setItem('walletAddress', account || '')
          storage.setItem('isConnected',  account ? 'true' : 'false')
          setWalletAddress(storage.getItem('walletAddress'))
        }
      } )
    }
  }

  useEffect(() => {
    setWalletAddress(storage.getItem('walletAddress'))
  }, [storage]);

  return <>
    <div className='my-button' onClick={()=>{handleConnection()}}>
      {(walletAddress && '0x'+ walletAddress.toUpperCase().slice(2,6) + '...' + walletAddress.toUpperCase().slice(-4) ) || "Connect Wallet"}
    </div>
  </> 
}

export default ConnectButton