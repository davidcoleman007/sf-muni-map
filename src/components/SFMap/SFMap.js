import React, {Component} from 'react';
import autoBind from 'react-autobind';

import { geoMercator } from "d3-geo"

import { D3Map } from '../common/D3Map';
import { D3GeoLayer } from '../common/D3GeoLayer';

import neighborhoods from '../../data/geo/neighborhoods.json';
import streets from '../../data/geo/streets.json';

import muni from './icon.png';

export class SFMap extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      zoom : 1
    };
    this.generateProjection();
    this.generateLayers();
  }

  componentDidMount() {
    const { getMuniLocations } = this.props;
    this.fetchInterval = setInterval(getMuniLocations, 15000);
    getMuniLocations();
  }
  generateProjection() {
    const {height, width} = this.props;
    const projection = geoMercator()
      .fitSize([width, height], neighborhoods);
    this.projection = projection;
  }

  generateLayers() {
    const {height, width} = this.props;
    this.mapLayers =[
      <D3GeoLayer geojson={neighborhoods}
          key="neighborhoods-layer"
          width={width} height={height}
          projection={this.projection}
      />,
      <D3GeoLayer geojson={streets}
          colorGenerator={() => [1,1,1,1]}
          hollow
          key="streets-layer"
          projection={this.projection}
          width={width} height={height}
      />,
    ];
  }

  onZoom(args) {
    this.setState({
      zoom: args.a
    })
  }

  render() {
    const { height, muniLocs,  width } = this.props;
    const { zoom } = this.state;
    const { mapLayers } = this;
    const layers = [
      ...mapLayers,
      <g key="muni-icons">
        {muniLocs && muniLocs.vehicle && muniLocs.vehicle.map(
          (vehicle, idx) => {
            const point = this.projection([vehicle.lon, vehicle.lat]);
            const [x, y] = point;
            return <image x={x} y={y} width={24/zoom} height={24/zoom} xlinkHref={muni} key={`sf-muni-icon-${idx}`}/>
          }
        )}
      </g>
    ];
    return (
      <D3Map layers={layers} height={height} width={width} onZoom={this.onZoom}/>
    );
  }
}
