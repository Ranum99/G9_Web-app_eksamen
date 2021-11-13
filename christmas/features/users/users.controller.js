import prisma from "@/lib/clients/db"

export const getUsers = async (req, res) =>{
 users =  await prisma.user.findMany()

 //returns not found
 if(user.error) return res.status(404).json;

 elser 
 return res.status(200).json ({succsess: true, users})
  
}
