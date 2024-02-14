export interface Mystery {
  id: number;
  imageUrl: string;
  title: string;
  difficulty: number;
  answer: string;
  explanation: string;
  tags: Tag[];
}
interface Tag {
  id: number;
  name: string;
  color: string;
}