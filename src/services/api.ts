import { ImageItem } from '../types';

const BASE_URL = 'https://picsum.photos/v2/list';

export async function fetchImages(
  page: number,
  limit: number = 20
): Promise<ImageItem[]> {
  const response = await fetch(
    `${BASE_URL}?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error('Unable to fetch images');
  }

  const data: ImageItem[] = await response.json();

  return data;
}