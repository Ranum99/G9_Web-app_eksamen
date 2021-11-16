import * as slotsRepository from '@/features/slots/slots.repository'
import { useCallback } from 'react'

export const checkIfExsist = async (id) => {
  const calander = await slotsRepository.exsist(id)

  // TODO: Bare returnere direkte?
  if (calander.success) {
    return calander
  } else {
    return calander
  }
}
