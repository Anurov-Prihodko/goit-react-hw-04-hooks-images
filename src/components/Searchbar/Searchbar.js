import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    requestName: '',
  };

  handleNameChange = event => {
    this.setState({
      requestName: event.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.requestName.trim() === '') {
      return toast.error('Please enter a correct name!');
    }

    this.props.onSubmit(this.state.requestName);
    this.setState({ requestName: '' });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.handleSubmit}>
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
            value={this.state.requestName}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
