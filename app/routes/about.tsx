import { LoaderFunctionArgs, json } from '@remix-run/node'
import { getSiteMdxPage } from '~/server/mdx.server'



export async function loader ({ request }: LoaderFunctionArgs) {
    const about = 'about'
    const { code, frontmatter } = await getSiteMdxPage(about)

    console.log('code', code);

    return json({
        message: 'Hello world!',
        request,
    })
}