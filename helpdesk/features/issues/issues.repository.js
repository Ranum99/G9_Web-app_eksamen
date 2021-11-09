import prisma from "@/lib/clients/db";

export const create = async (issueData) => {
  try {
    const newIssue = await prisma.issue.create({ issueData })

    return { success: true, data: newIssue }
  } catch (error) {
    return { success: false, error: 'En feil har oppstått' }
  }
}