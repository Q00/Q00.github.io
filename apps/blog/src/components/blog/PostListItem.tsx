import { Link } from '@tanstack/react-router';
import { BlogPost, formatDate, formatRelativeDate } from '@q00-blog/shared';

interface PostListItemProps {
  post: BlogPost;
  className?: string;
}

export const PostListItem = ({ post, className = '' }: PostListItemProps) => {
  return (
    <article className={`group py-6 border-b border-stone-200/60 dark:border-stone-700/60 last:border-b-0 ${className}`}>
      <div className="flex flex-col space-y-3">
        {/* Title */}
        <h2 className="transition-colors duration-300">
          <Link
            to="/posts/$slug"
            params={{ slug: post.slug }}
            className="block font-semibold leading-snug text-stone-900 dark:text-white tracking-tight text-lg"
          >
            {post.title}
          </Link>
        </h2>

        {/* Date and Reading Time */}
        <div className="flex items-center text-sm text-stone-500 dark:text-stone-400 space-x-3">
          <time
            dateTime={post.publishedAt instanceof Date ? post.publishedAt.toISOString() : post.publishedAt}
            title={formatDate(post.publishedAt)}
          >
            {formatRelativeDate(post.publishedAt)}
          </time>
          <span>•</span>
          <span>{post.readingTimeMinutes} min read</span>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 4).map((tag) => (
              <Link
                key={tag}
                to="/tags/$tag"
                params={{ tag }}
                className="inline-flex items-center px-2 py-1 text-xs font-medium text-stone-600 dark:text-stone-400
                           bg-stone-100/80 dark:bg-stone-800/60 rounded-md
                           transition-colors duration-200 cursor-pointer"
              >
                #{tag}
              </Link>
            ))}
            {post.tags.length > 4 && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-stone-500 dark:text-stone-500
                             bg-stone-50/50 dark:bg-stone-900/30 rounded-md">
                +{post.tags.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
};