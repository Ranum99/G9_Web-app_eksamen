import * as userRepo from '@/features/users/users.repository'

export const getUsers = async () => {
  console.log('Er i service')

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
    console.log('Ingen brukere -.-')
    console.log(users.error)
    return users
  }
}
