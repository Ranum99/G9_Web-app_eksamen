import { Result } from '@/lib/api/result'

import * as userSlotRepository from '@/features/userSlot/userSlot.repository'
import { UserSlotErrors } from './userSlot.error'

import * as slotRepo from '@/features/slots/slots.repository'
import * as usersRepo from '@/features/users/users.repository'
/*
export const getUserSlot = async (slotId, userId) => {
  // Sjekker om bruker allerede har fått kode
  const userSlot = await userSlotRepository.exist(slotId, userId)

  if (!userSlot?.success) {
    return Result.failure(userSlot.error)
  }

  if (userSlot.data) {
    return Result.failure(UserSlotErrors(slotId, userId))
  }

  const createdUserSlot = await userSlotRepository.create(slotId, userId)

  if (!createdUserSlot.success) {
    Result.failure(createdUserSlot.error)
  }
  return Result.success(createdUserSlot.data)
}
*/
export const getUserSlot = async (slotId, userId) => {
  // Sjekker om data allerede finnes
  // TODO: Legge til disse i repo filene

  // Kommentert ut da dette er metoder som ikke finnes :/
  const slot = await slotRepo.exsistSingleSlot(slotId)
  const user = await usersRepo.exist(userId)

  // Feilhåndtering, sjekker DB feil og så om data allerede finnes
  if (!slot.success) {
    return {
      success: false,
      type: slot.type,
      error: slot.error,
    }
  }
  if (!slot.data) {
    return {
      success: false,
      type: slot.type,
    }
  }

  if (!user.success) {
    return {
      success: false,
      type: user.type,
      error: user.error,
    }
  }
  if (!user.data) {
    return {
      success: false,
      type: user.type,
      error: `Bruker med ID ${userId} finnes ikke`,
    }
  }

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

  const createdUserSlot = await userSlotRepository.create(slotId, userId)

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

export const clear = async () => {
  const response = await userSlotRepository.clear()

  if (!response.success) {
    return response
  } else {
    return Result.success("Fjernet alle slots")
  }
}