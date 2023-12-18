import { bundleMDX } from 'mdx-bundler'

export async function getSiteMdxPage(page: string) {
  const { code, frontmatter } = await bundleMDX({
    file: `${process.cwd()}/content/site/${page}.mdx`
  })
  return {
    code,
    frontmatter
  }
}
