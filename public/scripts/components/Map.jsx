const L = require('leaflet');
const React = require('react');
const _ = require('lodash');

const FileReader = window.FileReader;

module.exports = class Map extends React.Component {
  constructor() {
    super();

    this.imageOverlay = null;
    this.map = null;
  }
  componentWillMount() {
    this.id = _.uniqueId('map');
  }
  componentDidMount() {
    const maxBounds = new L.LatLngBounds(new L.LatLng(85, 180), new L.LatLng(-85,
      -180));

    this.map = L.map(this.id, { maxBounds }).setView([0, 0], 2);
    this.map.options.minZoom = 2;
  }
  handleDrop(e) {
    e.preventDefault();
    this.readImage(e.dataTransfer.files[0]);
  }
  readImage(src) {
    if (!src.type.match(/image.*/)) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      this.setImage(e.target.result);
    };

    reader.readAsDataURL(src);
  }
  setImage(imageUrl) {
    const imageBounds = [[85, 180], [-85, -180]];

    if (this.imageOverlay) {
      this.imageOverlay.remove();
    }

    this.imageOverlay = L.imageOverlay(imageUrl, imageBounds).addTo(this.map);
  }
  render() {
    return (
      <div
        id={this.id} className="map" onDrop={e => this.handleDrop(e)}
        onDragOver={e => e.preventDefault()}
      />
    );
  }
};
