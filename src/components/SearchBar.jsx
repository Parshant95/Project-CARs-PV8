import { useState } from 'react';
import { FaSearch, FaRobot } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [budget, setBudget] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Check if API key and endpoint are available
    const apiKey = import.meta.env.VITE_GROK_API_KEY;
    const apiEndpoint = 'https://api.grok.ai/v1/chat/completions';

    if (!apiKey) {
      setError('API configuration is missing. Please check your environment variables.');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Sending request to Grok API');
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "grok-1",
          messages: [{
            role: "user",
            content: `Find cars within ${budget} budget with these preferences: ${query}. Please provide a detailed response with specific car models, their features, and why they would be good matches.`
          }],
          max_tokens: 500
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'API request failed');
      }

      const data = await response.json();
      console.log('API Response:', data);
      onSearch(data);
    } catch (error) {
      console.error('Error searching cars:', error);
      setError(error.message || 'Failed to search cars. Please try again.');
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
        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar; 