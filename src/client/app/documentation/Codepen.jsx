import React from 'react';

class Codepen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      hash: this.props.hash,
      height: this.props.height || 600,
      width: this.props.width || '100%'

    }
  }

  render() {
    const source = '//codepen.io/' + this.state.user + '/embed/' + this.state.hash + '/?height=' + this.state.height + '&theme-id=0&default-tab=js,result&embed-version=2';

    return (
      <div>
        <iframe
        height={this.state.height}
        src={source}
        style={{width: this.state.width}}
        frameBorder='no' allowTransparency='true' allowFullScreen='true'
        >
        </iframe>
      </div>
    );  
  }
}

export default Codepen;

// <iframe height='265' scrolling='no' title='Voronoi' src='//codepen.io/Rob0h/embed/YNzVRG/?height=265&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/Rob0h/pen/YNzVRG/'>Voronoi</a> by Robert Oh (<a href='http://codepen.io/Rob0h'>@Rob0h</a>) on <a href='http://codepen.io'>CodePen</a>.
// </iframe>

// <iframe height='265' scrolling='no' title='Voronoi' src='//codepen.io/Rob0h/embed/YNzVRG/?height=265&theme-id=dark&default-tab=js&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/Rob0h/pen/YNzVRG/'>Voronoi</a> by Robert Oh (<a href='http://codepen.io/Rob0h'>@Rob0h</a>) on <a href='http://codepen.io'>CodePen</a>.
// </iframe>