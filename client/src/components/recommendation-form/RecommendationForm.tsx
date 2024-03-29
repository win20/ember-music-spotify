import './recommendation-form.css';
import { MouseEvent, SetStateAction, useState } from 'react';
import downArrow from '@assets/icons/down-arrow.png';
import axios from 'axios';
import Song from '@/models/Song';
import { Dispatch } from 'react';
import ErrorDisplay from '@components/error-display/ErrorDisplay';

const apiUrl = import.meta.env.VITE_API_URL_PREFIX;

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
];

type DropdownItemsProps = {
  setSelectedMusicGenre: Dispatch<SetStateAction<string>>;
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
};

const DropdownItems = ({
  setSelectedMusicGenre,
  setIsDropdownOpen,
}: DropdownItemsProps) => {
  const selectMusicGenre = (e: MouseEvent) => {
    const target = e.target as HTMLLIElement;
    setSelectedMusicGenre(musicGenresList[parseInt(target.id)].title);
    setIsDropdownOpen(false);
  };

  return (
    <>
      {musicGenresList.map((i) => {
        return (
          <li
            key={i.id}
            id={i.id.toString()}
            className="dropdownItem"
            onClick={selectMusicGenre}
          >
            {i.title}
          </li>
        );
      })}
    </>
  );
};

type RecommendationFormProp = {
  func: (songs: Song[]) => void;
};

const RecommendationForm = (props: RecommendationFormProp) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedMusicGenre, setSelectedMusicGenre] = useState<string>(
    musicGenresList[0].title
  );
  const [formValidationMessage, setFormValidationMessage] =
    useState<string>('');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  window.addEventListener('click', (e) => {
    if (!document.querySelector('.dd-wrapper')?.contains(e.target as Node)) {
      setIsDropdownOpen(false);
    }
  });

  const checkSpecailChars = (str: string) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  };

  const handleSubmit = async (event: MouseEvent) => {
    event.preventDefault();

    let genre = selectedMusicGenre;
    let artist = (document.querySelector('#artistInput') as HTMLInputElement)
      .value;
    let song = (document.querySelector('#songInput') as HTMLInputElement).value;

    if (selectedMusicGenre === musicGenresList[0].title) {
      setFormValidationMessage('Please select a music genre');
    } else if (checkSpecailChars(artist) || checkSpecailChars(song)) {
      setFormValidationMessage('Special characters are not allowed');
    } else {
      setFormValidationMessage('');
    }

    let artistId;
    try {
      await axios
        .get(`${apiUrl}spotify/searchItem`, {
          params: { search: artist, searchType: 'artist' },
        })
        .then((response) => {
          artistId = response.data.artists.items[0].id;
        });
    } catch {
      setIsError(true);
    }

    let songId;
    await axios
      .get(`${apiUrl}spotify/searchItem`, {
        params: { search: song, searchType: 'track' },
      })
      .then((response) => {
        songId = response.data.tracks.items[0].id;
      });

    await axios
      .get(`${apiUrl}spotify/getRecommendations`, {
        params: {
          genre,
          artistId,
          songId,
        },
      })
      .then((response) => {
        props.func(response.data.tracks);
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
              <DropdownItems
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

      {isError && (
        <ErrorDisplay message='Sorry, an error occurred when fetching recommendations'/>
      )}
    </div>
  );
};

export default RecommendationForm;
