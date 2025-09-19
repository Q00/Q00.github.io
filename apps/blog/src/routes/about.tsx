import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer'
import { useBlog } from '@/contexts/BlogContext'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

interface DraftData {
  id: string
  slug: string
  title: string
  subtitle?: string
  content: {
    markdown: string
  }
}

function AboutPage() {
  const { getDraft } = useBlog()
  const [draftData, setDraftData] = useState<DraftData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadAboutInfo() {
      try {
        const draft = await getDraft("68cad4ed389de124b4d12913")

        if (draft) {
          setDraftData(draft)
        } else {
          throw new Error('No draft data found')
        }
      } catch (error) {
        console.error('Failed to load about info from Hashnode:', error)
        setError(error instanceof Error ? error.message : 'Failed to load content')
      } finally {
        setLoading(false)
      }
    }

    loadAboutInfo()
  }, [getDraft])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-stone-200 dark:bg-stone-700 rounded mb-4 w-1/4"></div>
            <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded mb-2 w-1/2"></div>
            <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded mb-2 w-2/3"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading About Page</h1>
            <p className="text-stone-600 dark:text-stone-300">{error}</p>
            <p className="text-stone-500 dark:text-stone-400 mt-4">
              Please check back later or contact us if the problem persists.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900 dark:text-white mb-4">
            {draftData?.title || 'About'}
          </h1>
          {draftData?.subtitle && (
            <p className="text-xl text-stone-600 dark:text-stone-300">
              {draftData.subtitle}
            </p>
          )}
        </header>

        <div className="prose dark:prose-invert max-w-none">
          {draftData?.content?.markdown ? (
            <MarkdownRenderer content={draftData.content.markdown} />
          ) : (
            <p className="text-stone-500 dark:text-stone-400">No content available.</p>
          )}
        </div>
      </div>
    </div>
  )
}