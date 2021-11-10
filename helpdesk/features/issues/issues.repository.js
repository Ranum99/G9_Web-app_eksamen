import prisma from "@/lib/clients/db";

export const create = async (issueData) => {
  try {
    const newIssue = await prisma.issue.create({ issueData })

    // TODO: FEILER OVER

    return { success: true, data: newIssue }
  } catch (error) {
    return { success: false, error: 'En feil har oppstått' }
  }
}

export const findMany = async () => {
  try {
    const issues = await prisma.issue.findMany()

    return { success: true, data: issues }
  } catch(error) {
    return { success: false, error: 'En feil har oppstått' }
  }
}