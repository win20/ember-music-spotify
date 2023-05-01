import './promodoro-player.css';

const PromodoroPlayer = () => {
  const playSong = () => {
    const spotifyEmbed = (
      document.querySelector(
        'iframe[src*="spotify.com/embed"]'
      ) as HTMLIFrameElement
    ).contentWindow;
    spotifyEmbed?.postMessage({ command: 'toggle' }, '*');
  };

  return (
    <div id="PromodoroPlayer">
      <button onClick={playSong}>Play</button>
      <iframe
        src="https://open.spotify.com/embed/track/1Acgi7wxVD9OF3iQnFe8Q4?utm_source=generator"
        width="100%"
        height="152"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default PromodoroPlayer;
