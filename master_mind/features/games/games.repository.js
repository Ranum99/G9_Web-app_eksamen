import prisma from "@/lib/clients/db";

export const create = async (gameData) => {
  try {
    const savedGame = await prisma.game.create({ data: gameData })

    return { success: true, data: savedGame }
  } catch (error) {
    return { success: false, error: 'En feil har oppstått' }
  }
}