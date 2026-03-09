import {
    cacheTag,
    revalidateTag
} from 'next/cache'
import { Suspense } from 'react'

const click = async () => {
    "use server"
    revalidateTag("refresh", "")
}

const GetRandomData = async () => {
    "use cache"
    cacheTag("refresh")


    await new Promise(resolve => setTimeout(resolve, 1000))
    return <p>{Math.random()}</p>
}

const ParamsFitch = async ({
    params
}: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params
    return <p>{id}</p>
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

            <p>static</p>

            <Suspense fallback={"loading..."}>
                <GetRandomData />
            </Suspense>

            <button onClick={click}>refresh</button>
        </>
    )
}

export default page

