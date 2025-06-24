'use client';

import { useState, useEffect } from 'react';
import { getRandomDevQuote } from '@/utils/quotes';

export default function Home() {
  const [quote, setQuote] = useState<string>("Loading Chuck Norris wisdom...");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadNewQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const newQuote = await getRandomDevQuote();
      setQuote(newQuote);
    } catch (err: unknown) { 
      
      let errorMessage = "An unexpected error occurred.";

      
      if (err instanceof Error) {
        errorMessage = `Failed to load quote: ${err.message}`;
      } else if (typeof err === 'string') { 
        errorMessage = `Failed to load quote: ${err}`;
      } else {
        
        console.error("Unknown error type encountered:", err);
      }
      setError(errorMessage);
      setQuote("Could not load Chuck Norris quote."); // Fallback UI text
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNewQuote();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center">Chuck Norris Wisdom</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-6 flex flex-col items-center justify-center">
        <section className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full text-center">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Random Dev Quote</h2>
          {loading ? (
            <p className="text-lg italic text-gray-600">Summoning Chuck Norris's thoughts...</p>
          ) : error ? (
            <p className="text-lg text-red-500">{error}</p>
          ) : (
            <p className="text-xl font-medium text-gray-800 break-words">"{quote}"</p>
          )}
          <button
            onClick={loadNewQuote}
            disabled={loading}
            className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Get New Quote"}
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center shadow-inner">
        <div className="container mx-auto">
          <p className="text-sm">Visitor Count: <span className="font-bold">0</span> (Placeholder)</p>
          <p className="text-sm mt-1">&copy; {new Date().getFullYear()} My Quote App</p>
        </div>
      </footer>
    </div>
  );
}