import React from 'react';
import { loadBars } from '../../actions/eventActions';
import { connect } from 'react-redux';

class MainPage extends React.Component {

  render(){
    this.props.loadBars("chicago").then( res => console.log(res.data));
    return (
      <div className="jumbotron">
        <h1> Hi </h1>
      </div>
    );
  }
}

export default connect(null, {loadBars})(MainPage);
