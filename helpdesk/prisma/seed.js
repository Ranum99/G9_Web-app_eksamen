import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Dummydata
const departments = [
  {id: "it", name: "IT"},
  {id: "design", name: "Design"},
  {id: "salg", name: "Salg"}
]

const issues = [
  {isResolved: true, title: "Dette er en veldig fin tittel (SALG 1)", description: "En beskrivelse", creator: "Aleksander Ranum", severity: 1},
  {isResolved: false, title: "Dette er en veldig fin tittel (SALG 2)", description: "En beskrivelse", creator: "Aleksander Ranum", severity: 1},
  {isResolved: false, title: "Dette er en veldig fin tittel (IT 1)", description: "En beskrivelse", creator: "Aleksander Ranum", severity: 1},
]

const comments = [
  {comment: "En kommentar til SALG(1) - 1"},
  {comment: "En kommentar til SALG(2) - 1"},
  {comment: "En kommentar til IT(1) - 1"}
]

const createDepartmentsWithIssues = async () => {
  await Promise.all(
    departments.map(async (department, index) => {
      await prisma.department.create({
        data: {
          ...department,
          issues: {
            create: {
              ...issues[index],
              comments: {
                create: {
                  ...comments[index],
                },
              },
            },
          },
        },
      })
    })
  )
}

async function main() {
  console.log('Start seeding ...')
  // Kalle på seed funksjoner

  await prisma.comment.deleteMany({})
  await prisma.issue.deleteMany({})
  await prisma.department.deleteMany({})

  await createDepartmentsWithIssues()
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
