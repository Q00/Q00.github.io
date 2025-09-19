import { Link } from '@tanstack/react-router';
import { BlogPost, formatDate } from '@q00-blog/shared';

interface SeriesListItemProps {
  series: {
    id: string;
    name: string;
    slug: string;
    posts: BlogPost[];
  };
  className?: string;
}

export const SeriesListItem = ({ series, className = '' }: SeriesListItemProps) => {
  const latestPost = series.posts[0];

  return (
    <article className={`group py-6 border-b border-stone-200/60 dark:border-stone-700/60 last:border-b-0 ${className}`}>
      <div className="flex flex-col space-y-3">
        {/* Series Title */}
        <h2 className="transition-colors duration-300">
          <Link
            to="/series/$slug"
            params={{ slug: series.slug }}
            className="block font-semibold leading-snug text-stone-900 dark:text-white tracking-tight text-lg"
          >
            📚 {series.name}
          </Link>
        </h2>

        {/* Date */}
        {latestPost && (
          <div className="flex items-center text-sm text-stone-500 dark:text-stone-400">
            <time
              dateTime={latestPost.publishedAt instanceof Date ? latestPost.publishedAt.toISOString() : latestPost.publishedAt}
              title={formatDate(latestPost.publishedAt)}
            >
              Updated {formatDate(latestPost.publishedAt)}
            </time>
          </div>
        )}

        {/* Series Info and Latest Post */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-stone-600 dark:text-stone-400
                         bg-stone-100/80 dark:bg-stone-800/60 rounded-md
                         transition-colors duration-200">
            {series.posts.length} {series.posts.length === 1 ? 'post' : 'posts'}
          </span>

          {latestPost && (
            <>
              <span className="text-stone-400 dark:text-stone-500">•</span>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                Latest: {latestPost.title.substring(0, 50)}
                {latestPost.title.length > 50 ? '...' : ''}
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
};