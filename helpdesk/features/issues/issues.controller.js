import * as issuesService from '@/features/issues/issues.service'

import { validate } from '@/lib/validation'

export const createIssue = async (req, res) => {
  const { title, description, creator, severity, department_id } = req.body

  const titleCheck = validate.title(title)
  const descriptionCheck = validate.descriptionAndComment(description)
  const creatorCheck = validate.name(creator)

  if(!titleCheck.success || !descriptionCheck.success || !creatorCheck.success) {
    // Returning {success: false, error: "[ERROR MESSAGE]"}
    return res.status(400).json({success: false, error: 'Fyll ut riktig'})
  }

  const createdIssue = await issuesService.create({
    title, description, creator, severity, department_id
  })

  // If anything happens on server-side
  if(!createdIssue?.success) {
    return res.status(500).json({success: false, error: createdIssue.error})
  }

  // Returning 201 (Created)
  return res.status(201).json({success: true, data: createdIssue.data})
}

// Will list all issues
export const listIssues = async (req, res) => {
  const issues = await issuesService.list()

  if(!issues.success)
    return res.status(500).json({ success: false, error: issues.error })

  return res.status(200).json({ success: true, data: issues.data })
}

// Will list one issue with id X
export const listIssue = async (req, res) => {
  const { id } = req.query;

  const issue = await issuesService.listOne(id);

  if(!issue.success)
    return res.status(500).json({ success: false, error: issue.data })

  return res.status(200).json({ success: true, data: issue.data })
}

export const endIssue = async (req, res) => {
  const { id } = req.query;

  const issue = await issuesService.endIssue(id);

  if(!issue.success)
    return res.status(500).json({ success: false, error: issue.data })

  return res.status(200).json({ success: true, data: issue.data })
} 