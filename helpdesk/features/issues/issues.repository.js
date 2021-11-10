import prisma from "@/lib/clients/db";

export const create = async (issueData) => {
  try {
    const newIssue = await prisma.issue.create({ data: issueData })

    return { success: true, data: newIssue }
  } catch (error) {

    console.log(error);
    return { success: false, error: 'En feil har oppstått' }
  }
}

export const findMany = async () => {
  try {
    const issues = await prisma.issue.findMany({
      include: {
        comments: true,
        department: true
      }
    })

    return { success: true, data: issues }
  } catch(error) {
    return { success: false, error: 'En feil har oppstått' }
  }
}

export const findOne = async ( id ) => {
  try {
    const issue = await prisma.issue.findUnique({
      where: {
        id: id
      },
      include: {
        comments: true,
        department: true
      }
    })

    return { success: true, data: issue }
  } catch(error) {
    return { success: false, error: 'En feil har oppstått' }
  }
}