import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { twMerge } from "tailwind-merge";

export const delay = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms));

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatFullDateBR = (date: string) => format(new Date(date), "dd 'de' MMMM 'de' yyyy 'às' HH':'mm", { locale: ptBR });