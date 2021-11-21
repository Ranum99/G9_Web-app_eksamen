// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getUserFromCookie } from '@/lib/utils/api'
const colors = [
  'red',
  'green',
  'blue',
  'yellow',
  'orange',
  'pink',
  'cyan',
  'gray',
]

export default async function handler(req, res) {
  // Funksjon brukt for å hente ut hvem som prøver applikasjone
  // Du kan kopiere denne linjen til dere du måtte trenge den
  // Trenger den for å knytte brukeren som spiller til spillet
  const user = await getUserFromCookie(req)

  if (user) {
    console.log(user)
  }
  const { method } = req

  switch(method?.toLowerCase()) {
    case 'get':
      const randomCombination = makeRandomCombination()
      res.status(200).json({ combination: randomCombination })
      break;
    default: 
      res.status(405).end();
  }
}

const makeRandomCombination = () => {
  // Siden en Set kun kan inneholde en av hver verdi brukes denne
  let randomCombination = new Set()

  // Stopper når det er fire forskjellige farget i Set
  while (randomCombination.size !== 4) {
    randomCombination.add(colors[Math.floor(Math.random()*colors.length)])
  }
  
  // Returnerer som en vanlig array
  return Array.from(randomCombination)
}
