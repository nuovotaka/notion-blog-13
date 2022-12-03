import { NUMBER_OF_POSTS_PER_PAGE } from '../server-constants'
import GoogleAnalytics from '../../components/google-analytics'
import {
  BlogPostLink,
  BlogTagLink,
  NoContents,
} from '../../components/blog-parts'
import styles from '../../styles/blog.module.scss'
import {
  getPosts,
  getRankedPosts,
  getAllTags,
  getAllPosts,
} from '../../lib/notion/client'
import PaginationPosts from '../../components/pagination-posts'

export const revalidate = 60

const BlogPage = async () => {
  const [posts, rankedPosts, tags, allposts] = await Promise.all([
    getPosts(NUMBER_OF_POSTS_PER_PAGE),
    getRankedPosts(),
    getAllTags(),
    getAllPosts(),
  ])

  return (
    <>
      <GoogleAnalytics pageTitle="Blog" />
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <NoContents contents={posts} />

          <PaginationPosts allposts={allposts} perpage={NUMBER_OF_POSTS_PER_PAGE} />
        </div>

        <div className={styles.subContent}>
          <BlogPostLink heading="Recommended" posts={rankedPosts} />
          <BlogTagLink heading="Categories" tags={tags} />
        </div>
      </div>
    </>
  )
}

export default BlogPage