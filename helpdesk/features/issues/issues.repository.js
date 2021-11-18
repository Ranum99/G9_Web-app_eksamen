import prisma from "@/lib/clients/db";

export const create = async (issueData) => {
  try {
    // Prøver å legge til issuen i db
    const newIssue = await prisma.issue.create({ data: issueData })

    return { success: true, data: newIssue }
  } catch (error) {
    return { success: false, error: 'En feil har oppstått' }
  }
}

export const findMany = async () => {
  try {
    // Prøver å hente alle issuene i db inkl. kommentarene og navnet på avdelingen
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
    // Prøver å hente ut ÈN issue med id x i db inkl. kommentarene og navnet på avdelingen
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

export const endIssue = async (id) => {
  try {
    // Prøver å oppdatere en rad i db med id x. Setter kolonnen idResolved i raden til true. Bruker include: comments og department for å sende tilbake all data i raden inkl. kommentarene og navnet på avdelingen
    const issue = await prisma.issue.update({
      where: {
        id: id
      },
      data: {
        isResolved: true,
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