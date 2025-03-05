import { useEffect } from "react";

export default function SpotifyPlayer() {
  useEffect(() => {
    const playMusic = async () => {
      try {
        const token = process.env.NEXT_PUBLIC_SPOTIFY_API_KEY; // Get this from Spotify API
        await fetch(`https://api.spotify.com/v1/me/player/play`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uris: ["spotify:track:3Nj5oxn4fEoyAFZG2eiePZ"], // Track URI
            position_ms: 41000, // Start at 40 seconds
          }),
        });
      } catch (error) {
        console.error("Error playing music:", error);
      }
    };

    playMusic();
  }, []);

  return (
    <iframe
      style={{ borderRadius: "12px" }}
      src="https://open.spotify.com/embed/track/3Nj5oxn4fEoyAFZG2eiePZ?utm_source=generator&theme=0"
      width="100%"
      height="102"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
}
