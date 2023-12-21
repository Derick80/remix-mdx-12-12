import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import { getSiteMdxPage } from '~/server/mdx.server'

import { getMDXComponent } from 'mdx-bundler/client/index.js'


export async function loader ({ request }: LoaderFunctionArgs) {
    const about = 'about'
    const { code, frontmatter } = await getSiteMdxPage(about)


    return json({
        code,
        frontmatter,
    })
}

export default function About () {
    const { code } = useLoaderData<typeof loader>()
    const Component = React.useMemo(() => getMDXComponent(code), [code])

    return (
        <div>
            <h1>About</h1>
            <Component />
        </div>
    )
}