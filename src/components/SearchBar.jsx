import { useState } from 'react';
import { FaSearch, FaRobot } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [budget, setBudget] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_DEEPSEEK_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          query: `Find cars within ${budget} budget with these preferences: ${query}`,
          max_tokens: 500
        })
      });

      const data = await response.json();
      onSearch(data);
    } catch (error) {
      console.error('Error searching cars:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe your ideal car..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>
          <div className="w-32">
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Budget"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2"
          >
            {isLoading ? (
              <span>Searching...</span>
            ) : (
              <>
                <FaRobot className="text-lg" />
                <span>AI Search</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar; 