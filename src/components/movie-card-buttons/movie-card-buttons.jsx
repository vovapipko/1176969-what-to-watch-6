import React from 'react';
import PropTypes from 'prop-types';
import {Link, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';

import {checkFavoriteFilm} from '../../store/api-actions';
import {FavoriteStatusApi} from '../../const';
import {getPromoFilm} from '../../store/data/selectors';

import MovieButton from './moive-button';

const MovieCardButtons = (props) => {
  const {
    id,
    isFavoriteFilm,
    isUser,
    isVisibleAddReview,
    onLoadFavorite,
    promoFilmId
  } = props;

  const history = useHistory();

  const playButton = {
    title: `Play`,
    svg: `play-s`,
  };

  const myListButton = {
    title: `My list`,
    svg: {
      add: `add`,
      inlist: `in-list`,
      noauth: `noauth`,
    }
  };

  const handlePlayClick = () => {
    history.push(`/player/${id}`);
  };

  const handleMyListClick = () => {
    const isPromo = promoFilmId === id;
    if (!isFavoriteFilm) {
      onLoadFavorite(id, FavoriteStatusApi.ADD, isPromo);
    }

    if (isFavoriteFilm) {
      onLoadFavorite(id, FavoriteStatusApi.DELETE, isPromo);
    }
  };


  return (
    <div className="movie-card__buttons">

      <MovieButton
        isPlay
        button={playButton}
        onButtonClick={handlePlayClick} />

      <MovieButton
        button={myListButton}
        onButtonClick={handleMyListClick}
        isFavoriteFilm={isFavoriteFilm}
        isUser={isUser} />

      {isUser &&
      isVisibleAddReview &&
      <Link to={`/films/${id}/review`} className="btn movie-card__button">Add review</Link>}

    </div>
  );
};

MovieCardButtons.defaultProps = {
  isVisibleAddReview: false,
  promoFilmId: null,
};

MovieCardButtons.propTypes = {
  id: PropTypes.number.isRequired,
  isFavoriteFilm: PropTypes.bool.isRequired,
  isUser: PropTypes.bool.isRequired,
  isVisibleAddReview: PropTypes.bool,
  promoFilmId: PropTypes.number,
  onLoadFavorite: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  promoFilmId: getPromoFilm(state).id,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadFavorite: (id, status, isPromo) => {
      dispatch(checkFavoriteFilm(id, status, isPromo));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieCardButtons);
