import * as calenderRepo from "@/features/calenders/calenders.repository"
import { useCallback } from "react";


export const checkIfExsist  = async (name) =>{

  const calander = await calenderRepo.exsist(name);

  if(calander?.error) return {success: false, error: calander.error}
  
  else 
  return false;
}
