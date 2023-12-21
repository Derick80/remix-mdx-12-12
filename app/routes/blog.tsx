import type { LoaderFunctionArgs } from '@remix-run/node'
import { json, } from '@remix-run/node';
export async function loader ({ request, params }: LoaderFunctionArgs) {


    return json()
}