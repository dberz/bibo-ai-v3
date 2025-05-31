"use client";
import { Play, Pause, Scissors, Rocket, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/lib/player/player-context";
import type { AudioVersionId } from "@/lib/player/player-context";
import type { Book } from "@/types/book";
import { useState, useEffect } from "react";

export function QuickTransformations({ book }: { book: Book }) {
  const { setVersion, setCurrentBook, play, pause, isPlaying, currentVersion, currentBook } = usePlayer();
  const [pending, setPending] = useState<{ version: AudioVersionId | null; bookId: string | null }>({ version: null, bookId: null });

  useEffect(() => {
    if (
      pending.version &&
      pending.bookId &&
      currentVersion === pending.version &&
      currentBook?.id === pending.bookId
    ) {
      play();
      setPending({ version: null, bookId: null });
    }
  }, [currentVersion, currentBook, pending, play]);

  const quickVersions = [
    {
      id: "SHORTENED" as AudioVersionId,
      label: "Dramatically Shortened",
      icon: <Scissors className="h-5 w-5 text-emerald-500" />,
    },
    {
      id: "SCIFI" as AudioVersionId,
      label: "Sci-Fi Reimagination",
      icon: <Rocket className="h-5 w-5 text-emerald-500" />,
    },
    {
      id: "SPANISH" as AudioVersionId,
      label: "Spanish Translation",
      icon: <Globe className="h-5 w-5 text-emerald-500" />,
    },
    {
      id: "YA" as AudioVersionId,
      label: "Modern YA Adventure",
      icon: <Sparkles className="h-5 w-5 text-emerald-500" />,
    },
  ];

  return (
    <div className="flex flex-row gap-2 justify-start items-stretch mt-2 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
      {quickVersions.map((v) => (
        <div
          key={v.id}
          className="flex flex-col items-center justify-between bg-[#10151c] border border-emerald-900 rounded-lg px-3 py-4 shadow-sm min-w-[120px] group"
          style={{ minWidth: 140 }}
        >
          <span>{v.icon}</span>
          <span
            className="text-sm font-semibold text-white mt-2 text-center group-hover:text-emerald-400 break-words whitespace-normal"
            style={{ lineHeight: 1.1, minHeight: 38 }}
          >
            {v.label}
          </span>
          <Button
            className={`mt-3 w-full ${isPlaying && currentVersion === v.id && currentBook?.id === book.id ? 'bg-emerald-900' : 'bg-emerald-700 hover:bg-emerald-600'} text-white`}
            onClick={async () => {
              pause();
              setVersion(v.id);
              setCurrentBook(book);
              setPending({ version: v.id, bookId: book.id });
            }}
          >
            {isPlaying && currentVersion === v.id && currentBook?.id === book.id ? (
              <>
                <Pause className="h-4 w-4 mr-1" /> Playing
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-1" /> Play Now
              </>
            )}
          </Button>
        </div>
      ))}
    </div>
  );
} 