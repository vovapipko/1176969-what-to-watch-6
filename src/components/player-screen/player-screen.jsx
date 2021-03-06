import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';

import {fetchFilm} from '../../store/api-actions';
import {getFilm, getStatusLoadFilm, getStatusLoadFilmFailed} from '../../store/data/selectors';

import VideoPlayerFull from './video-player-full/video-player-full';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import VideoPlayerControls from './video-player-controls/video-player-controls';


const PlayerScreen = ({id, film, isLoadFilm, isLoadFilmFailed, onLoadFilm}) => {
  const history = useHistory();
  const [isPlaying, setPlaying] = useState(true);
  const [isReverse, setReverse] = useState(true);
  const [isFullScreen, setFullScreen] = useState(false);
  const [videoTime, setVideoTime] = useState({
    progress: 0,
    duration: 0,
  });

  useEffect(() => {
    if (!isLoadFilm) {
      onLoadFilm(id);
    }
  }, [isLoadFilm]);


  if (!isLoadFilm && !isLoadFilmFailed) {
    return <LoadingScreen />;
  }

  if (!isLoadFilm && isLoadFilmFailed) {
    return <NotFoundScreen />;
  }


  const {previewImage, videoLink} = film;

  const handlerPlayerTimeClick = () => {
    setReverse(!isReverse);
  };

  const handlerPlayClick = () => {
    setPlaying(!isPlaying);
  };

  const handlerFullScreenClick = () => {
    setFullScreen(true);
  };

  const handlerExitClick = () => {
    history.push(`/films/${id}`);
  };

  return (
    <div className="player">

      <VideoPlayerFull
        videoLink={videoLink}
        previewImage={previewImage}
        isPlaying={isPlaying}
        isFullScreen={isFullScreen}
        onPlaying={setPlaying}
        onFullScreen={setFullScreen}
        onVideoTime={setVideoTime}
      />

      <button
        type="button"
        className="player__exit"
        onClick={handlerExitClick}
      >Exit</button>

      <VideoPlayerControls
        nameFilm={film.name}
        videoTime={videoTime}
        isReverse={isReverse}
        isPlaying={isPlaying}
        onPlayerTimeClick={handlerPlayerTimeClick}
        onPlayClick={handlerPlayClick}
        onFullScreenClick={handlerFullScreenClick}
      />

    </div>
  );
};

PlayerScreen.propTypes = {
  id: PropTypes.number.isRequired,
  film: PropTypes.object.isRequired,
  isLoadFilm: PropTypes.bool.isRequired,
  isLoadFilmFailed: PropTypes.bool.isRequired,
  onLoadFilm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  film: getFilm(state),
  isLoadFilm: getStatusLoadFilm(state),
  isLoadFilmFailed: getStatusLoadFilmFailed(state),
});

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadFilm: (id) => {
      dispatch(fetchFilm(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerScreen);
