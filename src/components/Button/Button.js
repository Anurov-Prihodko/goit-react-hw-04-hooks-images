import PropTypes from 'prop-types';
import s from './Button.module.css';

export default function Button(props) {
  return (
    <button type="button" onClick={props.onClick} className={s.button}>
      {props.children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
