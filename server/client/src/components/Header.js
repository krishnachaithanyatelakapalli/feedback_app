import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  // when logged in
  renderLoggedIn(user) {
    return (
      <div>
        <li><Payments /></li>
        <li style={{margin: '0 10px'}}>Available Credits: {user.credits}</li>
        <li id="display_name">{user.name}</li>
        <li><a href="/api/logout">Logout</a></li>
      </div>
    )
  }

  // when logged out
  renderLoggedOut() {
    return(
      <li><a href="/auth/google">Login with Google</a></li>
    )
  }

  // Helper Method
  renderContent() {
    switch (this.props.auth){
      case null:
        return 'Loading...';
      case false:
        return this.renderLoggedOut();
      default:
        return this.renderLoggedIn(this.props.auth);
    }
  }
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link to={this.props.auth ? '/surveys':'/'} className="left brand-logo">Emaily</Link>
            <ul className="right">
              {this.renderContent()}
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Header);
