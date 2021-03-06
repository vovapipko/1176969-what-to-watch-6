import {ActionTypes} from '../types';
import {FilmsGenres} from '../../const';

const initialState = {
  genre: FilmsGenres.DEFAULT,
  films: [],
  promo: {},
  film: {},
  filmComments: [],
  favoriteFilms: [],

  isLoadFilms: false,
  isLoadFilm: false,
  isLoadFilmFailed: false,
  isLoadPromo: false,
  isLoadComments: false,
  isLoadFavoriteFilms: false,
  isFormDisabled: false,
};

export const data = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_GENRE:
      return {
        ...state,
        genre: action.payload
      };

    case ActionTypes.LOAD_FILMS:
      return {
        ...state,
        films: action.payload,
        isLoadFilms: true
      };
    case ActionTypes.LOAD_FILM:
      return {
        ...state,
        film: action.payload,
        isLoadFilm: true,
        isLoadComments: false
      };
    case ActionTypes.LOAD_PROMO:
      return {
        ...state,
        promo: action.payload,
        isLoadPromo: true
      };
    case ActionTypes.RESETLOAD_FILM:
      return {
        ...state,
        isLoadFilm: false
      };
    case ActionTypes.LOAD_FAILED:
      return {
        ...state,
        isLoadFilmFailed: action.payload
      };
    case ActionTypes.LOAD_COMMENT:
      return {
        ...state,
        filmComments: action.payload,
        isFormDisabled: false,
        isLoadComments: true
      };
    case ActionTypes.FORM_DISABLED:
      return {
        ...state,
        isFormDisabled: action.payload
      };
    case ActionTypes.LOAD_FAVORITE_FILM:
      const promoFilm = action.payload.isPromo ? action.payload.film : state.promo;
      return {
        ...state,
        film: action.payload.film,
        promo: promoFilm,
        isLoadFavoriteFilms: false
      };
    case ActionTypes.LOAD_FAVORITE_FILMS:
      return {...state,
        favoriteFilms: action.payload,
        isLoadFavoriteFilms: true
      };
    default: return state;
  }
};
