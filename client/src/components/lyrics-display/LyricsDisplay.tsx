import './lyrics-display.css';

const LyricsDisplay = (props: { lyricsArray: string[] }) => {
  return (
    <div id="lyrics-display-container">
      <h2>Lyrics</h2>
      {props.lyricsArray.map((item: any) => {
        return <div className="lyrics-line">{item}</div>;
      })}
    </div>
  );
};

export default LyricsDisplay;
