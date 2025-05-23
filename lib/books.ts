import type { Book } from "@/types/book"

// Mock data for books
const books: Book[] = [
  // Existing books
  {
    id: "pride-and-prejudice",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description:
      "Pride and Prejudice follows the turbulent relationship between Elizabeth Bennet, the daughter of a country gentleman, and Fitzwilliam Darcy, a rich aristocratic landowner. They must overcome the titular sins of pride and prejudice in order to fall in love and marry.",
    coverUrl: "/pride-and-prejudice-cover.png",
    genres: ["Classics", "Romance", "Fiction"],
    duration: "11h",
    chapters: [
      { id: "ch-1", title: "Chapter 1", duration: "15m" },
      { id: "ch-2", title: "Chapter 2", duration: "18m" },
      { id: "ch-3", title: "Chapter 3", duration: "20m" },
      { id: "ch-4", title: "Chapter 4", duration: "17m" },
      { id: "ch-5", title: "Chapter 5", duration: "16m" },
      // More chapters would be added here
    ],
  },
  {
    id: "the-great-gatsby",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan. A tale of wealth, love, and the American Dream.",
    coverUrl: "/great-gatsby-cover.png",
    genres: ["Classics", "Fiction", "Literary"],
    duration: "5h",
    chapters: [
      { id: "ch-1", title: "Chapter 1", duration: "25m" },
      { id: "ch-2", title: "Chapter 2", duration: "22m" },
      { id: "ch-3", title: "Chapter 3", duration: "28m" },
      { id: "ch-4", title: "Chapter 4", duration: "24m" },
      { id: "ch-5", title: "Chapter 5", duration: "26m" },
      // More chapters would be added here
    ],
  },
  {
    id: "mrs-dalloway",
    title: "Mrs Dalloway",
    author: "Virginia Woolf",
    description:
      "The novel details a day in the life of Clarissa Dalloway, a fictional high-society woman in post-First World War England. It addresses the nature of time in personal experience through multiple interwoven stories, particularly that of Clarissa and Septimus Warren Smith.",
    coverUrl: "/mrs-dalloway-cover.png",
    genres: ["Classics", "Literary", "Modernist"],
    duration: "6h",
    chapters: [
      { id: "ch-1", title: "Morning", duration: "1h 10m" },
      { id: "ch-2", title: "Afternoon", duration: "1h 25m" },
      { id: "ch-3", title: "Evening", duration: "1h 15m" },
      { id: "ch-4", title: "Night", duration: "1h 20m" },
      { id: "ch-5", title: "Epilogue", duration: "50m" },
    ],
  },
  {
    id: "the-sun-also-rises",
    title: "The Sun Also Rises",
    author: "Ernest Hemingway",
    description:
      "The novel follows a group of American and British expatriates who travel from Paris to the Festival of San Fermín in Pamplona to watch the running of the bulls and the bullfights. An early modernist novel, it received mixed reviews upon publication but is now recognized as Hemingway's greatest work.",
    coverUrl: "/sun-also-rises-cover.png",
    genres: ["Classics", "Fiction", "Modernist"],
    duration: "7h",
    chapters: [
      { id: "ch-1", title: "Book 1, Chapter 1", duration: "30m" },
      { id: "ch-2", title: "Book 1, Chapter 2", duration: "35m" },
      { id: "ch-3", title: "Book 1, Chapter 3", duration: "32m" },
      { id: "ch-4", title: "Book 2, Chapter 1", duration: "34m" },
      { id: "ch-5", title: "Book 2, Chapter 2", duration: "31m" },
      // More chapters would be added here
    ],
  },
  {
    id: "winnie-the-pooh",
    title: "Winnie-the-Pooh",
    author: "A. A. Milne",
    description:
      "The adventures of Christopher Robin and his friends, in which Pooh Bear uses a balloon to get honey, Piglet meets a Heffalump, Eeyore loses a tail, and more. These tales of adventure in the Hundred Acre Wood have delighted generations of children.",
    coverUrl: "/winnie-the-pooh-cover.png",
    genres: ["Children", "Classics", "Fantasy"],
    duration: "2h 30m",
    chapters: [
      { id: "ch-1", title: "In Which We Are Introduced", duration: "15m" },
      { id: "ch-2", title: "In Which Pooh Goes Visiting", duration: "18m" },
      { id: "ch-3", title: "In Which Pooh and Piglet Go Hunting", duration: "17m" },
      { id: "ch-4", title: "In Which Eeyore Loses a Tail", duration: "16m" },
      { id: "ch-5", title: "In Which Piglet Meets a Heffalump", duration: "19m" },
      // More chapters would be added here
    ],
  },
  {
    id: "sherlock-holmes",
    title: "Sherlock Holmes Short Stories",
    author: "Arthur Conan Doyle",
    description:
      "A collection of twelve short stories featuring the famous detective Sherlock Holmes and his friend Dr. Watson. These stories showcase Holmes's brilliant deductive reasoning as he solves seemingly impossible mysteries.",
    coverUrl: "/sherlock-holmes-cover.png",
    genres: ["Classics", "Mystery", "Detective"],
    duration: "10h",
    chapters: [
      { id: "ch-1", title: "A Scandal in Bohemia", duration: "45m" },
      { id: "ch-2", title: "The Red-Headed League", duration: "42m" },
      { id: "ch-3", title: "A Case of Identity", duration: "38m" },
      { id: "ch-4", title: "The Boscombe Valley Mystery", duration: "47m" },
      { id: "ch-5", title: "The Five Orange Pips", duration: "40m" },
      // More chapters would be added here
    ],
  },
  {
    id: "frankenstein",
    title: "Frankenstein",
    author: "Mary Shelley",
    description:
      "The story of Victor Frankenstein, a young scientist who creates a sapient creature in an unorthodox scientific experiment. Shelley's novel raises profound questions about the nature of humanity and the responsibilities of creators toward their creations.",
    coverUrl: "/frankenstein-cover.png",
    genres: ["Classics", "Horror", "Gothic", "Science Fiction"],
    duration: "8h",
    chapters: [
      { id: "ch-1", title: "Letter 1", duration: "15m" },
      { id: "ch-2", title: "Letter 2", duration: "12m" },
      { id: "ch-3", title: "Letter 3", duration: "10m" },
      { id: "ch-4", title: "Letter 4", duration: "25m" },
      { id: "ch-5", title: "Chapter 1", duration: "20m" },
      // More chapters would be added here
    ],
  },
  {
    id: "dracula",
    title: "Dracula",
    author: "Bram Stoker",
    description:
      "The novel tells the story of Dracula's attempt to move from Transylvania to England so that he may find new blood and spread the undead curse, and of the battle between Dracula and a small group of people led by Professor Abraham Van Helsing.",
    coverUrl: "/dracula-cover.png",
    genres: ["Classics", "Horror", "Gothic"],
    duration: "15h",
    chapters: [
      { id: "ch-1", title: "Jonathan Harker's Journal", duration: "1h 10m" },
      { id: "ch-2", title: "Letter From Miss Mina Murray", duration: "55m" },
      { id: "ch-3", title: "Lucy Westenra's Diary", duration: "1h 5m" },
      { id: "ch-4", title: "Dr. Seward's Diary", duration: "1h 15m" },
      { id: "ch-5", title: "Letters", duration: "50m" },
      // More chapters would be added here
    ],
  },
  {
    id: "frederick-douglass",
    title: "Narrative of the Life of Frederick Douglass",
    author: "Frederick Douglass",
    description:
      "Narrative of the Life of Frederick Douglass is an 1845 memoir and treatise on abolition written by famous orator and former slave Frederick Douglass during his time in Lynn, Massachusetts.",
    coverUrl: "/frederick-douglass-memoir-cover.png",
    genres: ["Classics", "Biography", "History"],
    duration: "4h",
    chapters: [
      { id: "ch-1", title: "Chapter 1", duration: "22m" },
      { id: "ch-2", title: "Chapter 2", duration: "19m" },
      { id: "ch-3", title: "Chapter 3", duration: "21m" },
      { id: "ch-4", title: "Chapter 4", duration: "20m" },
      { id: "ch-5", title: "Chapter 5", duration: "18m" },
      // More chapters would be added here
    ],
  },
  {
    id: "the-secret-garden",
    title: "The Secret Garden",
    author: "Frances Hodgson Burnett",
    description:
      "The story of Mary Lennox, a sickly and unloved 10-year-old girl who is born in India to wealthy British parents. She is sent to England to live with her uncle after her parents die from cholera. There, she discovers a walled garden which has been kept secret for years.",
    coverUrl: "/secret-garden-cover.png",
    genres: ["Classics", "Children", "Fiction"],
    duration: "8h",
    chapters: [
      { id: "ch-1", title: "There Is No One Left", duration: "25m" },
      { id: "ch-2", title: "Mistress Mary Quite Contrary", duration: "22m" },
      { id: "ch-3", title: "Across the Moor", duration: "24m" },
      { id: "ch-4", title: "Martha", duration: "26m" },
      { id: "ch-5", title: "The Cry in the Corridor", duration: "23m" },
      // More chapters would be added here
    ],
  },
  {
    id: "call-of-cthulhu",
    title: "The Call of Cthulhu",
    author: "H. P. Lovecraft",
    description:
      "The story is presented as a manuscript found among the papers of the late Francis Wayland Thurston, recounting his discovery of notes left by his grand-uncle, a professor at Brown University. The notes reveal the existence of a cult dedicated to the worship of the ancient, cosmic entity Cthulhu.",
    coverUrl: "/call-of-cthulhu-cover.png",
    genres: ["Horror", "Cosmic Horror", "Short Story"],
    duration: "2h",
    chapters: [
      { id: "ch-1", title: "The Horror in Clay", duration: "30m" },
      { id: "ch-2", title: "The Tale of Inspector Legrasse", duration: "45m" },
      { id: "ch-3", title: "The Madness from the Sea", duration: "45m" },
    ],
  },
  {
    id: "the-prophet",
    title: "The Prophet",
    author: "Kahlil Gibran",
    description:
      "The book is a collection of 26 poetic essays covering all aspects of human life, including love, marriage, children, giving, eating and drinking, work, joy and sorrow, housing, clothes, buying and selling, crime and punishment, laws, freedom, reason and passion, pain, self-knowledge, teaching, friendship, talking, time, good and evil, prayer, pleasure, beauty, religion, and death.",
    coverUrl: "/the-prophet-cover.png",
    genres: ["Poetry", "Philosophy", "Spirituality"],
    duration: "2h",
    chapters: [
      { id: "ch-1", title: "The Coming of the Ship", duration: "5m" },
      { id: "ch-2", title: "On Love", duration: "7m" },
      { id: "ch-3", title: "On Marriage", duration: "6m" },
      { id: "ch-4", title: "On Children", duration: "5m" },
      { id: "ch-5", title: "On Giving", duration: "6m" },
      // More chapters would be added here
    ],
  },
  {
    id: "peter-pan",
    title: "Peter Pan",
    author: "J. M. Barrie",
    description:
      "The magical story of Peter Pan, the boy who never grew up. Peter teaches Wendy, John, and Michael Darling to fly and takes them to the island of Neverland, where they have adventures with mermaids, Indians, and pirates, especially the villainous Captain Hook.",
    coverUrl: "/peter-pan-cover.png",
    genres: ["Children", "Fantasy", "Adventure"],
    duration: "5h",
    chapters: [
      { id: "ch-1", title: "Peter Breaks Through", duration: "20m" },
      { id: "ch-2", title: "The Shadow", duration: "18m" },
      { id: "ch-3", title: "Come Away, Come Away!", duration: "22m" },
      { id: "ch-4", title: "The Flight", duration: "19m" },
      { id: "ch-5", title: "The Island Come True", duration: "21m" },
      // More chapters would be added here
    ],
  },
  {
    id: "room-with-a-view",
    title: "A Room With a View",
    author: "E. M. Forster",
    description:
      "The story of a young English woman, Lucy Honeychurch, whose trip to Italy with her cousin Charlotte Bartlett leads to an internal struggle between the demands of social convention and the stirrings of her passionate, independent nature, especially after meeting the unconventional George Emerson.",
    coverUrl: "/room-with-a-view-cover.png",
    genres: ["Classics", "Romance", "Fiction"],
    duration: "6h",
    chapters: [
      { id: "ch-1", title: "The Bertolini", duration: "25m" },
      { id: "ch-2", title: "In Santa Croce with No Baedeker", duration: "28m" },
      { id: "ch-3", title: "Music, Violets, and the Letter S", duration: "26m" },
      { id: "ch-4", title: "Fourth Chapter", duration: "24m" },
      { id: "ch-5", title: "Possibilities of a Pleasant Outing", duration: "27m" },
      // More chapters would be added here
    ],
  },
  {
    id: "art-of-war",
    title: "The Art of War",
    author: "Sun Tzu",
    description:
      "An ancient Chinese military treatise dating from the Late Spring and Autumn Period. The work, which is attributed to the ancient Chinese military strategist Sun Tzu, is composed of 13 chapters. Each one is devoted to an aspect of warfare and how it applies to military strategy and tactics.",
    coverUrl: "/art-of-war-cover.png",
    genres: ["Classics", "Philosophy", "Military"],
    duration: "1h 30m",
    chapters: [
      { id: "ch-1", title: "Laying Plans", duration: "7m" },
      { id: "ch-2", title: "Waging War", duration: "6m" },
      { id: "ch-3", title: "Attack by Stratagem", duration: "8m" },
      { id: "ch-4", title: "Tactical Dispositions", duration: "7m" },
      { id: "ch-5", title: "Energy", duration: "7m" },
      // More chapters would be added here
    ],
  },

  // New books
  {
    id: "moby-dick",
    title: "Moby Dick",
    author: "Herman Melville",
    description:
      "The novel follows the journey of the wandering sailor Ishmael and his voyage on the whaleship Pequod, commanded by Captain Ahab. Ishmael soon learns that Ahab seeks one specific whale: Moby Dick, a ferocious, enigmatic white sperm whale. In a previous encounter, the whale destroyed Ahab's boat and bit off his leg. Ahab intends to take revenge.",
    coverUrl: "/moby-dick-cover.png",
    genres: ["Classics", "Adventure", "Literary"],
    duration: "21h 30m",
    chapters: [
      { id: "ch-1", title: "Loomings", duration: "25m" },
      { id: "ch-2", title: "The Carpet-Bag", duration: "18m" },
      { id: "ch-3", title: "The Spouter-Inn", duration: "32m" },
      { id: "ch-4", title: "The Counterpane", duration: "15m" },
      { id: "ch-5", title: "Breakfast", duration: "12m" },
      // More chapters would be added here
    ],
  },
  {
    id: "adventures-of-huckleberry-finn",
    title: "Adventures of Huckleberry Finn",
    author: "Mark Twain",
    description:
      "Commonly named among the Great American Novels, the work is among the first in major American literature to be written throughout in vernacular English, characterized by local color regionalism. It is told in the first person by Huckleberry 'Huck' Finn, the narrator of two other Twain novels and a friend of Tom Sawyer.",
    coverUrl: "/huckleberry-finn-cover.png",
    genres: ["Classics", "Adventure", "Satire"],
    duration: "11h 15m",
    chapters: [
      { id: "ch-1", title: "Chapter 1", duration: "18m" },
      { id: "ch-2", title: "Chapter 2", duration: "22m" },
      { id: "ch-3", title: "Chapter 3", duration: "19m" },
      { id: "ch-4", title: "Chapter 4", duration: "21m" },
      { id: "ch-5", title: "Chapter 5", duration: "17m" },
      // More chapters would be added here
    ],
  },
  {
    id: "picture-of-dorian-gray",
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    description:
      "The novel tells of a young man named Dorian Gray, the subject of a painting by artist Basil Hallward. Basil is impressed by Dorian's beauty and becomes infatuated with him, believing his beauty is responsible for a new mode in his art. Dorian meets Lord Henry Wotton, a friend of Basil's, and becomes enthralled by Lord Henry's world view.",
    coverUrl: "/dorian-gray-cover.png",
    genres: ["Classics", "Gothic", "Horror", "Philosophical"],
    duration: "8h 45m",
    chapters: [
      { id: "ch-1", title: "Chapter 1", duration: "35m" },
      { id: "ch-2", title: "Chapter 2", duration: "32m" },
      { id: "ch-3", title: "Chapter 3", duration: "28m" },
      { id: "ch-4", title: "Chapter 4", duration: "30m" },
      { id: "ch-5", title: "Chapter 5", duration: "33m" },
      // More chapters would be added here
    ],
  },
  {
    id: "little-women",
    title: "Little Women",
    author: "Louisa May Alcott",
    description:
      "The novel follows the lives of the four March sisters—Meg, Jo, Beth, and Amy—and details their passage from childhood to womanhood. It is loosely based on the lives of the author and her three sisters. Scholars classify it as an autobiographical or semi-autobiographical novel.",
    coverUrl: "/little-women-cover.png",
    genres: ["Classics", "Fiction", "Coming of Age"],
    duration: "17h 30m",
    chapters: [
      { id: "ch-1", title: "Playing Pilgrims", duration: "28m" },
      { id: "ch-2", title: "A Merry Christmas", duration: "32m" },
      { id: "ch-3", title: "The Laurence Boy", duration: "30m" },
      { id: "ch-4", title: "Burdens", duration: "25m" },
      { id: "ch-5", title: "Being Neighborly", duration: "29m" },
      // More chapters would be added here
    ],
  },
  {
    id: "scarlet-letter",
    title: "The Scarlet Letter",
    author: "Nathaniel Hawthorne",
    description:
      "Set in Puritan Massachusetts Bay Colony during the years 1642 to 1649, the novel tells the story of Hester Prynne, who conceives a daughter through an affair and then struggles to create a new life of repentance and dignity. Throughout the book, Hawthorne explores themes of legalism, sin, and guilt.",
    coverUrl: "/scarlet-letter-cover.png",
    genres: ["Classics", "Historical Fiction", "Romance"],
    duration: "7h 45m",
    chapters: [
      { id: "ch-1", title: "The Prison Door", duration: "10m" },
      { id: "ch-2", title: "The Market Place", duration: "25m" },
      { id: "ch-3", title: "The Recognition", duration: "22m" },
      { id: "ch-4", title: "The Interview", duration: "20m" },
      { id: "ch-5", title: "Hester at Her Needle", duration: "24m" },
      // More chapters would be added here
    ],
  },
  {
    id: "odyssey",
    title: "The Odyssey",
    author: "Homer",
    description:
      "The Odyssey is one of two major ancient Greek epic poems attributed to Homer. It is one of the oldest extant works of literature still read by contemporary audiences. As with the Iliad, the poem is divided into 24 books. It follows the Greek hero Odysseus, king of Ithaca, and his journey home after the Trojan War.",
    coverUrl: "/odyssey-cover.png",
    genres: ["Classics", "Epic Poetry", "Adventure"],
    duration: "12h 15m",
    chapters: [
      { id: "ch-1", title: "Book 1", duration: "30m" },
      { id: "ch-2", title: "Book 2", duration: "28m" },
      { id: "ch-3", title: "Book 3", duration: "32m" },
      { id: "ch-4", title: "Book 4", duration: "35m" },
      { id: "ch-5", title: "Book 5", duration: "30m" },
      // More chapters would be added here
    ],
  },
  {
    id: "count-of-monte-cristo",
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    description:
      "The story takes place in France, Italy, and islands in the Mediterranean during the historical events of 1815–1839: the era of the Bourbon Restoration through the reign of Louis-Philippe of France. It begins on the day that Napoleon left his first island of exile, Elba, beginning the Hundred Days period when Napoleon returned to power.",
    coverUrl: "/monte-cristo-cover.png",
    genres: ["Classics", "Adventure", "Historical Fiction"],
    duration: "52h 30m",
    chapters: [
      { id: "ch-1", title: "Marseilles—The Arrival", duration: "35m" },
      { id: "ch-2", title: "Father and Son", duration: "32m" },
      { id: "ch-3", title: "The Catalans", duration: "30m" },
      { id: "ch-4", title: "Conspiracy", duration: "28m" },
      { id: "ch-5", title: "The Marriage Feast", duration: "33m" },
      // More chapters would be added here
    ],
  },
  {
    id: "war-and-peace",
    title: "War and Peace",
    author: "Leo Tolstoy",
    description:
      "Epic in scale, War and Peace delineates in graphic detail events leading up to Napoleon's invasion of Russia, and the impact of the Napoleonic era on Tsarist society, as seen through the eyes of five Russian aristocratic families.",
    coverUrl: "/war-and-peace-cover.png",
    genres: ["Classics", "Historical Fiction", "Literary"],
    duration: "60h 45m",
    chapters: [
      { id: "ch-1", title: "Book One: 1805, Chapter 1", duration: "18m" },
      { id: "ch-2", title: "Book One: 1805, Chapter 2", duration: "22m" },
      { id: "ch-3", title: "Book One: 1805, Chapter 3", duration: "20m" },
      { id: "ch-4", title: "Book One: 1805, Chapter 4", duration: "19m" },
      { id: "ch-5", title: "Book One: 1805, Chapter 5", duration: "21m" },
      // More chapters would be added here
    ],
  },
  {
    id: "jungle-book",
    title: "The Jungle Book",
    author: "Rudyard Kipling",
    description:
      "The Jungle Book is a collection of stories by the English author Rudyard Kipling. Most of the characters are animals such as Shere Khan the tiger and Baloo the bear, though a principal character is the boy or 'man-cub' Mowgli, who is raised in the jungle by wolves.",
    coverUrl: "/jungle-book-cover.png",
    genres: ["Classics", "Children", "Adventure"],
    duration: "5h 15m",
    chapters: [
      { id: "ch-1", title: "Mowgli's Brothers", duration: "45m" },
      { id: "ch-2", title: "Hunting-Song of the Seeonee Pack", duration: "5m" },
      { id: "ch-3", title: "Kaa's Hunting", duration: "50m" },
      { id: "ch-4", title: "Road-Song of the Bandar-Log", duration: "5m" },
      { id: "ch-5", title: "Tiger! Tiger!", duration: "40m" },
      // More chapters would be added here
    ],
  },
  {
    id: "time-machine",
    title: "The Time Machine",
    author: "H.G. Wells",
    description:
      "The work is generally credited with the popularization of the concept of time travel by using a vehicle or device to travel purposely and selectively forward or backward through time. The term 'time machine', coined by Wells, is now almost universally used to refer to such a vehicle or device.",
    coverUrl: "/time-machine-cover.png",
    genres: ["Classics", "Science Fiction", "Adventure"],
    duration: "3h 30m",
    chapters: [
      { id: "ch-1", title: "Chapter 1", duration: "25m" },
      { id: "ch-2", title: "Chapter 2", duration: "22m" },
      { id: "ch-3", title: "Chapter 3", duration: "20m" },
      { id: "ch-4", title: "Chapter 4", duration: "18m" },
      { id: "ch-5", title: "Chapter 5", duration: "23m" },
      // More chapters would be added here
    ],
  },
  {
    id: "importance-of-being-earnest",
    title: "The Importance of Being Earnest",
    author: "Oscar Wilde",
    description:
      "The Importance of Being Earnest, A Trivial Comedy for Serious People is a play by Oscar Wilde. First performed on 14 February 1895 at the St James's Theatre in London, it is a farcical comedy in which the protagonists maintain fictitious personae to escape burdensome social obligations.",
    coverUrl: "/earnest-cover.png",
    genres: ["Classics", "Comedy", "Play"],
    duration: "2h 15m",
    chapters: [
      { id: "ch-1", title: "Act 1", duration: "45m" },
      { id: "ch-2", title: "Act 2", duration: "40m" },
      { id: "ch-3", title: "Act 3", duration: "50m" },
    ],
  },
  {
    id: "wuthering-heights",
    title: "Wuthering Heights",
    author: "Emily Brontë",
    description:
      "Wuthering Heights is Emily Brontë's only novel. It was first published in 1847 under the pseudonym Ellis Bell, and a posthumous second edition was edited by her sister Charlotte. The name of the novel comes from the Yorkshire manor on the moors on which the story centers.",
    coverUrl: "/wuthering-heights-cover.png",
    genres: ["Classics", "Gothic", "Romance"],
    duration: "13h 45m",
    chapters: [
      { id: "ch-1", title: "Chapter 1", duration: "28m" },
      { id: "ch-2", title: "Chapter 2", duration: "25m" },
      { id: "ch-3", title: "Chapter 3", duration: "30m" },
      { id: "ch-4", title: "Chapter 4", duration: "32m" },
      { id: "ch-5", title: "Chapter 5", duration: "27m" },
      // More chapters would be added here
    ],
  },
  {
    id: "jane-eyre",
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    description:
      "Jane Eyre follows the experiences of its eponymous heroine, including her growth to adulthood and her love for Mr. Rochester, the brooding master of Thornfield Hall. The novel revolutionized prose fiction by being the first to focus on its protagonist's moral and spiritual development through an intimate first-person narrative.",
    coverUrl: "/jane-eyre-cover.png",
    genres: ["Classics", "Gothic", "Romance"],
    duration: "18h 30m",
    chapters: [
      { id: "ch-1", title: "Chapter 1", duration: "22m" },
      { id: "ch-2", title: "Chapter 2", duration: "25m" },
      { id: "ch-3", title: "Chapter 3", duration: "20m" },
      { id: "ch-4", title: "Chapter 4", duration: "24m" },
      { id: "ch-5", title: "Chapter 5", duration: "23m" },
      // More chapters would be added here
    ],
  },
  {
    id: "republic",
    title: "The Republic",
    author: "Plato",
    description:
      "The Republic is a Socratic dialogue, authored by Plato around 375 BCE, concerning justice, the order and character of the just city-state, and the just man. It is Plato's best-known work, and has proven to be one of the world's most influential works of philosophy and political theory.",
    coverUrl: "/republic-cover.png",
    genres: ["Classics", "Philosophy", "Political"],
    duration: "12h 15m",
    chapters: [
      { id: "ch-1", title: "Book I", duration: "1h 5m" },
      { id: "ch-2", title: "Book II", duration: "1h 10m" },
      { id: "ch-3", title: "Book III", duration: "1h 15m" },
      { id: "ch-4", title: "Book IV", duration: "1h 5m" },
      { id: "ch-5", title: "Book V", duration: "1h 20m" },
      // More chapters would be added here
    ],
  },
  {
    id: "iliad",
    title: "The Iliad",
    author: "Homer",
    description:
      "The Iliad is an ancient Greek epic poem in dactylic hexameter, traditionally attributed to Homer. Set during the Trojan War, the ten-year siege of the city of Troy by a coalition of Greek states, it tells of the battles and events during the weeks of a quarrel between King Agamemnon and the warrior Achilles.",
    coverUrl: "/iliad-cover.png",
    genres: ["Classics", "Epic Poetry", "War"],
    duration: "14h 30m",
    chapters: [
      { id: "ch-1", title: "Book 1", duration: "35m" },
      { id: "ch-2", title: "Book 2", duration: "40m" },
      { id: "ch-3", title: "Book 3", duration: "32m" },
      { id: "ch-4", title: "Book 4", duration: "30m" },
      { id: "ch-5", title: "Book 5", duration: "38m" },
      // More chapters would be added here
    ],
  },
  {
    id: "don-quixote",
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    description:
      "The plot revolves around the adventures of a noble from La Mancha named Alonso Quixano, who reads so many chivalric romances that he loses his mind and decides to become a knight-errant to revive chivalry and serve his nation, under the name Don Quixote de la Mancha.",
    coverUrl: "/don-quixote-cover.png",
    genres: ["Classics", "Satire", "Adventure"],
    duration: "36h 45m",
    chapters: [
      { id: "ch-1", title: "Part 1, Chapter 1", duration: "25m" },
      { id: "ch-2", title: "Part 1, Chapter 2", duration: "28m" },
      { id: "ch-3", title: "Part 1, Chapter 3", duration: "22m" },
      { id: "ch-4", title: "Part 1, Chapter 4", duration: "24m" },
      { id: "ch-5", title: "Part 1, Chapter 5", duration: "26m" },
      // More chapters would be added here
    ],
  },
  {
    id: "divine-comedy",
    title: "The Divine Comedy",
    author: "Dante Alighieri",
    description:
      "The Divine Comedy is an Italian narrative poem by Dante Alighieri, which is widely considered the pre-eminent work in Italian literature and one of the greatest works of world literature. The poem's imaginative vision of the afterlife is representative of the medieval world-view as it had developed in the Western Church.",
    coverUrl: "/divine-comedy-cover.png",
    genres: ["Classics", "Epic Poetry", "Religious"],
    duration: "12h 30m",
    chapters: [
      { id: "ch-1", title: "Inferno, Canto I", duration: "15m" },
      { id: "ch-2", title: "Inferno, Canto II", duration: "18m" },
      { id: "ch-3", title: "Inferno, Canto III", duration: "16m" },
      { id: "ch-4", title: "Inferno, Canto IV", duration: "17m" },
      { id: "ch-5", title: "Inferno, Canto V", duration: "15m" },
      // More chapters would be added here
    ],
  },
  {
    id: "crime-and-punishment",
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    description:
      "Crime and Punishment focuses on the mental anguish and moral dilemmas of Rodion Raskolnikov, an impoverished ex-student in Saint Petersburg who formulates a plan to kill an unscrupulous pawnbroker for her money. Before the killing, Raskolnikov believes that with the money he could liberate himself from poverty and go on to perform great deeds.",
    coverUrl: "/crime-and-punishment-cover.png",
    genres: ["Classics", "Psychological", "Literary"],
    duration: "20h 15m",
    chapters: [
      { id: "ch-1", title: "Part 1, Chapter 1", duration: "35m" },
      { id: "ch-2", title: "Part 1, Chapter 2", duration: "32m" },
      { id: "ch-3", title: "Part 1, Chapter 3", duration: "30m" },
      { id: "ch-4", title: "Part 1, Chapter 4", duration: "28m" },
      { id: "ch-5", title: "Part 1, Chapter 5", duration: "33m" },
      // More chapters would be added here
    ],
  },
  {
    id: "brothers-karamazov",
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    description:
      "The Brothers Karamazov is the final novel by the Russian author Fyodor Dostoevsky. Dostoevsky spent nearly two years writing The Brothers Karamazov, which was published as a serial in The Russian Messenger from January 1879 to November 1880.",
    coverUrl: "/brothers-karamazov-cover.png",
    genres: ["Classics", "Philosophical", "Literary"],
    duration: "34h 45m",
    chapters: [
      { id: "ch-1", title: "Book 1, Chapter 1", duration: "25m" },
      { id: "ch-2", title: "Book 1, Chapter 2", duration: "28m" },
      { id: "ch-3", title: "Book 1, Chapter 3", duration: "30m" },
      { id: "ch-4", title: "Book 2, Chapter 1", duration: "32m" },
      { id: "ch-5", title: "Book 2, Chapter 2", duration: "27m" },
      // More chapters would be added here
    ],
  },
  {
    id: "anna-karenina",
    title: "Anna Karenina",
    author: "Leo Tolstoy",
    description:
      "Anna Karenina is a novel by the Russian author Leo Tolstoy, first published in book form in 1878. Widely considered to be one of the greatest works of literature ever written, Tolstoy himself called it his first true novel.",
    coverUrl: "/anna-karenina-cover.png",
    genres: ["Classics", "Romance", "Literary"],
    duration: "35h 30m",
    chapters: [
      { id: "ch-1", title: "Part 1, Chapter 1", duration: "18m" },
      { id: "ch-2", title: "Part 1, Chapter 2", duration: "22m" },
      { id: "ch-3", title: "Part 1, Chapter 3", duration: "20m" },
      { id: "ch-4", title: "Part 1, Chapter 4", duration: "19m" },
      { id: "ch-5", title: "Part 1, Chapter 5", duration: "21m" },
      // More chapters would be added here
    ],
  },
]

export function getAllBooks(): Book[] {
  return books
}

export function getBookById(id: string): Book | undefined {
  return books.find((book) => book.id === id)
}
