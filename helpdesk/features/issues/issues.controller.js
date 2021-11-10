import * as issuesService from '@/features/issues/issues.service'

const inputCheck = (title, description, creator) => {
  // Checking if title's length is between 25 and 150 char
  const titleRegex = new RegExp('^[a-zA-Z0-9\\s_-]{25,150}$')
  if (!titleRegex.test(title)) {
    return {success: false, error: 'Tittelen må bestå av mellom 25 og 150 bokstaver'}
  }

  // Checking if description length is less than 250 char
  const descriptionRegex = new RegExp('^[a-z0-9_-]{0,250}$')
  if (!descriptionRegex.test(description)) {
    return {success: false, error: 'Beskrivelsen kan ikke være lengre enn 250 bokstaver'}
  }

  // Checking if name have at least one space and big char in first- and last name
  const creatorRegex = new RegExp(
    '^[A-Z]{1,1}[a-zA-Z]{1,}\\s[A-Z]{1,1}[a-zA-Z]{1,}$'
  )
  if (!creatorRegex.test(creator)) {
    return {success: false, error: 'Navn skal bestå av ett fornavn og ett etternavn med store forbokstaver'}
  }

  return {success: true}
}

export const createIssue = async (req, res) => {
  const { title, description, creator, severity, department } = req.body

  const inputIsValid = inputCheck();

  if(!inputIsValid) {
    // Returning {success: false, error: "[ERROR MESSAGE]"}
    return res.status(400).json({success: false, error: inputIsValid.error})
  }

  const createdIssue = await issuesService.create({
    title, description, creator, severity, department
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