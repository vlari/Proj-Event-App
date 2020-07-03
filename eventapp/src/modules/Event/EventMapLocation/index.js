import React, { Fragment } from 'react';
import mapboxgl from 'mapbox-gl';

class EventMapLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: props.lng,
      lat: props.lat,
      zoom: ''
    };
  }

  componentDidMount() {
    // const map = new mapboxgl.Map({
    //   container: this.eventMap,
    //   accessToken: process.env.REACT_APP_MAP_API_KEY,
    //   style: 'mapbox://styles/mapbox/dark-v10',
    //   center: [this.state.lng, this.state.lat], // starting position [lng, lat]
    //   zoom: 14 // starting zoom
    // });

    // var marker = new mapboxgl.Marker({
    //     color: '#3F51B5'
    //   })
    //   .setLngLat([this.state.lng, this.state.lat])
    //   .addTo(map);
  }
  
  render() {
      return (
        <Fragment>
          {/* <div 
            ref={(el) => this.eventMap = el}
            style={{ width: '100%', height: '300px'}}>
          </div> */}
        </Fragment>
      )
  }
};

export default EventMapLocation;
