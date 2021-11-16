import * as userRepo from '@/features/users/users.repository'

export const getUsers = async () => {
  const users = await userRepo.getUsers()

  if (users.success) {
    if (users.data == 0) {
      return {
        success: false,
        error: 'Fant ingen brukere',
      }
    }
    return users
  } else {
    return users
  }
}
