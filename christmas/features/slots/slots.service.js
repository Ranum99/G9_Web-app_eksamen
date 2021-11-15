import * as slotsRepository from '@/features/slots/slots.repository'
import { useCallback } from 'react'

export const checkIfExsist = async (id) => {
  const calander = await slotsRepository.exsist(id)
  //if it doesnt exsist it returns false
  if (calander.success) {
    return calander
  }
  //if it does exsist  return true
  else {
    console.log('errro')
    return calander
  }
}
