
'use client'; 

import { useState, useEffect } from 'react'; // Import hooks for client-side state and effects

interface VisitorCountResponse { // Define the expected structure of the response from the API
  count: number;
}

export default function Footer() { 
  const [visitorCount, setVisitorCount] = useState<number | 'N/A'>(0); 
  const [errorFetchingCount, setErrorFetchingCount] = useState<boolean>(false); 

  useEffect(() => {
    async function fetchAndIncrementCount() {
      try {
        // Fetch the current visitor count (GET request)
        const getResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/visitor-count`, {
          method: 'GET',
          cache: 'no-store', // Ensures the browser doesn't use stale cache
        });

        if (!getResponse.ok) {
          console.error(`Failed to GET visitor count: ${getResponse.status} ${getResponse.statusText}`);
          setErrorFetchingCount(true);
          setVisitorCount('N/A'); // Indicate error in UI
          return; // Exit if initial fetch fails
        }

        const data: VisitorCountResponse = await getResponse.json();
        setVisitorCount(data.count); // Update state with the fetched count

        // Increment the visitor count (POST request)
        const postResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/visitor-count`, {
          method: 'POST',
          // cache: 'no-store' is generally good for POSTs as well
          cache: 'no-store',
          body: JSON.stringify({}),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!postResponse.ok) {
          console.error(`Failed to POST increment visitor count: ${postResponse.status} ${postResponse.statusText}`);
          // Don't change visitorCount state here if GET was successful.
          // The error is only for the incrementing part, not the display.
        }

      } catch (error) {
        console.error('Error in Footer data fetching:', error);
        setErrorFetchingCount(true);
        setVisitorCount('N/A'); // Indicate error in UI
      }
    }

    fetchAndIncrementCount(); // Run the async function when the component mounts
  }, []); 


  return (
    <footer className="bg-gray-800 text-white p-4 text-center shadow-inner">
      <div className="container mx-auto">
        <p className="text-sm">
          Visitor Count:{' '}
          <span className="font-bold">
            {errorFetchingCount ? 'N/A (Error)' : visitorCount}
          </span>
        </p>
        <p className="text-sm mt-1">&copy; {new Date().getFullYear()} My Quote App</p>
      </div>
    </footer>
  );
}