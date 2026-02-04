import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, X, ArrowLeft, Play, Gem, History, ChevronRight } from 'lucide-react';
import { TRENDING_KEYWORDS, SEARCH_RECOMMENDATIONS, GRID_CONTENT } from '../constants';

interface SearchScreenProps {
  onBack: () => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ onBack }) => {
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      setIsTyping(false);
      setShowResults(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setShowResults(false);
    setIsTyping(val.length > 0);
  };

  const clearSearch = () => {
    setQuery('');
    setIsTyping(false);
    setShowResults(false);
    inputRef.current?.focus();
  };

  const selectKeyword = (keyword: string) => {
    setQuery(keyword);
    setIsTyping(false);
    setShowResults(true);
  };

  return (
    <div className="flex flex-col h-full bg-[#0E0E0B] animate-in fade-in duration-300 pb-24">
      <div className="px-6 pt-4 pb-4 flex items-center space-x-3 bg-[#0E0E0B]/80 backdrop-blur-xl sticky top-0 z-40">
        <button onClick={onBack} className="p-1 -ml-1 text-[#A0A096] hover:text-[#FFD400] transition-colors">
          <ArrowLeft size={24} />
        </button>
        <form onSubmit={handleSearch} className="flex-1 h-11 bg-[#1C1C18] rounded-full flex items-center px-4 border border-[#242420] focus-within:border-[#FFD400] transition-all relative">
          <Search size={18} className="text-[#555550] group-focus-within:text-[#FFD400]" />
          <input 
            ref={inputRef}
            type="text" 
            value={query}
            onChange={handleInputChange}
            placeholder="Search on VaaniFM" 
            className="bg-transparent border-none outline-none flex-1 px-3 text-sm text-white placeholder-[#555550]"
          />
          {query && (
            <button type="button" onClick={clearSearch} className="p-1 text-[#555550] hover:text-white">
              <X size={16} />
            </button>
          )}
          {!query && <Mic size={18} className="text-[#555550]" />}
        </form>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar px-6 space-y-10">
        {!isTyping && !showResults && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10 py-4">
            <section className="space-y-5">
              <h2 className="text-lg font-bold tracking-tight">Most Searched</h2>
              <div className="flex flex-wrap gap-2.5">
                {TRENDING_KEYWORDS.map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => selectKeyword(keyword)}
                    className="px-4 py-2.5 rounded-full bg-[#1C1C18] border border-[#242420] text-[13px] font-bold text-[#A0A096] hover:text-[#FFD400] hover:border-[#FFD400]/40 transition-all active:scale-95"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-lg font-bold tracking-tight">Recommended For You</h2>
              <div className="grid grid-cols-2 gap-4">
                {SEARCH_RECOMMENDATIONS.map((item) => (
                  <div key={item.id} className="flex flex-col space-y-2 group">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden relative border border-[#242420]">
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      {item.isPremium && (
                        <div className="absolute top-3 left-3 w-7 h-7 bg-[#FFD400] rounded-full flex items-center justify-center shadow-lg border border-black/10">
                          <Gem size={14} className="text-black" />
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                         <h4 className="font-bold text-[12px] text-white line-clamp-2 leading-tight drop-shadow-md">{item.title}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {isTyping && (
          <div className="animate-in fade-in duration-300 py-2">
            <div className="space-y-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <button 
                  key={i} 
                  onClick={() => selectKeyword(`${query} result ${i}`)}
                  className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-[#1C1C18] transition-colors group"
                >
                  <div className="flex items-center space-x-4">
                    <History size={18} className="text-[#555550]" />
                    <span className="text-[15px] font-medium group-hover:text-[#FFD400]">
                      <span className="text-white">{query}</span>
                      <span className="text-[#555550]"> extension {i}</span>
                    </span>
                  </div>
                  <ChevronRight size={18} className="text-[#242420]" />
                </button>
              ))}
            </div>
          </div>
        )}

        {showResults && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 py-4 space-y-6">
            <div className="flex items-center justify-between">
               <h2 className="text-[14px] font-bold text-[#A0A096] uppercase tracking-widest">Results for "{query}"</h2>
               <span className="text-[12px] font-bold text-[#555550]">24 items found</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {GRID_CONTENT.map((item) => (
                <div key={item.id} className="flex flex-col space-y-2 group">
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden relative border border-[#242420]">
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    {item.isPremium && (
                      <div className="absolute top-3 left-3 w-7 h-7 bg-[#FFD400] rounded-full flex items-center justify-center shadow-lg border border-black/10">
                        <Gem size={14} className="text-black" />
                      </div>
                    )}
                    <div className="absolute bottom-3 right-3 w-8 h-8 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center">
                      <Play size={14} fill="white" className="text-white ml-0.5" />
                    </div>
                  </div>
                  <div className="px-1">
                    <h4 className="font-bold text-sm tracking-tight truncate">{item.title}</h4>
                    <p className="text-[10px] font-bold text-[#555550] uppercase tracking-widest">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchScreen;