import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [requestName, setRequestName] = useState('');

  const handleNameChange = event => {
    setRequestName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (requestName.trim() === '') {
      return toast.error('Please enter a correct name!');
    }

    onSubmit(requestName);
    setRequestName('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <button type="submit" className={s.button}>
          <span className={s.label}>
            <ImSearch style={{ marginRight: 8 }} />
            Search
          </span>
        </button>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={requestName}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
