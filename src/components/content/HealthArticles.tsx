import React, { useState } from 'react';
import { FileText, Bookmark, Clock, User, ArrowRight, X, Share2 } from 'lucide-react';
import { ARTICLES, Article } from '../../data/articlesData';
import { useHealth } from '../../context/HealthContext';

export const HealthArticles: React.FC = () => {
  const { isBookmarked, toggleBookmark } = useHealth();
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>Evidence-Based Medical Publication</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Featured <span className="text-gradient">Health Articles</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Insights on artificial intelligence, sleep optimization, microbiome science, and preventative cardiology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ARTICLES.map(article => {
          const bookmarked = isBookmarked(article.id);
          return (
            <div key={article.id} className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => toggleBookmark(article.id)}
                  className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all ${
                    bookmarked ? 'bg-amber-500 text-white' : 'bg-slate-900/60 text-white'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-bold text-amber-500">
                    <span>{article.category}</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-semibold">{article.date}</span>
                  <button
                    onClick={() => setActiveArticle(article)}
                    className="px-3.5 py-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs rounded-xl hover:bg-amber-500 hover:text-white transition-all flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-3xl glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">{activeArticle.category}</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">{activeArticle.title}</h3>
                <span className="text-xs text-slate-400">{activeArticle.author} • {activeArticle.date}</span>
              </div>
              <button onClick={() => setActiveArticle(null)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="h-64 rounded-2xl overflow-hidden">
              <img src={activeArticle.image} alt={activeArticle.title} className="w-full h-full object-cover" />
            </div>

            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line space-y-4">
              {activeArticle.content}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
