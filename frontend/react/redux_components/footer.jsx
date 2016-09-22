import React from 'react';

const text = "Site Designed & Built by Travis O'Neill, Daniel 'Coop' Cuperman, & Avinoam Waizman";

export const Footer = () => (
  <div className="footer-column">
      <p className="by-dc-to">{text}</p>
      <ul className="connect-row">
        <li className="git">
          <a className="icon-github-circled" href="https://github.com/travisoneill/algo-arena-v2">
            <strong className="heading">GITHUB</strong>
          </a>
        </li>
      </ul>
  </div>
);
