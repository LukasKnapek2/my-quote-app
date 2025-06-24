interface ChuckNorrisQuote {
  icon_url: string;
  id: string;
  url: string;
  value: string;
}

const CHUCK_NORRIS_DEV_QUOTE_API = "https://api.chucknorris.io/jokes/random?category=dev";

export async function getRandomDevQuote(): Promise<string> {
  try {
    // Fetch a random quote from the 'dev' category
    const response = await fetch(
      CHUCK_NORRIS_DEV_QUOTE_API
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to fetch quote: ${response.status} - ${
          errorData.message || response.statusText
        }`
      );
    }
    const data: ChuckNorrisQuote = await response.json();
    return data.value;
  } catch (error: unknown) {
    // We rethrow the error directly so the calling component can handle it.
    throw error;
}
  
}
