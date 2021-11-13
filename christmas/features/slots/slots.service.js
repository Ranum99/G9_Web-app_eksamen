import * as slotsRepository from "@/features/slots/slots.repository"
import { useCallback } from "react";


export const checkIfExsist  = async (id) =>{

  const calander = await slotsRepository.exsist(id);

  if(calander?.error) return {success: false, error: calander.error}
  
  else 
  return false;
 

}