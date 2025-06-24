// components/Footer.tsx

// This component will be a Server Component by default,
// meaning it runs on the server and can perform data fetching directly.

interface VisitorCountResponse {
  count: number;
}

export default async function Footer() {
  let visitorCount = 0;
  let errorFetchingCount = false;

  try {
    // Fetch the current visitor count (GET request)
    const getResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/visitor-count`,
      {
        method: "GET",
        // 'no-store' ensures this fetch is not cached by Next.js or browser,
        // always getting the latest count.
        cache: "no-store",
      }
    );

    if (!getResponse.ok) {
      // If the GET request failed, log it and set an error flag
      console.error(
        `Failed to GET visitor count: ${getResponse.status} ${getResponse.statusText}`
      );
      errorFetchingCount = true;
    } else {
      const data: VisitorCountResponse = await getResponse.json();
      visitorCount = data.count;
    }

    // Increment the visitor count (POST request)
    // We do this after getting the initial count, so the displayed count
    // for this visit is the count *before* this visit.
    const postResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/visitor-count`,
      {
        method: "POST",
        // No-store for POST as well, though usually less critical for POSTs.
        cache: "no-store",
        // Send an empty body for POST
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!postResponse.ok) {
      // If the POST request failed, log it, but don't necessarily show it to the user
      // as the GET might have succeeded.
      console.error(
        `Failed to POST increment visitor count: ${postResponse.status} ${postResponse.statusText}`
      );
      // Don't set errorFetchingCount here if GET was successful, as GET is what's displayed.
    }
  } catch (error) {
    console.error("Error in Footer data fetching:", error);
    errorFetchingCount = true;
  }

  return (
    <footer className="bg-gray-800 text-white p-4 text-center shadow-inner">
      <div className="container mx-auto">
        <p className="text-sm">
          Visitor Count:{" "}
          <span className="font-bold">
            {errorFetchingCount ? "N/A (Error)" : visitorCount}
          </span>
        </p>
        <p className="text-sm mt-1">
          &copy; {new Date().getFullYear()} My Quote App
        </p>
      </div>
    </footer>
  );
}
