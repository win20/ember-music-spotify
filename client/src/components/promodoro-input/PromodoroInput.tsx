import { ChangeEvent, KeyboardEvent } from 'react';
import './promodoro-input.css';

const PromodoroInput = () => {
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

  return (
    <div id="PromodoroInput">
      <div>Edit Timer</div>
      <div>
        <input
          type="number"
          placeholder="Minutes"
          onKeyPress={preventNonNumeric}
          onChange={handleInput}
        />
        <input
          type="number"
          placeholder="Seconds"
          onKeyPress={preventNonNumeric}
          onChange={handleInput}
        />
        <button>Edit</button>
      </div>
    </div>
  );
};

export default PromodoroInput;
