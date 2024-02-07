'use client'

import Image from 'next/image'
import NazoFrom from '../NazoForm'
import Link from "next/link";
import { UserButton, redirectToSignIn } from '@clerk/nextjs';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';

export default function Home() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <div>
      <div className='flex gap-1'>
        <UserButton
          afterSignOutUrl='/'
        />
        <ActionIcon
          variant='outline'
          color={dark ? 'yellow' : 'blue'}
          onClick={() => toggleColorScheme()}
          title='Toggle color scheme'
        />
      </div>
      <div><NazoFrom /></div>
    </div>
  )
}
