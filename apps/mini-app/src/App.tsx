import { useEffect, useState } from 'react';
import { fetchGreeting } from './api';

export function App() {
  const [greeting, setGreeting] = useState('Loading...');

  useEffect(() => {
    const controller = new AbortController();

    fetchGreeting(controller.signal)
      .then(setGreeting)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        setGreeting(error instanceof Error ? error.message : 'Unknown error');
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      <h1>Ash</h1>
      <p>{greeting}</p>
    </>
  );
}
