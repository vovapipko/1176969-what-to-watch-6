import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import {loadFilmFailed} from '../../store/actions';
import {connect} from 'react-redux';
import {getStatusLoadFilmFailed} from '../../store/data/selectors';

import Header from '../header/header';
import Footer from '../footer/footer';

const NotFoundScreen = ({isLoadFilmFailed, onLoadFilmFailed}) => {

  useEffect(() => {
    return isLoadFilmFailed && (() => onLoadFilmFailed(false));
  }, [isLoadFilmFailed]);

  const titleSpanStyle = {
    display: `block`,
    fontSize: 100,
    marginBottom: 30,
  };

  return (
    <div className="user-page">

      <Header isHiddenSignInButton />

      <div className="sign-in user-page__content">
        <h1 className="page-title user-page__title">
          <span style={titleSpanStyle}>404</span>
            Not Found
        </h1>
      </div>

      <Footer />

    </div>
  );
};

NotFoundScreen.propTypes = {
  isLoadFilmFailed: PropTypes.bool.isRequired,
  onLoadFilmFailed: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoadFilmFailed: getStatusLoadFilmFailed(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadFilmFailed: (status) => {
    dispatch(loadFilmFailed(status));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NotFoundScreen);
