import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Dummydata
const games = [
  {combination: "red blue green yellow", user: "anders", numberOfTries: 2, foundCombination: true},
  {combination: "blue green red yellow", user: "jonathan", numberOfTries: 4, foundCombination: false},
  {combination: "red yellow green blue", user: "martina", numberOfTries: 7, foundCombination: true},
  {combination: "red blue yellow green", user: "aleksander", numberOfTries: 1, foundCombination: false}
]

const createGames = async () => {
  await Promise.all(
    games.map(async (game) => {
      await prisma.game.create({
        data: {
          ...game,
        },
      })
    })
  )
}

async function main() {
  console.log('Start seeding ...')
  // Kalle på seed funksjoner
  
  await prisma.game.deleteMany({})

  await createGames()
  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
