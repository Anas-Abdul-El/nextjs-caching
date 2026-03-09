
import Link from 'next/link'
import ArrOfBooks from './ArrOfBooks';
import { Suspense } from 'react';



export default async function Home() {


    return (
        <main className='p-10'>
            <nav className="flex justify-between">
                <h1 className='font-bold'>Books on Redis!</h1>
                <Link href="/create" className="btn">Add a new book</Link>
            </nav>
            <p>List of books here.</p>

            <Suspense fallback={<p>Loading books...</p>}>
                <ArrOfBooks />
            </Suspense>
        </main>
    )
} 