import React, { useState, Fragment } from 'react';
import { I18Provider } from './language';
import List from './list';
import { connect } from "react-redux";

const App = ({ state }) => {
  return (
    <I18Provider locale={state.lang}>
      <Fragment>
        <List />
      </Fragment>
    </I18Provider>
  )
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps)(App);