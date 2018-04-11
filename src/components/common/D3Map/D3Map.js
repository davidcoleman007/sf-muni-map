import React, { Component } from 'react';
import autoBind from 'react-autobind';

import {ReactSVGPanZoom} from 'react-svg-pan-zoom';

export class D3Map extends Component {

  constructor(props){
    super(props)
    autoBind(this);
  }

  componentDidMount() {
  }

  render() {
    const {height, layers, onZoom, width} = this.props;
    return (
      <section>
        <ReactSVGPanZoom
            width={width} height={height} style={{border: "1px solid black", margin:"0 auto"}}
            ref={Viewer => this.Viewer = Viewer} onZoom={onZoom}>
          <svg width={ width } height={ height } viewBox={`0 0 ${width} ${height}`}>
            {layers}
          </svg>
        </ReactSVGPanZoom>
      </section>
    )
  }
}
