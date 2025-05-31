const fs = require('fs');
const path = require('path');

// Read the current books.json file
const booksJsonPath = path.join(__dirname, '../lib/books.json');
const books = JSON.parse(fs.readFileSync(booksJsonPath, 'utf8'));

// Add category field to all books
// All existing books in books.json are classics
books.forEach(book => {
  book.category = 'classics';
});

// Add the modern classics books
const modernClassics = [
  {
    "id": "stand-on-zanzibar",
    "title": "Stand on Zanzibar",
    "author": "John Brunner",
    "description": "A groundbreaking science fiction novel set in a dystopian 2010, exploring themes of overpopulation, corporate power, and social change through multiple narrative threads and experimental storytelling techniques.",
    "coverUrl": "/book-covers/amz-stand-on-zanzibar.jpg",
    "genres": ["Science Fiction", "Dystopian", "Modern Classics"],
    "duration": "12h",
    "pages": 576,
    "category": "modern classics",
    "chapters": [
      { "id": "ch-1", "title": "The Happening World", "duration": "45m" },
      { "id": "ch-2", "title": "The Happening World", "duration": "50m" },
      { "id": "ch-3", "title": "The Happening World", "duration": "48m" },
      { "id": "ch-4", "title": "The Happening World", "duration": "52m" },
      { "id": "ch-5", "title": "The Happening World", "duration": "47m" }
    ]
  },
  {
    "id": "dhalgren",
    "title": "Dhalgren",
    "author": "Samuel R. Delany",
    "description": "A complex, experimental novel set in the fictional city of Bellona, which has been cut off from the rest of the world. The story follows a young man known only as 'the Kid' as he navigates this strange, apocalyptic landscape.",
    "coverUrl": "/book-covers/amz-dhalgren.jpg",
    "genres": ["Science Fiction", "Experimental", "Modern Classics"],
    "duration": "18h",
    "pages": 801,
    "category": "modern classics",
    "chapters": [
      { "id": "ch-1", "title": "The Ruins of Morning", "duration": "1h 15m" },
      { "id": "ch-2", "title": "The Ruins of Morning", "duration": "1h 20m" },
      { "id": "ch-3", "title": "The Ruins of Morning", "duration": "1h 18m" },
      { "id": "ch-4", "title": "The Ruins of Morning", "duration": "1h 22m" },
      { "id": "ch-5", "title": "The Ruins of Morning", "duration": "1h 16m" }
    ]
  },
  {
    "id": "a-walk-in-the-woods",
    "title": "A Walk in the Woods",
    "author": "Bill Bryson",
    "description": "A humorous and insightful account of Bryson's attempt to hike the Appalachian Trail with his friend Stephen Katz. The book combines travel writing with natural history and personal memoir.",
    "coverUrl": "/book-covers/amz-a-walk-in-the-woods.jpg",
    "genres": ["Travel", "Memoir", "Humor", "Modern Classics"],
    "duration": "8h",
    "pages": 274,
    "category": "modern classics",
    "chapters": [
      { "id": "ch-1", "title": "Chapter 1", "duration": "45m" },
      { "id": "ch-2", "title": "Chapter 2", "duration": "42m" },
      { "id": "ch-3", "title": "Chapter 3", "duration": "48m" },
      { "id": "ch-4", "title": "Chapter 4", "duration": "44m" },
      { "id": "ch-5", "title": "Chapter 5", "duration": "46m" }
    ]
  },
  {
    "id": "morning-glory",
    "title": "Morning Glory",
    "author": "LaVyrle Spencer",
    "description": "A heartwarming romance novel about a young widow who moves to a small town to start over, finding unexpected love and community in the process. A beloved classic of the romance genre.",
    "coverUrl": "/book-covers/amz-morning-glory.jpg",
    "genres": ["Romance", "Contemporary", "Modern Classics"],
    "duration": "6h",
    "pages": 384,
    "category": "modern classics",
    "chapters": [
      { "id": "ch-1", "title": "Chapter 1", "duration": "35m" },
      { "id": "ch-2", "title": "Chapter 2", "duration": "38m" },
      { "id": "ch-3", "title": "Chapter 3", "duration": "36m" },
      { "id": "ch-4", "title": "Chapter 4", "duration": "40m" },
      { "id": "ch-5", "title": "Chapter 5", "duration": "37m" }
    ]
  },
  {
    "id": "the-last-policeman",
    "title": "The Last Policeman",
    "author": "Ben H. Winters",
    "description": "A pre-apocalyptic mystery novel about a detective who continues to solve crimes even as an asteroid approaches Earth. The first book in a trilogy that explores what people do when they know the world is ending.",
    "coverUrl": "/book-covers/amz-the-last-policeman.jpg",
    "genres": ["Mystery", "Science Fiction", "Modern Classics"],
    "duration": "7h",
    "pages": 336,
    "category": "modern classics",
    "chapters": [
      { "id": "ch-1", "title": "Chapter 1", "duration": "40m" },
      { "id": "ch-2", "title": "Chapter 2", "duration": "42m" },
      { "id": "ch-3", "title": "Chapter 3", "duration": "38m" },
      { "id": "ch-4", "title": "Chapter 4", "duration": "45m" },
      { "id": "ch-5", "title": "Chapter 5", "duration": "41m" }
    ]
  },
  {
    "id": "bag-of-bones",
    "title": "Bag of Bones",
    "author": "Stephen King",
    "description": "A supernatural thriller about a bestselling novelist who moves to his summer home after his wife's death, only to discover that the house and the small town hold dark secrets and ghostly presences.",
    "coverUrl": "/book-covers/amz-bag-of-bones.jpg",
    "genres": ["Horror", "Supernatural", "Thriller", "Modern Classics"],
    "duration": "14h",
    "pages": 529,
    "category": "modern classics",
    "chapters": [
      { "id": "ch-1", "title": "Chapter 1", "duration": "1h 10m" },
      { "id": "ch-2", "title": "Chapter 2", "duration": "1h 15m" },
      { "id": "ch-3", "title": "Chapter 3", "duration": "1h 8m" },
      { "id": "ch-4", "title": "Chapter 4", "duration": "1h 12m" },
      { "id": "ch-5", "title": "Chapter 5", "duration": "1h 6m" }
    ]
  },
  {
    "id": "the-sparrow",
    "title": "The Sparrow",
    "author": "Mary Doria Russell",
    "description": "A science fiction novel about a Jesuit mission to an alien planet that goes terribly wrong. The story explores themes of faith, cultural misunderstanding, and the consequences of first contact.",
    "coverUrl": "/book-covers/amz-the-sparrow.jpg",
    "genres": ["Science Fiction", "Literary", "Modern Classics"],
    "duration": "11h",
    "pages": 408,
    "category": "modern classics",
    "chapters": [
      { "id": "ch-1", "title": "Chapter 1", "duration": "55m" },
      { "id": "ch-2", "title": "Chapter 2", "duration": "58m" },
      { "id": "ch-3", "title": "Chapter 3", "duration": "52m" },
      { "id": "ch-4", "title": "Chapter 4", "duration": "56m" },
      { "id": "ch-5", "title": "Chapter 5", "duration": "54m" }
    ]
  },
  {
    "id": "the-right-stuff",
    "title": "The Right Stuff",
    "author": "Tom Wolfe",
    "description": "A non-fiction account of the early days of the U.S. space program, focusing on the Mercury Seven astronauts and the test pilots who became America's first space heroes. A masterful blend of journalism and storytelling.",
    "coverUrl": "/book-covers/amz-the-right-stuff.jpg",
    "genres": ["Non-Fiction", "History", "Science", "Modern Classics"],
    "duration": "13h",
    "pages": 448,
    "category": "modern classics",
    "chapters": [
      { "id": "ch-1", "title": "Chapter 1", "duration": "1h 5m" },
      { "id": "ch-2", "title": "Chapter 2", "duration": "1h 8m" },
      { "id": "ch-3", "title": "Chapter 3", "duration": "1h 2m" },
      { "id": "ch-4", "title": "Chapter 4", "duration": "1h 6m" },
      { "id": "ch-5", "title": "Chapter 5", "duration": "1h 4m" }
    ]
  },
  {
    "id": "bet-me",
    "title": "Bet Me",
    "author": "Jennifer Crusie",
    "description": "A contemporary romance novel about a woman who makes a bet with her friends that she can get a man to propose to her, only to find herself falling in love with the wrong man. A witty and charming love story.",
    "coverUrl": "/book-covers/amz-bet-me.jpg",
    "genres": ["Romance", "Contemporary", "Humor", "Modern Classics"],
    "duration": "9h",
    "pages": 400,
    "category": "modern classics",
    "chapters": [
      { "id": "ch-1", "title": "Chapter 1", "duration": "50m" },
      { "id": "ch-2", "title": "Chapter 2", "duration": "48m" },
      { "id": "ch-3", "title": "Chapter 3", "duration": "52m" },
      { "id": "ch-4", "title": "Chapter 4", "duration": "46m" },
      { "id": "ch-5", "title": "Chapter 5", "duration": "49m" }
    ]
  },
  {
    "id": "the-brethren",
    "title": "The Brethren",
    "author": "John Grisham",
    "description": "A legal thriller about three former judges serving time in a minimum-security prison who run a scam from behind bars. When their scheme threatens to expose a presidential candidate, they find themselves in real danger.",
    "coverUrl": "/book-covers/amz-the-breatheren.jpg",
    "genres": ["Thriller", "Legal", "Modern Classics"],
    "duration": "10h",
    "pages": 384,
    "category": "modern classics",
    "chapters": [
      { "id": "ch-1", "title": "Chapter 1", "duration": "45m" },
      { "id": "ch-2", "title": "Chapter 2", "duration": "42m" },
      { "id": "ch-3", "title": "Chapter 3", "duration": "48m" },
      { "id": "ch-4", "title": "Chapter 4", "duration": "44m" },
      { "id": "ch-5", "title": "Chapter 5", "duration": "46m" }
    ]
  }
];

// Combine the books
const allBooks = [...books, ...modernClassics];

// Write the updated books.json file
fs.writeFileSync(booksJsonPath, JSON.stringify(allBooks, null, 2));

console.log('Updated books.json with category fields and added modern classics!');
console.log(`Total books: ${allBooks.length}`);
console.log(`Classics: ${allBooks.filter(b => b.category === 'classics').length}`);
console.log(`Modern Classics: ${allBooks.filter(b => b.category === 'modern classics').length}`); 