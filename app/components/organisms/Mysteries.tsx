'use client'
import Image from 'next/image';

export interface Mystery {
  id: number;
  imageUrl: string;
  title: string;
  difficulty: number;
  explanation: string;
  tags: Tag[];
}
interface Tag {
  id: number;
  name: string;
}

export interface MysteriesProps {
  mysteries: Mystery[];
}

function Mysteries({ mysteries }: MysteriesProps) {
  return (
    <div className='w-full flex gap-4'>
      {mysteries.map((mystery) => (
        <div key={mystery.id} className='w-36'>
          <Image priority={false} src={mystery.imageUrl} alt={mystery.title} width={300} height={200} /> 
          <h3>{mystery.title}</h3>
          <p>難易度: {mystery.difficulty}</p>
          <p>解説: {mystery.explanation}</p>
          <p>タグ: {mystery.tags.map(tag=>tag.name).join(', ')}</p>
        </div>
      ))}
    </div>
  );
}

export default Mysteries;