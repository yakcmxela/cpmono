import { AccountLayout } from "layouts";
import { AuthContext } from "providers";
import { BasicInfoForm, PasswordResetForm } from "components/Account";
import { UPDATE_USER } from "schema/mutations/users";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";

const AccountProfile = ({ route }) => {
  const { auth, user } = useContext(AuthContext);
  const [updateUserSelf] = useMutation(UPDATE_USER);
  const [profile, setProfile] = useState(defaultUser);

  const onChangePreferences = async (event, value) => {
    try {
      await updateUserSelf({
        variables: {
          id: auth.user.id,
          [event.target.name]: value,
        },
      });
      setProfile((p) => {
        return {
          ...p,
          [event.target.name]: value,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      setProfile(user);
    }
  }, [user]);

  return (
    <AccountLayout route={route}>
      <article>
        {!user || !auth ? (
          <p>Loading...</p>
        ) : (
          <>
            <h1>Hi, {user.firstname || ""}</h1>
            <section>
              <h2>Basic Info</h2>
              <BasicInfoForm user={profile} />
              <PasswordResetForm user={profile} />
            </section>
            {profile.role.type === "authenticated" && (
              <section>
                <p>Are you an artist, venue, or organization?</p>
                <a href={`${process.env.BASE_URL}/account/contribute`}>
                  Become a contributor
                </a>
              </section>
            )}
            <section>
              <h3>Events Attended</h3>
              {user.eventsAttended && (
                <ul>
                  {user.eventsAttended.map((e) => (
                    <li key={e.id}>{e.title}</li>
                  ))}
                </ul>
              )}
              <h3>Events Favorited</h3>
              {user.eventsFavorited && (
                <ul>
                  {user.eventsFavorited.map((e) => (
                    <li key={e.id}>{e.title}</li>
                  ))}
                </ul>
              )}
            </section>
            <section>
              <h3>User Preferences</h3>
              <label>
                Receive event updates
                <input
                  name="eventsReminder"
                  onChange={(event) =>
                    onChangePreferences(event, !profile.eventsReminder)
                  }
                  type="checkbox"
                  checked={profile.eventsReminder}
                />
              </label>
              <label>
                Receive newsletter
                <input
                  name="newsletter"
                  onChange={(event) =>
                    onChangePreferences(event, !profile.newsletter)
                  }
                  type="checkbox"
                  checked={profile.newsletter}
                />
              </label>
            </section>
          </>
        )}
      </article>
    </AccountLayout>
  );
};

const defaultUser = {
  firstname: "",
  lastname: "",
  email: "",
  role: {
    type: "authenticated",
  },
};

export default AccountProfile;
