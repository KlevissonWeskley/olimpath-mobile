import { useContext } from 'react'
import { RegisterContext } from '../context/RegisterContext'

export function useRegister() {
  const context = useContext(RegisterContext)
  
  return context
}