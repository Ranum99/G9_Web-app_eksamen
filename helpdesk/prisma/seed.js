import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Dummydata
const departments = [
  {name: "IT", created_at: new Date('2021-11-09')},
  {name: "Design", created_at: new Date('2021-11-09')},
  {name: "Salg", created_at: new Date('2021-11-09')}
]

const issues = [
  {isResolved: false, title: "Dette er en veldig fin tittel (SALG 1)", description: "En beskrivelse", creator: "Aleksander Ranum", severity: 1, created_at: new Date('2021-11-09')},
  {isResolved: false, title: "Dette er en veldig fin tittel (SALG 2)", description: "En beskrivelse", creator: "Aleksander Ranum", severity: 1, created_at: new Date('2021-11-09')},
  {isResolved: false, title: "Dette er en veldig fin tittel (IT 1)", description: "En beskrivelse", creator: "Aleksander Ranum", severity: 1, created_at: new Date('2021-11-09')},
]

const comments = [
  {comment: "En kommentar til SALG(1) - 1", created_at: new Date('2021-11-09')},
  {comment: "En kommentar til SALG(2) - 1", created_at: new Date('2021-11-09')},
  {comment: "En kommentar til IT(1) - 1", created_at: new Date('2021-11-09')}
]

const createDepartments = async () => {
  await Promise.all(
    departments.map(async (department) => {
      await prisma.department.create({
        data: {
          ...department,
        },
      })
    })
  )
}

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

const createIssues = async () => {
  const issuesPromises = issues.map(async (issue) => {
    await prisma.issue.create({
      data: {
        ...issue,
      },
    })
  })

    // [ Promise { <pending> }, Promise { <pending> } ]
  console.log(issuesPromises) 
  await Promise.all(issuesPromises)
}

const createComments = async () => {
  const commentsPromises = comments.map(async (comment) => {
    await prisma.comment.create({
      data: {
        ...comment,
      },
    })
  })

    // [ Promise { <pending> }, Promise { <pending> } ]
  console.log(commentsPromises) 
  await Promise.all(commentsPromises)
}

async function main() {
  console.log('Start seeding ...')
  // Kalle på seed funksjoner

  await prisma.department.deleteMany({})
  await prisma.issue.deleteMany({})
  await prisma.comment.deleteMany({})


  //await createDepartments();
  //await createIssues();
  //await createComments();
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
