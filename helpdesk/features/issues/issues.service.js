import * as issueRepo from './issues.repository'

export const create = async ({ title, description, creator, severity, department }) => {
  // Shall be no checks here to see if already in DB

  const createdIssue = await issueRepo.create({ title, description, creator, severity, department })

  // TODO: FEILER OVER

  if (!createdIssue.success) {
    return { success: false, error: createdIssue.error }
  }

  // Returning true and data from row
  return { success: true, data: createdIssue.data }
}

export const list = async () => {
  const issues = await issueRepo.findMany()

  if(!issues.success)
    return { success: false, error: issues.error }

  return { success: true, data: issues.data } 
}