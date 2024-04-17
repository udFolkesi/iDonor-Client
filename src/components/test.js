import React, { Component } from 'react';

class ToggleElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  toggleVisibility = () => {
    this.setState(prevState => ({
      isVisible: !prevState.isVisible
    }));
  };

  render() {
    return (
      <div>
        <button onClick={this.toggleVisibility}>Toggle Element</button>
        {this.state.isVisible && <div>This element is now visible!</div>}
      </div>
    );
  }
}

export default ToggleElement;
