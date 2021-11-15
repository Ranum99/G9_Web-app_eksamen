import * as calenderRepo from '@/features/calenders/calenders.repository'
import { useCallback } from 'react'

export const checkIfExsist = async (req, res, name = '') => {
  console.log('check if exsist')

  if (name == '') {
    return {
      success: false,
      error: 'Name is missing',
    }
  }

  const calander = await calenderRepo.doeNotexsist(name)

  console.log('calanasdf sadfder')

  if (calander.success) {
    console.log('true')
    return calander
  } else {
    console.log('false')
    return calander
  }
}
