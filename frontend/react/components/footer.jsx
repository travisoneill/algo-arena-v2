import React from 'react';

const Footer = React.createClass({

  render() {
    let text = "Site Designed & Built by Travis O'Neill & Daniel 'Coop' Cuperman"
    return (
      <div className="footer-column">
          <p className="by-dc-to">{text}</p>
          <ul className="connect-row">
            <li className="git">
              <a className="icon-github-circled" href="https://github.com/travisoneill/benchmark">
                <strong className="heading">GITHUB</strong>
              </a>
            </li>
          </ul>
      </div>
    );
  }

});

module.exports = Footer;
