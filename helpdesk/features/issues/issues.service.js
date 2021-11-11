import * as issueRepo from './issues.repository'

export const create = async ({ title, description, creator, severity, department_id }) => {
  // Shall be no checks here to see if already in DB

  const createdIssue = await issueRepo.create({ title, description, creator, severity, department_id })

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

export const listOne = async ( id ) => {
  const issue = await issueRepo.findOne(id);

  if(!issue.success)
    return { success: false, error: issue.error }

  return { success: true, data: issue.data } 
}