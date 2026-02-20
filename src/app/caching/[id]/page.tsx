import { cacheTag, revalidateTag } from 'next/cache'
import { Suspense } from 'react'

async function click() {
    "use server"
    revalidateTag("refresh", "max")
}

async function page({
    params,
}: {
    params: Promise<{ id: string }>
}) {


    return (
        <>
            <Suspense fallback="loading params...">
                <ParamsFitch params={params} />
            </Suspense>
            static
            <div>
                <Suspense fallback={"loading..."}>
                    <GetRandomData />
                </Suspense>
            </div>
            <button onClick={click}>refresh</button>
        </>
    )
}

export default page

async function GetRandomData() {
    "use cache"
    cacheTag("refresh")


    await new Promise(resolve => setTimeout(resolve, 1000))
    return <p>{Math.random()}</p>
}

async function ParamsFitch({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params
    return <p>{id}</p>

}