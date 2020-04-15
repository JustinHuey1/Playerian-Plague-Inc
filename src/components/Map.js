import React, { Component } from "react";
//import "https://unpkg.com/leaflet@1.4.0/dist/leaflet.css";
const {
  Map: LeafletMap,
  TileLayer,
  Marker,
  Popup,
  GeoJSON
} = window.ReactLeaflet;

export default class Map extends Component {
  constructor(props) {
    super(props);
    //this.map does not exist yet
    this.state = {
      //coord: [latitude, longtitude]
      coord: [this.props.center.x, this.props.center.y],
      zoom: 5
    };
  }
  componentDidMount() {
    //this.map exist
    let map = this.map.leafletElement;
    console.log(map);
    //disable zoom
    // map.touchZoom.disable();
    // map.doubleClickZoom.disable();
    // map.scrollWheelZoom.disable();
    // map.keyboard.disable();
    // map.zoomControl.disable();
    //disable pan
    // map.dragging.disable();

    //let marker = this.marker([37.7749,-122.4194]).addTo(map)
  }
  //leaflet handler
  handleZoomEnd(e) {
    console.log("Zoom ended");
    //set zoom as state
    let map = this.map.leafletElement;
    let zoom = map.getZoom();
    console.log(zoom);
    //minimum zoom is 4
    if (zoom < 4) {
      zoom = 4;
    }
    this.setState({ zoom: zoom });
  }
  handleMoveEnd(e) {
    console.log("Move ended");
    var coord = e.target.getCenter();
    var lat = coord.lat;
    var lng = coord.lng;
    console.log(
      "Center of the map at latitude: " + lat + " and longitude: " + lng
    );
    //longtitude can't be less than -120
    if (lng < -120) {
      lng = -120;
    }
    //longtitude can't be greater than -65
    if (lng > -65) {
      lng = -65;
    }
    //latitude can't be greater than 50
    if (lat > 50) {
      lat = 50;
    }
    //latitude can't be less than 25
    if (lat < 25) {
      lat = 25;
    }
    this.setState({ coord: [lat, lng] });
  }
  handleClick(e) {
    console.log("Clicked");
    var coord = e.latlng;
    var lat = coord.lat;
    var lng = coord.lng;
    console.log(
      "You clicked the map at latitude: " + lat + " and longitude: " + lng
    );
  }
  //geoJSON handler
  onEachFeature(feature, layer) {
    //bind click on each layer
    layer.on({
      click: e => this.onFeatureClicked(e, feature)
    });
    // grab stateData
    let stateData = this.props.stateData;
    //set style base on stateData
    if (stateData[feature.properties.NAME]) {
      layer.setStyle(stateData.style);
    }
  }
  onFeatureClicked(event, feature) {
    this.props.onFeatureClicked(feature.properties.NAME);
  }
  render() {
    // array of fill colors in increasing order of severity
    let colors = [
      "#3388ff", "#74adad", "#8abc8e", "#c5de46", "fbff00",
      "#fde800", "#fed200", "#ffb900", "#ff9300", "#ff6200",
      "#ff4600", "#ff0000", "#de0000", "#aa0000", "#730000",
    ]
    return (
      // center of the US in coordinates: 40.2, -95.7129 (this is not the coordinates of the geographical center)
      <LeafletMap
        center={this.state.coord}
        zoom={this.state.zoom}
        ref={ref => {
          this.map = ref;
        }}
        onZoomEnd={e => this.handleZoomEnd(e)}
        onMoveEnd={e => this.handleMoveEnd(e)}
        onClick={e => this.handleClick(e)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | Data from US Census Bureau'
        />
        <GeoJSON data={this.props.borderGeoJSON} />
        <GeoJSON
          data={this.props.stateGeoJSON}
          style={{ color: "cadetblue", fillColor: "pink", opacity: 0.5 }}
          onEachFeature={(f, l) => this.onEachFeature(f, l)}
        />
      </LeafletMap>
    );
  }
}
