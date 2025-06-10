import { jest, describe, it, expect, global } from '@jest/globals';
import { getTrendingGifs } from '../adapters/giphyAdapters';

describe('getTrendingGifs', () => {
  it('sends a request to the correct endpoint', async () => {
    const mockFetch = jest.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({ data: [] }) });
    global.fetch = mockFetch;
    await getTrendingGifs();
    expect(mockFetch).toHaveBeenCalledWith('/api/gifs');
  });

  it('handles errors correctly', async () => {
    const mockFetch = jest.fn().mockRejectedValue(new Error('Network error'));
    global.fetch = mockFetch;
    await expect(getTrendingGifs()).rejects.toThrow('Network error');
  });
}); 