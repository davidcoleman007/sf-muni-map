import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';

import { geoMercator, geoPath } from "d3-geo"

export class D3Layer extends Component {

  static propTypes = {
    /**
     * a function which takes int idx as an input and returns
     * an array of 4 integers representing RGBA components
     */
    colorGenerator: PropTypes.func
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  defaultColorGenerator(idx) {
    const {geojson} = this.props;
    return [
      38, 50, 56,
      1 / geojson.features.length * idx
    ];
  }

  render() {
    const {
      className,
      colorGenerator = this.defaultColorGenerator,
      geojson,
      height,
      hollow = false,
      width,
      projection =
        geoMercator()
        .fitSize([width, height], geojson),
    } = this.props;

    var geoGenerator =
      geoPath()
      .projection(projection);

    var features =
      geojson.features.map(
        (feature,idx) => {
          var p = feature.properties;
          var style = {fill: hollow?'none':`rgba(${colorGenerator(idx).join(',')})` }

          const mapPath = <path
            d={geoGenerator(feature)}
            style={style}
            key={p.id}
            stroke-width="0.25"
            stroke="black"
          />

          return mapPath;
        }
      );

    return (
      <g className={className}>
        {features}
      </g>
    );
  }
}
