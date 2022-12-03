import { notFound } from 'next/navigation'
import GoogleAnalytics from '../../../../components/google-analytics'
import {
  BlogPostLink,
  BlogTagLink,
} from '../../../../components/blog-parts'
import styles from '../../../../styles/blog.module.scss'
import {
  getPosts,
  getRankedPosts,
  getPostsByTag,
  getFirstPostByTag,
  getAllTags,
} from '../../../../lib/notion/client'
import PaginationTag from '../../../../components/pagination-tag'

export const revalidate = 60

export const dynamicParams = false

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map(tag => ({ tag: tag }))
}

const BlogTagPage = async ({ params: { tag: encodedTag } }) => {
  const tag = decodeURIComponent(encodedTag)

  const posts = await getPostsByTag(tag)

  if (posts.length === 0) {
    notFound()
  }

  const [rankedPosts, recentPosts, tags] = await Promise.all([
    getRankedPosts(),
    getPosts(5),
    getAllTags(),
  ])

  return (
    <>
      <GoogleAnalytics pageTitle={`Posts in ${tag}`} />
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <header>
            <h2>{tag}</h2>
          </header>

          <PaginationTag posts={posts} />
        </div>

        <div className={styles.subContent}>
          <BlogPostLink heading="Recommended" posts={rankedPosts} />
          <BlogPostLink heading="Latest Posts" posts={recentPosts} />
          <BlogTagLink heading="Categories" tags={tags} />
        </div>
      </div>
    </>
  )
}

export default BlogTagPage