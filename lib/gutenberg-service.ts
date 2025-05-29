import axios from 'axios';
import { Book, Chapter } from '../types/book';

const GUTENBERG_API_BASE = 'https://www.gutenberg.org/cache/epub';
const GUTENBERG_METADATA_API = 'https://www.gutenberg.org/ebooks/search.json';

interface GutenbergMetadata {
  id: number;
  title: string;
  authors: Array<{ name: string; birth_year: number | null; death_year: number | null }>;
  languages: string[];
  subjects: string[];
  bookshelves: string[];
}

export class GutenbergService {
  private static instance: GutenbergService;
  private cache: Map<string, any> = new Map();
  private rateLimitDelay = 1000; // 1 second between requests

  private constructor() {}

  static getInstance(): GutenbergService {
    if (!GutenbergService.instance) {
      GutenbergService.instance = new GutenbergService();
    }
    return GutenbergService.instance;
  }

  private async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async fetchWithRetry(url: string, retries = 3): Promise<any> {
    try {
      await this.delay(this.rateLimitDelay);
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      if (retries > 0 && axios.isAxiosError(error) && error.response?.status === 429) {
        await this.delay(this.rateLimitDelay * 2);
        return this.fetchWithRetry(url, retries - 1);
      }
      throw error;
    }
  }

  async searchBook(title: string, author: string): Promise<GutenbergMetadata | null> {
    const cacheKey = `search:${title}:${author}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const query = encodeURIComponent(`${title} ${author}`);
    const url = `${GUTENBERG_METADATA_API}?query=${query}`;
    
    try {
      const data = await this.fetchWithRetry(url);
      const results = data.results || [];
      
      // Find the best match
      const bestMatch = results.find((book: GutenbergMetadata) => {
        const bookTitle = book.title.toLowerCase();
        const bookAuthor = book.authors[0]?.name.toLowerCase() || '';
        return bookTitle.includes(title.toLowerCase()) && 
               bookAuthor.includes(author.toLowerCase());
      });

      if (bestMatch) {
        this.cache.set(cacheKey, bestMatch);
        return bestMatch;
      }
      return null;
    } catch (error) {
      console.error('Error searching Gutenberg:', error);
      return null;
    }
  }

  async fetchBookContent(gutenbergId: number): Promise<string | null> {
    const cacheKey = `content:${gutenbergId}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // Try to fetch the plain text version first
      const url = `${GUTENBERG_API_BASE}/${gutenbergId}/pg${gutenbergId}.txt`;
      const content = await this.fetchWithRetry(url);
      
      if (content) {
        this.cache.set(cacheKey, content);
        return content;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching book content for ID ${gutenbergId}:`, error);
      return null;
    }
  }

  parseChapters(content: string): Chapter[] {
    // Common chapter markers
    const chapterMarkers = [
      /^Chapter\s+\d+/i,
      /^CHAPTER\s+\d+/i,
      /^Book\s+\d+/i,
      /^BOOK\s+\d+/i,
      /^Part\s+\d+/i,
      /^PART\s+\d+/i
    ];

    const lines = content.split('\n');
    const chapters: Chapter[] = [];
    let currentChapter: { title: string; content: string[] } | null = null;

    for (const line of lines) {
      const isChapterStart = chapterMarkers.some(marker => marker.test(line.trim()));
      
      if (isChapterStart) {
        if (currentChapter) {
          chapters.push({
            id: `ch-${chapters.length + 1}`,
            title: currentChapter.title,
            content: currentChapter.content.join('\n'),
            duration: this.estimateDuration(currentChapter.content.join('\n'))
          });
        }
        currentChapter = {
          title: line.trim(),
          content: []
        };
      } else if (currentChapter) {
        currentChapter.content.push(line);
      }
    }

    // Add the last chapter
    if (currentChapter) {
      chapters.push({
        id: `ch-${chapters.length + 1}`,
        title: currentChapter.title,
        content: currentChapter.content.join('\n'),
        duration: this.estimateDuration(currentChapter.content.join('\n'))
      });
    }

    return chapters;
  }

  private estimateDuration(content: string): string {
    // Average reading speed: 200 words per minute
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    
    if (minutes < 60) {
      return `${minutes}m`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  }

  async getBookWithContent(book: Book): Promise<Book | null> {
    const metadata = await this.searchBook(book.title, book.author);
    if (!metadata) {
      return null;
    }

    const content = await this.fetchBookContent(metadata.id);
    if (!content) {
      return null;
    }

    const chapters = this.parseChapters(content);
    
    return {
      ...book,
      gutenbergId: metadata.id,
      chapters: chapters.map((chapter, index) => ({
        ...chapter,
        id: `ch-${index + 1}`,
        audioUrl: `/audio/${book.id}/ch-${index + 1}.mp3`
      }))
    };
  }
}

export const gutenbergService = GutenbergService.getInstance(); 