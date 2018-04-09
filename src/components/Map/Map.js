import React, { Component } from 'react';
import autoBind from 'react-autobind';

import { geoMercator } from "d3-geo"

import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
import { D3Map } from './D3Map';

import neighborhoods from '../../data/geo/neighborhoods.json';
import streets from '../../data/geo/streets.json';

export class Map extends Component {
  constructor(props){
    super(props)
    autoBind(this);
    this.state = {
      scale : 170000,
      translation: [ 213.9, 71.5],
      mPos: [
        0,0
      ]
    };
    const width = 1024;
    const height = 768;
    const projection = geoMercator()
        .fitSize([width, height], neighborhoods);

    this.d3mapN = <D3Map geojson={neighborhoods} width={width} height={height} projection={projection} />;
    this.d3mapS = <D3Map geojson={streets} width={width} height={height} colorGenerator={() => [1,1,1,1]} projection={projection} hollow />;
    console.log(neighborhoods);
    console.log(streets);
    this.data = fetch('http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&r=N&t=1144953500233').then(
      (res) => {
        res.json().then(
          (data) => {
            console.log(data);
          }
        )
      }
    );
  }

  calculateMunis() {

  }

  handleNeighborhoodClick(clickIndex) {
    console.log("Clicked on neighborhood: ", clickIndex)
  }

  handleMarkerClick(i) {
    console.log("Marker: ", this.state.cities[i])
  }

  componentDidMount() {
  }

  onMouseDown(event) {
    console.log(event.clientX);
    this.setState({
      ...this.state,
      mPos: [
        event.clientX,
        event.clientY
      ]
    })
  }

  render() {
    return (
      <section>
        <ReactSVGPanZoom
            width={1024} height={768} style={{border: "1px solid black"}}
            ref={Viewer => this.Viewer = Viewer}>
          <svg width={ 1024 } height={ 768 } viewBox="0 0 1024 768">
            {this.d3mapN}
            {this.d3mapS}
          </svg>
        </ReactSVGPanZoom>
      </section>
    )
  }
}
