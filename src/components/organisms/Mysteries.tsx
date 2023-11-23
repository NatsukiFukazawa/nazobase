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
    <div>
      {mysteries.map((mystery) => (
        <div key={mystery.id}>
          {/* <Image src={mystery.imageUrl} alt={mystery.title} width={300} height={200} /> Update image tag to use next/image */}
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