import { Categories } from "../types/categories";
import { nominees } from "./nominees";

export const categories: Categories = [
  {
    name: "Showman do ano",
    id: "showman-do-ano",
    description: "Quem mais gerou entretenimento pro grupo",
    nominees: nominees.friends,
  },
  {
    name: "Jogador Revelação",
    id: "jogador-revelacao",
    description: "Aquele amigo que não prometia nada e entregou tudo",
    nominees: nominees.friends,
  },
];
