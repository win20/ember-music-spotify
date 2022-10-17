import 'components/recommendation-form/recommendation-form.css';
import { useState, useEffect } from 'react';
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  window.addEventListener('click', (e) => {
    if (!document.querySelector('.dd-wrapper').contains(e.target)) {
      setIsDropdownOpen(false);
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedMusicGenre === musicGenresList[0].title) {
      setFormValidationMessage('Please select a music genre');
    } else {
      setFormValidationMessage(null);
    }
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
        <input required type="text" />

        <label htmlFor="album">Album</label>
        <input required type="text" />

        <button onClick={handleSubmit}>Go!</button>
      </form>
      {formValidationMessage && <p>{formValidationMessage}</p>}
    </div>
  );
};

export default RecommendationForm;
