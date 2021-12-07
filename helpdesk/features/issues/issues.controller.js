import * as issuesService from '@/features/issues/issues.service'

import { validate } from '@/lib/validation'

export const createIssue = async (req, res) => {
  const { title, description, creator, severity, department_id } = req.body

  // Gjør en sjekk på input backend
  const titleCheck = validate.title(title) 
  const descriptionCheck = validate.descriptionAndComment(description, 'description')
  const creatorCheck = validate.name(creator)

  if(!titleCheck.success || !descriptionCheck.success || !creatorCheck.success) {
    return res.status(400).json({success: false, error: 'Fyll ut riktig'})
  }

  // Sender data videre til service for sjekk
  const createdIssue = await issuesService.create({
    title, description, creator, severity, department_id
  })

  // Dersom noe skulle skje serverside
  if(!createdIssue?.success) {
    return res.status(500).json({success: false, error: createdIssue.error})
  }

  // Returnerer 201 (Created)
  return res.status(201).json({success: true, data: createdIssue.data})
}

// Vil liste ut ALLE issues i en liste (json)
export const listIssues = async (req, res) => {
  // Sender data videre til service for sjekk
  const issues = await issuesService.list()

  // Dersom noe skulle skje serverside
  if(!issues.success)
    return res.status(500).json({ success: false, error: issues.error })

  return res.status(200).json({ success: true, data: issues.data })
}

// Vil liste ut ÈN issue med id x
export const listIssue = async (req, res) => {
  const { id } = req.query; // id til issue

  // Sender data videre til service for sjekk
  const issue = await issuesService.listOne(id);

  // Dersom noe skulle skje serverside
  if(!issue.success)
    return res.status(500).json({ success: false, error: issue.data })

  return res.status(200).json({ success: true, data: issue.data })
}

export const endIssue = async (req, res) => {
  const { id } = req.query;

  // Sender data videre til service for sjekk
  const issue = await issuesService.endIssue(id);

  // Dersom noe skulle skje serverside
  if(!issue.success)
    return res.status(500).json({ success: false, error: issue.data })

  return res.status(200).json({ success: true, data: issue.data })
} 