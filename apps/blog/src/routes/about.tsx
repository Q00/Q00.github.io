import { createFileRoute } from '@tanstack/react-router'
import { createContentProvider } from '@q00-blog/shared'
import { ENV } from '@/config/env'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  const [aboutContent, setAboutContent] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAboutInfo() {
      try {
        const contentProvider = createContentProvider({
          publicationId: ENV.HASHNODE_PUBLICATION_ID,
          apiToken: ENV.HASHNODE_API_TOKEN
        })
        const metadata = await contentProvider.getMetadata()

        setAboutContent(metadata.siteDescription)
      } catch (error) {
        console.error('Failed to load about info from Hashnode:', error)
        setAboutContent(ENV.SITE_DESCRIPTION)
      } finally {
        setLoading(false)
      }
    }

    loadAboutInfo()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-1/2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-2/3"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            About
          </h1>
        </header>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {aboutContent}
          </p>

          <h2>Contact</h2>
          <p>
            You can reach out via <a href={`mailto:${ENV.AUTHOR_EMAIL}`}>email</a> or
            check out the source code on <a href={`https://github.com/${ENV.GITHUB_REPO}`} target="_blank" rel="noopener noreferrer">GitHub</a>.
          </p>

          <p>
            Visit the HashNode version at <a href="https://q00.hashnode.dev" target="_blank" rel="noopener noreferrer">q00.hashnode.dev</a>.
          </p>
        </div>
      </div>
    </div>
  )
}