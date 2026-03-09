'use client'
import { createBook } from "../../../server/create"
import { useState } from "react"

export default function Create() {

    const [error, setError] = useState('')

    async function handleSubmit(formData) {
        const result = await createBook(formData)

        if (result?.error) {
            setError(result.error)
        }

    }

    return (
        <main className="p-10 flex items-center justify-center h-screen">
            <form action={handleSubmit} className="w-200 h-120  bg-blue-500 flex flex-col gap-4 p-10 rounded-2xl">
                <h2>Add a New Book</h2>
                <input className="border-white border p-2 rounded-2xl" type="text" name="title" placeholder="title" />
                <input className="border-white border p-2 rounded-2xl" type="text" name="author" placeholder="author" />
                <input className="border-white border p-2 rounded-2xl" type="number" name="rating" max={10} min={1} placeholder="rating" />
                <textarea className="border-white border p-2 rounded-2xl" name="blurb" placeholder="blurb..."></textarea>
                <button type="submit" className="btn">Add Book</button>
                {error && <div className="error">{error}</div>}
            </form>
        </main >
    )
}