// utils/songPreview.ts
import { useState, useRef } from "react";

const useSongPreview = () => {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = (previewUrl: string) => {
    if (currentAudio && currentAudio.src === previewUrl) {
      if (currentAudio.paused) {
        currentAudio.play();
        setPlayingTrack(previewUrl);
      } else {
        currentAudio.pause();
        setPlayingTrack(null);
      }
      return;
    }

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const newAudio = new Audio(previewUrl);
    newAudio.play();
    newAudio.onended = () => setPlayingTrack(null); // Reset when finished

    audioRef.current = newAudio;
    setCurrentAudio(newAudio);
    setPlayingTrack(previewUrl);
  };

  return { handlePlay, playingTrack };
};

export default useSongPreview;