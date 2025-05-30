import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';
import { fetchNewsById, NewsItem } from '../lib/api';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const newsData = await fetchNewsById(id);
        setNews(newsData);
        setError(null);
      } catch (err) {
        setError('Failed to load news article. Please try again later.');
        console.error('Error loading news:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Article not found'}</p>
          <Link to="/" className="text-red-500 hover:text-red-400">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to News
        </Link>

        <article className="max-w-4xl mx-auto">
          {news.imageUrl && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img 
                src={news.imageUrl} 
                alt={news.title}
                className="w-full h-[400px] object-cover"
              />
            </div>
          )}

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{news.title}</h1>
            <div className="flex items-center text-gray-400">
              <Calendar className="h-5 w-5 mr-2" />
              <span>
                {new Date(news.date).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              {news.source && (
                <span className="ml-4">Source: {news.source}</span>
              )}
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            {news.content ? (
              <div dangerouslySetInnerHTML={{ __html: news.content }} />
            ) : (
              <p className="text-xl text-gray-300">{news.excerpt}</p>
            )}
          </div>

          {news.link && (
            <div className="mt-8 pt-8 border-t border-gray-700">
              <a 
                href={news.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-red-500 hover:text-red-400"
              >
                Read original article <ExternalLink className="h-5 w-5 ml-2" />
              </a>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default NewsDetail; 