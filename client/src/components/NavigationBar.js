import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

class NavigationBar extends React.Component {
  logout(e){
    e.preventDefault();
    this.props.logout();
  }
  render(){
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="#" onClick={this.logout.bind(this)}>logout</Link></li>
      </ul>
    );

    const guestLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/signup">Sign up</Link></li>
        <li><Link to="/login">login</Link></li>
      </ul>
    );
    return (
      <nav className="navbar navbar-default">
        <Link to="/" className='navbar-brand'> NightLife </Link>
        <div className="collapse navbar-collapse">
          { isAuthenticated ? userLinks : guestLinks }
        </div>
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
export default connect(mapStateToProps, { logout })(NavigationBar);
