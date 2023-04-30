import { ChangeEvent, KeyboardEvent } from 'react';
import './promodoro-input.css';

type Props = {
  setTimer: (minutes: number, seconds: number) => void;
};

const PromodoroInput = (props: Props) => {
  const preventNonNumeric = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.which < 48 || e.which > 57) {
      e.preventDefault();
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) > 59) {
      e.target.value = '59';
    }
  };

  const handleSubmit = () => {
    const minutes = (
      document.getElementById('minutes-input') as HTMLInputElement
    ).value;
    const seconds = (
      document.getElementById('seconds-input') as HTMLInputElement
    ).value;

    props.setTimer(parseInt(minutes), parseInt(seconds));
  };

  return (
    <div id="PromodoroInput">
      <div>Edit Timer</div>
      <div>
        <input
          id="minutes-input"
          type="number"
          placeholder="Minutes"
          onKeyPress={preventNonNumeric}
          onChange={handleInput}
        />
        <input
          id="seconds-input"
          type="number"
          placeholder="Seconds"
          onKeyPress={preventNonNumeric}
          onChange={handleInput}
        />
        <button onClick={handleSubmit}>Edit</button>
      </div>
    </div>
  );
};

export default PromodoroInput;
