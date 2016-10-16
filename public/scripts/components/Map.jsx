const React = require('react');
const L = require('leaflet');
const _ = require('lodash');

module.exports = class Map extends React.Component {
  componentWillMount() {
    this.id = _.uniqueId('map');
  }
  componentDidMount() {
    const maxBounds = new L.LatLngBounds(new L.LatLng(85, 180), new L.LatLng(-85,
      -180));
    const map = L.map(this.id, { maxBounds }).setView([0, 0], 2);
    map.options.minZoom = 2;
    const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg';
    const imageBounds = [[85, 180], [-85, -180]];
    L.imageOverlay(imageUrl, imageBounds).addTo(map);
  }
  render() {
    return (
      <div id={this.id} className="map" />
    );
  }
};
