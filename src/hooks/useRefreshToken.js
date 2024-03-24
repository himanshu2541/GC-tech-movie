import React from 'react'
import axios from '../api/axios'
import { useAuth } from './useAuth'

const useRefreshToken = () => {
  const {setAuth} = useAuth()

  const refresh = async () => {
    
  }
  return (
    <div>useRefreshToken</div>
  )
}

export default useRefreshToken