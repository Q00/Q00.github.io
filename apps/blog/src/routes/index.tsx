import { createFileRoute, Link } from '@tanstack/react-router'
import { ENV } from '@/config/env'
import { useBlog } from '@/contexts/BlogContext'
import { PostListItem } from '@/components/blog/PostListItem'
import { SeriesListItem } from '@/components/blog/SeriesListItem'
import { LoadingSpinner } from '@q00-blog/ui'

export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({
    meta: [
      {
        title: `${ENV.SITE_TITLE} - ${ENV.SITE_DESCRIPTION}`,
      },
      {
        name: 'description',
        content: ENV.SITE_DESCRIPTION,
      },
    ],
    links: [
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: `${ENV.SITE_TITLE} RSS Feed`,
        href: '/rss/xml',
      },
      {
        rel: 'alternate',
        type: 'application/atom+xml',
        title: `${ENV.SITE_TITLE} Atom Feed`,
        href: '/atom/xml',
      },
    ],
  }),
})

function Home() {
  const { posts, series, isLoading, error } = useBlog()

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Posts</h1>
          <p className="text-gray-600 dark:text-gray-300">{error}</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  const recentPosts = posts.slice(0, 3)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Recent Posts Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-stone-900 dark:text-white mb-4 tracking-tight">
              Recent Posts
            </h2>
            <p className="text-stone-600 dark:text-stone-300">
              Latest articles and insights
            </p>
          </div>
          <Link
            to="/posts"
            className="inline-flex items-center px-6 py-3 text-sm font-semibold text-stone-700 dark:text-stone-300
                       bg-stone-100 dark:bg-stone-800 rounded-xl transition-all duration-300
                       border border-stone-200 dark:border-stone-700"
          >
            View all posts
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {recentPosts.length > 0 ? (
          <div className="max-w-4xl">
            {recentPosts.map((post) => (
              <PostListItem
                key={post.slug}
                post={post}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-stone-500 dark:text-stone-400">No posts found.</p>
          </div>
        )}
      </section>

      {/* Divider */}
      {series.length > 0 && (
        <div className="mb-16">
          <div className="w-full max-w-sm h-px bg-stone-200 dark:bg-stone-700"></div>
        </div>
      )}

      {/* Series Section */}
      {series.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-stone-900 dark:text-white mb-4 tracking-tight">Series</h2>
          </div>

          <div className="max-w-4xl">
            {series.map((seriesItem) => (
              <SeriesListItem
                key={seriesItem.id}
                series={seriesItem}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}