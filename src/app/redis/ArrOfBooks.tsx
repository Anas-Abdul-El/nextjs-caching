
import { client } from '@/lib/db'

const getBooks = async () => {
    const res = await client.zRangeWithScores('books', 0, -1);

    const books = Promise.all(res.map((b) => {
        return client.hGetAll(`books:${b.score}`)
    }))

    return books
}

async function ArrOfBooks() {

    const books = await getBooks()

    return (

        books.map((book, key) => (
            <div key={key} className="p-4 border rounded mt-5">
                <h2 className='font-bold text-lg'>{book.title}</h2>
                <p className='text-gray-200'>Author: {book.author}</p>
                <p className='text-gray-200'>Rating: {book.rating}</p>
                <p className='text-gray-200'>{book.blurb}</p>
            </div>
        ))

    )
}

export default ArrOfBooks