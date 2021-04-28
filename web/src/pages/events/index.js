import { apolloProvider, getAuthenticatedUser } from "providers";
import { GET_EVENTS } from "schema/queries";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import mapboxgl from "mapbox-gl";
import ReactMapGL, { Marker, WebMercatorViewport } from "react-map-gl";
import styles from "./index.module.scss";

const EventsOverview = ({ events }) => {
  const { data, loading, error } = useQuery(GET_EVENTS);

  const [eventsInViewport, setEventsInViewport] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: Number(process.env.PORTLAND_LAT),
    longitude: Number(process.env.PORTLAND_LONG),
    zoom: 10,
  });

  const checkInViewport = () => {
    if (viewport.width && viewport.height && events.length) {
      const bounds = new WebMercatorViewport({
        width: viewport.width,
        height: viewport.height,
        zoom: viewport.zoom,
        latitude: viewport.latitude,
        longitude: viewport.longitude,
      }).getBounds();
      setEventsInViewport(() => {
        return events.filter((e) => {
          const bound = new mapboxgl.LngLatBounds(bounds);
          return e.location.length && e.location[0]
            ? bound.contains({
                lon: e.location[0].longitude,
                lat: e.location[0].latitude,
              })
            : false;
        });
      });
    }
  };

  useEffect(checkInViewport, [events]);

  return (
    <main>
      <h1>All Events</h1>
      <div className={["card", styles.map].join(" ")}>
        <hr />
        <p>Events from client-side fetch.</p>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error while fetching events</p>
        ) : (
          <ul>
            {data.events &&
              data.events.map((e) => {
                return (
                  <p key={e.id}>
                    <a href={`${process.env.BASE_URL}/events/${e.id}`}>
                      {e.title}
                    </a>
                  </p>
                );
              })}
          </ul>
        )}
        <hr />
        <p>Events from server-side fetch</p>
        <ul>
          {events &&
            events.map((e) => {
              return (
                <p key={e.id}>
                  <a href={`${process.env.BASE_URL}/events/${e.id}`}>
                    {e.title}
                  </a>
                </p>
              );
            })}
        </ul>
      </div>
      <section>
        <hr />
        <h2>Map section</h2>
        <p>
          This section renders the map and events. When the viewport changes, it
          rerenders the list below with the events that are visible.
        </p>
        <ReactMapGL
          {...viewport}
          height="500px"
          width="100%"
          mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
          onTransitionEnd={checkInViewport}
          onViewportChange={setViewport}
        >
          {events.map(
            (e) =>
              e.location &&
              e.location.__typename === "ComponentLocationAddress" && (
                <Marker
                  key={`marker${e.id}`}
                  latitude={e.location.latitude}
                  longitude={e.location.longitude}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      backgroundColor: "blue",
                      borderRadius: "100%",
                    }}
                  />
                </Marker>
              )
          )}
        </ReactMapGL>
        <ul>
          {eventsInViewport.map((e) => (
            <li key={e.id}>{e.title}</li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export const getServerSideProps = async (context) => {
  const props = {
    events: [],
  };
  try {
    const headers = getAuthenticatedUser(context.req.headers.cookie);
    const client = apolloProvider(headers, true);
    const { data } = await client.query({ query: GET_EVENTS });
    props.events = data.events || [];
  } catch (error) {
    console.log(error);
  }
  return {
    props,
  };
};

export default EventsOverview;
