import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Route, useHistory} from 'react-router-dom';
import {AuthorizationStatus, RouteApp} from '../../const';

const PrivateRoute = ({render, exact, path, authorizationStatus}) => {
  const history = useHistory();

  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH ?
            render(routeProps)
            : history.push({
              pathname: RouteApp.SIGN_IN,
              state: {prevPath: routeProps.match.url}
            })
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  render: PropTypes.func.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = ({USER}) => {
  return {
    authorizationStatus: USER.authorizationStatus,
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);
