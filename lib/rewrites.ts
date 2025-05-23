import type { Rewrite } from "@/types/rewrite"

// Mock data for rewrites
const rewrites: Rewrite[] = [
  // Pride and Prejudice
  {
    id: "original-pride",
    bookId: "pride-and-prejudice",
    name: "Original",
    type: "original",
    sample:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
  },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `james-${i + 1}-pride`,
    bookId: "pride-and-prejudice",
    name: `James #${i + 1}`,
    type: "james",
    sample: `It's widely known that a wealthy bachelor is definitely looking for a wife. (James variant #${i + 1})`,
  })),

  // The Great Gatsby
  {
    id: "original-gatsby",
    bookId: "the-great-gatsby",
    name: "Original",
    type: "original",
    sample:
      "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.",
  },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `james-${i + 1}-gatsby`,
    bookId: "the-great-gatsby",
    name: `James #${i + 1}`,
    type: "james",
    sample: `When I was young and impressionable, my dad told me something I've never forgotten. (James variant #${
      i + 1
    })`,
  })),

  // Mrs Dalloway
  {
    id: "original-dalloway",
    bookId: "mrs-dalloway",
    name: "Original",
    type: "original",
    sample: "Mrs. Dalloway said she would buy the flowers herself. For Lucy had her work cut out for her.",
  },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `james-${i + 1}-dalloway`,
    bookId: "mrs-dalloway",
    name: `James #${i + 1}`,
    type: "james",
    sample: `Clarissa decided to get the flowers on her own. Lucy already had enough to do. (James variant #${i + 1})`,
  })),

  // The Sun Also Rises
  {
    id: "original-sun",
    bookId: "the-sun-also-rises",
    name: "Original",
    type: "original",
    sample:
      "Robert Cohn was once middleweight boxing champion of Princeton. Do not think that I am very much impressed by that as a boxing title, but it meant a lot to Cohn.",
  },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `james-${i + 1}-sun`,
    bookId: "the-sun-also-rises",
    name: `James #${i + 1}`,
    type: "james",
    sample: `Robert Cohn used to be Princeton's middleweight boxing champ. I'm not particularly impressed by that title, but Cohn sure was. (James variant #${
      i + 1
    })`,
  })),

  // Winnie-the-Pooh
  {
    id: "original-pooh",
    bookId: "winnie-the-pooh",
    name: "Original",
    type: "original",
    sample:
      "Here is Edward Bear, coming downstairs now, bump, bump, bump, on the back of his head, behind Christopher Robin.",
  },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `james-${i + 1}-pooh`,
    bookId: "winnie-the-pooh",
    name: `James #${i + 1}`,
    type: "james",
    sample: `Here's Edward Bear, coming down the stairs - bump, bump, bump - on his head, following Christopher Robin. (James variant #${
      i + 1
    })`,
  })),

  // Sherlock Holmes
  {
    id: "original-sherlock",
    bookId: "sherlock-holmes",
    name: "Original",
    type: "original",
    sample: "To Sherlock Holmes she is always THE woman. I have seldom heard him mention her under any other name.",
  },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `james-${i + 1}-sherlock`,
    bookId: "sherlock-holmes",
    name: `James #${i + 1}`,
    type: "james",
    sample: `For Holmes, she was simply THE woman. He rarely called her anything else. (James variant #${i + 1})`,
  })),

  // Frankenstein
  {
    id: "original-frankenstein",
    bookId: "frankenstein",
    name: "Original",
    type: "original",
    sample:
      "You will rejoice to hear that no disaster has accompanied the commencement of an enterprise which you have regarded with such evil forebodings.",
  },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `james-${i + 1}-frankenstein`,
    bookId: "frankenstein",
    name: `James #${i + 1}`,
    type: "james",
    sample: `You'll be happy to know that nothing bad happened at the start of this project you were so worried about. (James variant #${
      i + 1
    })`,
  })),

  // Dracula
  {
    id: "original-dracula",
    bookId: "dracula",
    name: "Original",
    type: "original",
    sample:
      "3 May. Bistritz.—Left Munich at 8:35 P.M., on 1st May, arriving at Vienna early next morning; should have arrived at 6:46, but train was an hour late.",
  },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `james-${i + 1}-dracula`,
    bookId: "dracula",
    name: `James #${i + 1}`,
    type: "james",
    sample: `May 3rd, Bistritz. I left Munich at 8:35 PM on May 1st and got to Vienna early the next day. Should've arrived at 6:46, but the train was running late. (James variant #${
      i + 1
    })`,
  })),

  // Frederick Douglass
  {
    id: "original-douglass",
    bookId: "frederick-douglass",
    name: "Original",
    type: "original",
    sample:
      "I was born in Tuckahoe, near Hillsborough, and about twelve miles from Easton, in Talbot county, Maryland.",
  },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `james-${i + 1}-douglass`,
    bookId: "frederick-douglass",
    name: `James #${i + 1}`,
    type: "james",
    sample: `I came into this world in Tuckahoe, close to Hillsborough and roughly twelve miles from Easton in Maryland's Talbot county. (James variant #${
      i + 1
    })`,
  })),

  // The Secret Garden
  {
    id: "original-garden",
    bookId: "the-secret-garden",
    name: "Original",
    type: "original",
    sample:
      "When Mary Lennox was sent to Misselthwaite Manor to live with her uncle everybody said she was the most disagreeable-looking child ever seen.",
  },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `james-${i + 1}-garden`,
    bookId: "the-secret-garden",
    name: `James #${i + 1}`,
    type: "james",
    sample: `When Mary Lennox went to live with her uncle at Misselthwaite Manor, everyone thought she was the most unpleasant-looking kid they'd ever laid eyes on. (James variant #${
      i + 1
    })`,
  })),

  // Call of Cthulhu
  {
    id: "original-cthulhu",
    bookId: "call-of-cthulhu",
    name: "Original",
    type: "original",
    sample:
      "The most merciful thing in the world, I think, is the inability of the human mind to correlate all its contents.",
  },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `james-${i + 1}-cthulhu`,
    bookId: "call-of-cthulhu",
    name: `James #${i + 1}`,
    type: "james",
    sample: `I believe the greatest blessing we have is that our brains can't connect all the dots. (James variant #${
      i + 1
    })`,
  })),

  // The Prophet
  {
    id: "original-prophet",
    bookId: "the-prophet",
    name: "Original",
    type: "original",
    sample:
      "Almustafa, the chosen and the beloved, who was a dawn unto his own day, had waited twelve years in the city of Orphalese for his ship that was to return and bear him back to the isle of his birth.",
  },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `james-${i + 1}-prophet`,
    bookId: "the-prophet",
    name: `James #${i + 1}`,
    type: "james",
    sample: `Almustafa, beloved and chosen, who brought light to his generation, had spent twelve years in Orphalese waiting for the ship that would take him back to his homeland. (James variant #${
      i + 1
    })`,
  })),

  // Peter Pan
  {
    id: "original-peter",
    bookId: "peter-pan",
    name: "Original",
    type: "original",
    sample:
      "All children, except one, grow up. They soon know that they will grow up, and the way Wendy knew was this.",
  },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `james-${i + 1}-peter`,
    bookId: "peter-pan",
    name: `James #${i + 1}`,
    type: "james",
    sample: `Every child grows up, except for one. They figure this out pretty quickly, and here's how Wendy discovered it. (James variant #${
      i + 1
    })`,
  })),

  // A Room With a View
  {
    id: "original-room",
    bookId: "room-with-a-view",
    name: "Original",
    type: "original",
    sample:
      "The Signora had no business to do it, said Miss Bartlett, no business at all. She promised us south rooms with a view close together, instead of which here are north rooms, looking into a courtyard, and a long way apart.",
  },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `james-${i + 1}-room`,
    bookId: "room-with-a-view",
    name: `James #${i + 1}`,
    type: "james",
    sample: `Miss Bartlett complained that the Signora had no right to do this. She'd promised them south-facing rooms with views, side by side, but instead they got north rooms overlooking a courtyard, far from each other. (James variant #${
      i + 1
    })`,
  })),

  // The Art of War
  {
    id: "original-war",
    bookId: "art-of-war",
    name: "Original",
    type: "original",
    sample:
      "The art of war is of vital importance to the State. It is a matter of life and death, a road either to safety or to ruin.",
  },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `james-${i + 1}-war`,
    bookId: "art-of-war",
    name: `James #${i + 1}`,
    type: "james",
    sample: `Military strategy is crucial for any nation. It determines survival or destruction, security or downfall. (James variant #${
      i + 1
    })`,
  })),
]

export function getAllRewrites(): Rewrite[] {
  return rewrites
}

export function getRewritesByBookId(bookId: string): Rewrite[] {
  return rewrites.filter((rewrite) => rewrite.bookId === bookId)
}

export function getRewriteById(id: string): Rewrite | undefined {
  return rewrites.find((rewrite) => rewrite.id === id)
}
