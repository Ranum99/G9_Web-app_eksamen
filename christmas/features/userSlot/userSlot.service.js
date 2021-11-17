import * as usersRepo from '@/features/users/users.repository'
import * as slotRepo from '@/features/slots/slots.repository'

import * as userSlotRepository from '@/features/userSlot/userSlot.repository'

export const getUserSlot = async (slotId, userId) => {
  // Sjekker om data allerede finnes
  // TODO: Legge til disse i repo filene
  /*
	// Kommentert ut da dette er metoder som ikke finnes :/
	const slot = await slotRepo.exist(slotId)
  const user = await usersRepo.exsts(userId)

  // Feilhåndtering, sjekker DB feil og så om data allerede finnes
  if (!slot.success) {
    return {
      success: false,
      error: slot.error,
    }
  }
  if (!slot.data) {
    return {
      success: false,
      type: 'Slot.NotExist',
    }
  }

  if (!user.success) {
    return {
      success: false,
      error: user.error,
    }
  }
  if (!user.data) {
    return {
      success: false,
      type: 'User.NotExist',
      error: `Bruker med ID ${userId} finnes ikke`,
    }
  }
	*/

  // Sjekker om bruker allerede har fått kode
  const userSlot = await userSlotRepository.exist(slotId, userId)

  if (!userSlot.success) {
    return {
      success: false,
      error: userSlot.error,
    }
  }

  if (userSlot?.data) {
    return {
      success: true,
      type: 'UserSlot.Exist',
      data: userSlot.data,
    }
  }

  const createdUserSlot = await userSlotRepository.createrUserSlot()

  if (!createdUserSlot.success) {
    return {
      success: false,
      error: createdUserSlot.error,
    }
  }

  return {
    success: true,
    data: createdUserSlot.data,
  }
}
