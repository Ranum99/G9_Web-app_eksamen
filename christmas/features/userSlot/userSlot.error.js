export const UserSlotErrors = {
  exist(identifier, identifier2) {
    return {
      type: 'UserSlot.Exist',
      message: `UserSlot with ${identifier}  and  ${identifier2}  already exist`,
    }
  },
}