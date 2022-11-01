import 'components/recommendation-form/recommendation-form.css';
import { useState } from 'react';
import downArrow from 'assets/icons/down-arrow.png';
import axios from 'axios';

const musicGenresList = [
  {
    id: 0,
    title: 'Music Genres',
    selected: false,
    key: 'musicGenre',
  },
  {
    id: 1,
    title: 'Pop',
    selected: false,
    key: 'musicGenre',
  },
  {
    id: 2,
    title: 'Rock',
    selected: false,
    key: 'musicGenre',
  },
  {
    id: 3,
    title: 'Blues',
    selected: false,
    key: 'musicGenre',
  },
  {
    id: 4,
    title: 'Accoustic',
    selected: false,
    key: 'musicGenre',
  },
  {
    id: 5,
    title: 'Electronic',
    selected: false,
    key: 'musicGenre',
  },
  {
    id: 6,
    title: 'Classical',
    selected: false,
    key: 'musicGenre',
  },
  {
    id: 7,
    title: 'K-pop',
    selected: false,
    key: 'musicGenre',
  },
  {
    id: 8,
    title: 'Sad',
    selected: false,
    key: 'musicGenre',
  },
];

function DropdownItem({ setSelectedMusicGenre, setIsDropdownOpen }) {
  const selectMusicGenre = (e) => {
    setSelectedMusicGenre(musicGenresList[e.target.id].title);
    setIsDropdownOpen(false);
  };

  const items = musicGenresList.map((i) => (
    <li
      key={i.id}
      id={i.id}
      className="dropdownItem"
      onClick={selectMusicGenre}
    >
      {i.title}
    </li>
  ));
  return items;
}

const RecommendationForm = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMusicGenre, setSelectedMusicGenre] = useState(
    musicGenresList[0].title
  );
  const [formValidationMessage, setFormValidationMessage] = useState(null);
  const [songsList, setSongsList] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  window.addEventListener('click', (e) => {
    if (!document.querySelector('.dd-wrapper').contains(e.target)) {
      setIsDropdownOpen(false);
    }
  });

  const checkSpecailChars = (str) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let genre = selectedMusicGenre;
    let artist = document.querySelector('#artistInput').value;
    let song = document.querySelector('#songInput').value;

    if (selectedMusicGenre === musicGenresList[0].title) {
      setFormValidationMessage('Please select a music genre');
    } else if (checkSpecailChars(artist) || checkSpecailChars(song)) {
      setFormValidationMessage('Special characters are not allowed');
    } else {
      setFormValidationMessage(null);
    }

    let artistId;
    await axios
      .get(`http://localhost:3001/spotify/searchItem`, {
        params: { search: artist, searchType: 'artist' },
      })
      .then((response) => {
        artistId = response.data.artists.items[0].id;
        // console.log(response.data.artists.items[0].id);
        // console.log(response.data);
      });

    let songId;
    await axios
      .get(`http://localhost:3001/spotify/searchItem`, {
        params: { search: song, searchType: 'track' },
      })
      .then((response) => {
        songId = response.data.tracks.items[0].id;
        // console.log(response.data.tracks.items[0].id);
        // console.log(response.data);
      });

    await axios
      .get(`http://localhost:3001/spotify/getRecommendations`, {
        params: {
          genre,
          artistId,
          songId,
        },
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <div className="recommendationFormContainer">
      <h3>Recommendations</h3>
      <p id="subTitle">Get music recommendations based on your criteria</p>

      <div className="dd-wrapper">
        <p className="dd-label">Genre</p>
        <div className="dd-header" onClick={toggleDropdown}>
          <div className="dd-header-title">{selectedMusicGenre}</div>
          <img className="dd-arrow" src={downArrow} alt="" />
        </div>
        <div className="dd-list">
          {isDropdownOpen && (
            <ul>
              <DropdownItem
                setSelectedMusicGenre={setSelectedMusicGenre}
                setIsDropdownOpen={setIsDropdownOpen}
              />
            </ul>
          )}
        </div>
      </div>

      <form className="recommendationsForm">
        <label htmlFor="artist">Artist</label>
        <input id="artistInput" required type="text" />

        <label htmlFor="song">Song</label>
        <input id="songInput" required type="text" />

        <button onClick={handleSubmit}>Go!</button>
      </form>
      {formValidationMessage && (
        <p id="errorMessage">{formValidationMessage}</p>
      )}
    </div>
  );
};

export default RecommendationForm;
