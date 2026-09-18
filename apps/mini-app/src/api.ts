const API_URL: string = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function fetchGreeting(signal?: AbortSignal): Promise<string> {
  const response = await fetch(API_URL, { signal });

  if (!response.ok) {
    throw new Error(`API responded with ${response.status}`);
  }

  return response.text();
}
