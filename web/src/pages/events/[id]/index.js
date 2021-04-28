import { apolloProvider, getAuthenticatedUser } from "providers";
import { AuthContext } from "providers";
import { GET_EVENT } from "schema/queries";
import { Fragment, useContext, useEffect, useState } from "react";
import { UPDATE_USER_RELATIONS } from "schema/mutations";
import { useMutation, useQuery } from "@apollo/client";
import ReactMapGL, { Marker } from "react-map-gl";

const EventDetail = ({ singleEvent, id }) => {
  const authContext = useContext(AuthContext);
  const { data, loading, error } = useQuery(GET_EVENT, { variables: { id } });
  const [updateRelations] = useMutation(UPDATE_USER_RELATIONS);

  const [isAttended, setIsAttended] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const [viewport, setViewport] = useState({
    latitude: Number(process.env.PORTLAND_LAT),
    longitude: Number(process.env.PORTLAND_LONG),
    zoom: 10,
  });

  const handleUpdateUser = async (event, action, callback) => {
    try {
      await updateRelations({
        variables: {
          id: authContext.user.id,
          [event.target.name]: [data.event.id],
          action,
        },
      });
      callback(action === "ADD");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      data &&
      authContext.user &&
      authContext.user.eventsFavorited &&
      authContext.user.eventsFavorited.map((e) => e.id).includes(data.event.id)
    ) {
      setIsFavorited(true);
    }
    if (
      data &&
      authContext.user &&
      authContext.user.eventsAttended &&
      authContext.user.eventsAttended.map((e) => e.id).includes(data.event.id)
    ) {
      setIsAttended(true);
    }
  }, [authContext.user, data]);

  return (
    <main>
      <h1>Event Detail Page</h1>
      <div>
        <section>
          {loading ? (
            <p>Loading clientside stuffs</p>
          ) : (
            <Fragment>
              <h2>CLIENT: {data.event.title}</h2>
              <div>
                {authContext.loading ? (
                  <p>Loading</p>
                ) : authContext.auth && authContext.user ? (
                  <>
                    <button
                      name="eventsFavorited"
                      onClick={(event) =>
                        handleUpdateUser(
                          event,
                          isFavorited ? "REMOVE" : "ADD",
                          setIsFavorited
                        )
                      }
                    >
                      {isFavorited ? `Remove favorite` : "Add favorite"}
                    </button>
                    <button
                      name="eventsAttended"
                      onClick={(event) =>
                        handleUpdateUser(
                          event,
                          isAttended ? "REMOVE" : "ADD",
                          setIsAttended
                        )
                      }
                    >
                      {isAttended ? `Did not attend!` : "I attended"}
                    </button>
                  </>
                ) : (
                  <>
                    <p>You must be logged in to favorite events!</p>
                    <a href={`${process.env.BASE_URL}/account/login`}>Log in</a>
                  </>
                )}
              </div>
              <p>{data.event.description}</p>
              <ReactMapGL
                {...viewport}
                height="500px"
                width="100%"
                mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
                onViewportChange={setViewport}
              >
                <Marker
                  key={`marker${data.event.id}`}
                  latitude={data.event.location.latitude}
                  longitude={data.event.location.longitude}
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
              </ReactMapGL>
            </Fragment>
          )}
        </section>
      </div>
    </main>
  );
};

export const getServerSideProps = async (context) => {
  const props = {
    singleEvent: null,
    id: context.query.id,
  };
  try {
    const { headers = null } = getAuthenticatedUser(context.req.headers.cookie);
    const client = apolloProvider(headers, true);
    const { data } = await client.query({
      query: GET_EVENT,
      variables: {
        id: context.query.id,
      },
    });
    props.singleEvent = data.event || null;
  } catch (error) {
    console.log(error);
  }
  return {
    props,
  };
};

export default EventDetail;
