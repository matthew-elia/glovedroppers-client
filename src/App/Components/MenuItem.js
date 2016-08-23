import React from 'react';
import {Link} from 'react-router';

class MenuItem extends React.Component {
  render() {
    return (
      <li>
        <Link to={this.props.route}>
          {this.props.text}
        </Link>
      </li>
    );
  }
}

module.exports = MenuItem;
