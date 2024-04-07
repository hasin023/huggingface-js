'use client'
import Link from 'next/link'

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      <ul className='flex flex-col gap-3'>
        <Link href='/sentiment' className='bg-pink-700 px-3 py-2 rounded-md text-white hover:bg-pink-600 text-center'>
          <li>Sentiment Analysis</li>
        </Link>
        <Link href='translator' className='bg-pink-700 px-3 py-2 rounded-md text-white hover:bg-pink-600 text-center'>
          <li>Text Translation</li>
        </Link>
      </ul>
    </main>
  )
}