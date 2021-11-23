import * as calenderRepo from '@/features/calenders/calenders.repository'

export const checkIfExsist = async (req, res, name = '') => {
  if (name == '') {
    return {
      success: false,
      error: 'Name is missing',
    }
  }

  const calander = await calenderRepo.doeNotexsist(name)

  // TODO: Returnere direkte
  if (calander.success) {
    return calander
  } else {
    return calander
  }
}
