import * as issueRepo from './issues.repository'

export const create = async ({ title, description, creator, severity, department_id }) => {
  // Sender data videre til repo for sjekk
  const createdIssue = await issueRepo.create({ title, description, creator, severity, department_id })

  // Dersom det oppsår en feil blir det sendt en error med feilmelding
  if (!createdIssue.success) {
    return { success: false, error: createdIssue.error }
  }

  // Returning true and data from row
  return { success: true, data: createdIssue.data }
}

export const list = async () => {
  // Sender data videre til repo for sjekk
  const issues = await issueRepo.findMany()

  // Dersom det oppsår en feil blir det sendt en error med feilmelding
  if(!issues.success)
    return { success: false, error: issues.error }

  return { success: true, data: issues.data } 
}

export const listOne = async ( id ) => {
  // Sender data videre til repo for sjekk
  const issue = await issueRepo.findOne(id);

  // Dersom det oppsår en feil blir det sendt en error med feilmelding
  if(!issue.success)
    return { success: false, error: issue.error }

  return { success: true, data: issue.data } 
}

export const endIssue = async ( id ) => {
  // Sender data videre til repo for sjekk
  const issue = await issueRepo.endIssue(id)

  // Dersom det oppsår en feil blir det sendt en error med feilmelding
  if(!issue.success)
    return { success: false, error: issue.error }

  return { success: true, data: issue.data } 
}