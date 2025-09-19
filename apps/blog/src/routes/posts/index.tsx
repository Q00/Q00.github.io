import { createFileRoute } from '@tanstack/react-router'
import { useBlog } from '@/contexts/BlogContext'
import { PostList } from '@/components/blog/PostList'
import { ENV } from '@/config/env'
import { useState } from 'react'

export const Route = createFileRoute('/posts/')({
  component: PostsPage,
})

function PostsPage() {
  const { posts, isLoading, error } = useBlog()
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'recent' | 'popular'>('all')
  const [selectedLanguage, setSelectedLanguage] = useState<'all' | 'ko' | 'en'>('all')

  const filteredPosts = posts.filter(post => {
    // First apply content filter
    let passesContentFilter = true
    switch (selectedFilter) {
      case 'recent': {
        const oneMonthAgo = new Date()
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
        const postDate = post.publishedAt instanceof Date ? post.publishedAt : new Date(post.publishedAt)
        passesContentFilter = postDate >= oneMonthAgo
        break
      }
      case 'popular':
        passesContentFilter = typeof post.views === 'number' && post.views > 100
        break
    }

    // Then apply language filter
    let passesLanguageFilter = true
    if (selectedLanguage !== 'all') {
      passesLanguageFilter = post.tags.includes(selectedLanguage)
    }

    return passesContentFilter && passesLanguageFilter
  })

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Posts</h1>
          <p className="text-stone-600 dark:text-stone-300">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-3xl font-bold text-stone-900 dark:text-white">
            All Posts
          </h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              {(['all', 'recent', 'popular'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-2 py-1 rounded transition-colors ${
                    selectedFilter === filter
                      ? 'text-stone-900 dark:text-white bg-stone-100 dark:bg-stone-800'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                  }`}
                >
                  [{filter}]
                </button>
              ))}
            </div>
            <div className="w-px h-4 bg-stone-300 dark:bg-stone-600"></div>
            <div className="flex items-center gap-2">
              {(['all', 'ko', 'en'] as const).map((language) => (
                <button
                  key={language}
                  onClick={() => setSelectedLanguage(language)}
                  className={`px-2 py-1 rounded transition-colors ${
                    selectedLanguage === language
                      ? 'text-stone-900 dark:text-white bg-stone-100 dark:bg-stone-800'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                  }`}
                >
                  [{language === 'all' ? 'all' : language.toUpperCase()}]
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="text-stone-600 dark:text-stone-300">
          {filteredPosts.length} posts found
          {selectedFilter !== 'all' && ` • ${selectedFilter}`}
          {selectedLanguage !== 'all' && ` • ${selectedLanguage.toUpperCase()}`}
        </p>
      </header>

      <PostList
        posts={filteredPosts}
        isLoading={isLoading}
        postsPerPage={ENV.POSTS_PER_PAGE}
        showFeatured={false}
      />
    </div>
  )
}