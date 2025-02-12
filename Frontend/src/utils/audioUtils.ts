import { useState, useRef } from "react";

const useSongPreview = () => {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null); // store the currently playing audio
  const [playingTrack, setPlayingTrack] = useState<string | null>(null); //keeps track of which song preview URL is currently playing. If a song is playing, it stores the preview URL of that song.
  const audioRef = useRef<HTMLAudioElement | null>(null); // hook avoid re-rendering.

  // This handle the play/pause
  const handlePlay = (songPreviewUrl: string) => {
    if (currentAudio && currentAudio.src === songPreviewUrl) {
      if (currentAudio.paused) { // paused is true, audio not playing.
        currentAudio.play();
        setPlayingTrack(songPreviewUrl);
      } else { // false, audio is already playing
        currentAudio.pause();
        setPlayingTrack(null);
      }
      return; // stops further execution.
    }
    
    // ensures only one song play at a time.
    if (currentAudio) { //True. Checks if there's already an audio playing
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // Create new instance. Loads and plays the new song when a different track is selected
    const newAudio = new Audio(songPreviewUrl); // next songPreviewUrl song
    newAudio.play();
    newAudio.onended = () => setPlayingTrack(null); // Reset when finished

    audioRef.current = newAudio; // stores the new object inside userRef, persist without triggering re-render.
    setCurrentAudio(newAudio); //currentAudio state is now the new instance.
    setPlayingTrack(songPreviewUrl);
  };

  return { handlePlay, playingTrack };
};

export default useSongPreview;