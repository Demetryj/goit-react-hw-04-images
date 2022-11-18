import PropTypes from 'prop-types';
import css from './button.module.css';

export const Button = ({ handleClickLoadMore, children }) => {
  return (
    <button type="button" className={css.button} onClick={handleClickLoadMore}>
      {children}
    </button>
  );
};

Button.propTypes = {
  handleClickLoadMore: PropTypes.func.isRequired,
  children: PropTypes.string,
};
