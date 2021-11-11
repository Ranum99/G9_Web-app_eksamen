import prisma from "@/lib/clients/db";

export const create = async ( comment, issue_id, created_at ) => {
  try {
    const newComment = await prisma.comment.create({ data: {comment, issue_id, created_at} })

    return { success: true, data: newComment }
  } catch(error) {
    console.log(error);
    return { success: false, error: 'En feil har oppstått' }
  }
}