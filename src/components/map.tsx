import { FunctionComponent, useRef, useState } from "react";
import Link from "next/link";
import { Image } from "cloudinary-react";
import ReactMapGL, { Marker, Popup, ViewState } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { mapControlDefaultProps } from "react-map-gl/src/components/use-map-control";
// import { useLocalState } from "src/utils/useLocalState";
// import { HousesQuery_houses } from "src/generated/HousesQuery";
// import { SearchBox } from "./searchBox";

interface IProps {}

const Map: FunctionComponent<IProps> = ({} ) => {

  const mapRef = useRef<{} | null>(null);

  // state of map long, lat and zoom
  const [viewport, setViewport] =  useState<ViewState>({
    latitude: 50.822529,
    longitude: -0.137163,
    zoom: 14
  })
  return (
    <div className="text-black relative">
      <ReactMapGL 
        {...viewport} 
        width="100%" 
        height="calc(100vh - 64px)"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        onViewStateChange={(nextViewport: ViewState) => setViewport(nextViewport)}
        ref={(instance) => (mapRef.current = instance)}
        minZoom={5}
        maxZoom={16}
        mapStyle="mapbox://styles/leighhalliday/ckhjaksxg0x2v19s1ovps41ef"
        >
      </ReactMapGL>
    </div>
  )
}

export default Map
