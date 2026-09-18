import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows the greeting returned by the API', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('Hello from API')),
    );

    render(<App />);

    expect(screen.getByRole('heading', { name: 'Ash' })).toBeDefined();
    expect(await screen.findByText('Hello from API')).toBeDefined();
  });

  it('shows an error when the API fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('boom', { status: 500 })),
    );

    render(<App />);

    expect(await screen.findByText('API responded with 500')).toBeDefined();
  });
});
