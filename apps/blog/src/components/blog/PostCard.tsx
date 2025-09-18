import { Link } from '@tanstack/react-router';
import { BlogPost, formatDate, formatRelativeDate } from '@q00-blog/shared';

interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
  showExcerpt?: boolean;
  className?: string;
}

export const PostCard = ({ 
  post, 
  featured = false, 
  showExcerpt = true, 
  className = '' 
}: PostCardProps) => {

  const cardClasses = `
    group relative overflow-hidden rounded-2xl border border-stone-200/60 dark:border-stone-700/60
    bg-stone-50/80 dark:bg-stone-900/80 p-8 transition-all duration-200 ease-out
    ${featured ? 'md:col-span-2 lg:col-span-2 ring-2 ring-stone-200 dark:ring-stone-700' : ''}
    ${className}
  `.trim();

  return (
    <article className={cardClasses}>
      <div className="flex flex-col h-full">
        {/* Post Series */}
        {post.series && (
          <div className="mb-4">
            <Link
              to="/series/$slug"
              params={{ slug: post.series.slug }}
              className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300
                         bg-stone-100 dark:bg-stone-800
                         rounded-full border border-stone-200/50 dark:border-stone-700/50"
            >
              📚 {post.series.name}
            </Link>
          </div>
        )}

        {/* Post Title */}
        <h2 className="mb-4 transition-colors duration-300">
          <Link
            to="/posts/$slug"
            params={{ slug: post.slug }}
            className={`block font-bold leading-snug text-gray-900 dark:text-white tracking-tight
                       ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}
          >
            {post.title}
          </Link>
        </h2>

        {/* Post Excerpt */}
        {showExcerpt && post.excerpt && (
          <p className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed flex-grow
                       text-base font-normal tracking-wide line-clamp-3">
            {post.excerpt}
          </p>
        )}

        {/* Post Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {post.tags.slice(0, featured ? 6 : 3).map((tag) => (
              <Link
                key={tag}
                to="/tags/$tag"
                params={{ tag }}
                className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-stone-700 dark:text-stone-300
                           bg-stone-100/80 dark:bg-stone-700/80 rounded-lg
                           transition-all duration-200 cursor-pointer
                           border border-stone-200/50 dark:border-stone-600/50"
              >
                #{tag}
              </Link>
            ))}
            {post.tags.length > (featured ? 6 : 3) && (
              <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-gray-500 dark:text-gray-400
                             bg-gray-50/50 dark:bg-gray-800/50 rounded-lg border border-gray-200/30 dark:border-gray-700/30">
                +{post.tags.length - (featured ? 6 : 3)} more
              </span>
            )}
          </div>
        )}

        {/* Post Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto gap-2">
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
            <time
              dateTime={post.publishedAt instanceof Date ? post.publishedAt.toISOString() : post.publishedAt}
              title={formatDate(post.publishedAt)}
              className="shrink-0"
            >
              {formatRelativeDate(post.publishedAt)}
            </time>
            <span className="hidden sm:inline">•</span>
            <span className="shrink-0">{post.readingTimeMinutes} min read</span>
            {post.views && (
              <>
                <span className="hidden sm:inline">•</span>
                <span className="shrink-0">{post.views.toLocaleString()} views</span>
              </>
            )}
            {post.wordCount && (
              <>
                <span className="hidden lg:inline">•</span>
                <span className="shrink-0 hidden lg:inline">{post.wordCount.toLocaleString()} words</span>
              </>
            )}
          </div>

          {post.author && (
            <span className="font-medium text-gray-700 dark:text-gray-300 shrink-0 sm:text-right">
              {post.author}
            </span>
          )}
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-6 right-6">
            <span className="inline-flex items-center px-3 py-1.5 text-xs font-bold text-amber-700 dark:text-amber-300
                             bg-gradient-to-r from-amber-50 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-800/30
                             rounded-full border border-amber-200/60 dark:border-amber-700/60 backdrop-blur-sm
                             shadow-lg shadow-amber-200/50 dark:shadow-amber-900/30">
              ✨ Featured
            </span>
          </div>
        )}
      </div>
    </article>
  );
};