/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;

class Users extends React.Component {
  render() {
    const {config: siteConfig} = this.props;
    if ((siteConfig.users || []).length === 0) {
      return null;
    }

    const showcase = siteConfig.users.map((user) => (
      <a href={user.infoLink} key={user.infoLink}>
        <img src={user.image} alt={user.caption} title={user.caption} />
      </a>
    ));

    return (
      <div className="mainContainer">
        <Container padding={['bottom', 'top', 'right']}>
          <div className="showcaseSection">
          <div className="logos">{showcase}</div>
            <div>
              <h2>Emmett Na</h2>
              <p>Software Developer, Data Engineer</p>
              <p>And wanna be Machine Learning Engineer</p>
              <h3>Recent Interests</h3>
              <p>Data Analysis, Machine Learning and Business</p>
              <p>Tensorflow, PyTorch, Spark(Scala), Keras and Machine Learning For Business</p>
              <h3>Tech Stacks</h3>
              <p>Scala, Python, Postgres, Kubernetes, AWS...</p>
              <h3>Moto</h3>
              <p>Tech without business is wasting money💰</p>
              <h3>Experience</h3>
              <h4>2019-04 ~ Currnent</h4>
              <p>Software Engineer At <a href="https://doomoolmori.com/">Doomoolmori</a></p>
              <p>No Content Yet</p>
              <h4>2018-11 ~ 2019-04</h4>
              <p>Software Engineer At In-Datalab</p>
              <p>No Content Yet</p>
              <h4>2018-05 ~ 2018-11</h4>
              <text>Data Engineer At <a href="https://www.puzzledata.com/home_eng/" color="blue">PuzzleData</a></text>
              <h4>2017-06 ~ 2018-05</h4>
              <p>Fullstack Developer At TeamCrack</p>
              <p>No Content Yet</p>
              <h4><a href="https://github.com/emmettna">Find me on Github</a></h4>
            </div>

          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Users;
