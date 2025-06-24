// app/page.tsx

/**
 * @file This file defines the main page component for the Chuck Norris Wisdom application.
 * It's a Client Component responsible for data fetching, state management, and UI rendering.
 */
"use client"; // Designates this as a Client Component, enabling React Hooks and interactivity.

import { useState, useEffect } from "react";
import { getRandomDevQuote } from "@/utils/quotes";
import Footer from "@/app/components/Footer";
import WSLogo from "@/app/components/WSLogo";

export default function Home() {
  // State management for the displayed quote, loading status, and error handling.
  const [quote, setQuote] = useState<string>("Loading Chuck Norris wisdom...");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Asynchronously fetches a random Chuck Norris quote from the API.
   * Manages loading states and robust error handling for API calls.
   */
  const loadNewQuote = async () => {
    setLoading(true);
    setError(null); // Clear previous errors on new fetch attempt.
    try {
      const newQuote = await getRandomDevQuote();
      setQuote(newQuote);
    } catch (err: unknown) {
      // Implement specific error messaging based on the error type for better user feedback.
      let errorMessage = "An unexpected error occurred.";
      if (err instanceof Error) {
        errorMessage = `Failed to load quote: ${err.message}`;
      } else if (typeof err === "string") {
        errorMessage = `Failed to load quote: ${err}`;
      }
      setError(errorMessage);
      setQuote("Could not load Chuck Norris quote."); // Fallback message.
    } finally {
      setLoading(false); // Ensures loading state is reset after fetch completes or fails.
    }
  };

  /**
   * useEffect hook to trigger the initial quote fetch on component mount.
   * Empty dependency array ensures this effect runs only once, mimicking componentDidMount.
   */
  useEffect(() => {
    loadNewQuote();
  }, []);

  return (
    // Main page container: Centers the application frame vertically and horizontally.
    // Provides overall page padding and background.
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
      {/* Main Application Frame: A central, self-contained card-like UI element.
          Features: white background, rounded corners, shadow, responsive width, and flex column layout. */}
      <section className="bg-white rounded-xl shadow-xl w-full max-w-6xl mx-auto flex flex-col p-8 min-h-[70vh]">
        {/* Top Section: Logo and (optional) Page Title within the app frame. */}
        <div className="flex items-center justify-between mb-6">
          {/* Custom SVG logo with defined size and color, ensuring visibility on white background. */}
          <WSLogo className="h-10 w-auto text-black mt-2 mr-4" />
          {/* Placeholder for the main application title. */}
          {/* If you want a title, uncomment and adjust the following line: */}
          {/* <h1 className="text-3xl font-bold text-center text-gray-800 flex-grow">Chuck Norris Wisdom</h1> */}
          {/* A small spacer for layout balance on the right. */}
          <div className="w-10"></div>
        </div>

        {/* Middle Section: Contains the Chuck Norris image and the quote/button group.
            Utilizes flexbox for responsive layout: stacks vertically on small screens,
            splits into two centered halves horizontally on medium screens and up. */}
        <div className="flex-grow flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
          {/* Image Container: Occupies half width on larger screens, full width on small screens. */}
          <div className="w-full md:w-1/2 max-w-sm md:max-w-none p-4">
            <img
              src="/chucknorris.png" // Static asset served from the public directory.
              alt="Chuck Norris" // Essential for accessibility and SEO.
              className="rounded-lg shadow-md w-full h-auto object-cover"
            />
          </div>

          {/* Quote and Button Group: Styled to be vertically and horizontally centered
              within its half of the layout on larger screens. */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4">
            {/* Quote Display Area: Handles loading, error, and actual quote text. */}
            <div className="text-center mb-6">
              {loading ? (
                <p className="text-lg italic text-gray-600">
                  Summoning Chuck Norris's thoughts...
                </p>
              ) : error ? (
                <p className="text-lg text-red-500">{error}</p>
              ) : (
                <p className="text-xl font-medium text-gray-800 break-words">
                  "{quote}"
                </p>
              )}
            </div>

            {/* Button to trigger a new quote fetch. Disabled during loading. */}
            <button
              onClick={loadNewQuote}
              disabled={loading}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : "Get New Quote"}
            </button>
          </div>
        </div>

        {/* Footer Section: Positioned at the bottom of the app frame.
            'mt-auto' pushes it to the end of the flex container, ensuring it stays at the bottom. */}
        <Footer />
      </section>
    </div>
  );
}
