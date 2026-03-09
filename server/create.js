'use server'

import { client } from "@/lib/db"
import { redirect } from 'next/navigation'

export async function createBook(formData) {
    const { title, rating, author, blurb } = Object.fromEntries(formData)

    // create book id using crypto module
    const id = Math.floor(Math.random() * 1000000)

    // add the book to sorted set
    const unique = await client.zAdd('books', {
        value: title,
        score: id,
    }, { NX: true })

    if (!unique) {
        return { error: 'This book is already exists' }
    }

    // store the book in redis as a hash
    await client.hSet(`books:${id}`, {
        title,
        rating,
        author,
        blurb
    })

    redirect('/redis')
}