export const NoPageAccess = ({ type }) => {
  return (
    <main>
      <h1>Uh oh!</h1>
      <p>
        It looks like you don't have access to edit this page. Not to worry!
        Head over to the{" "}
        <a href={`${process.env.BASE_URL}/account/contribute`}>
          contributor form
        </a>{" "}
        and submit a request to register your {type}.
      </p>
      <p>
        If you've already submitted a request, we're still processing it. Hang
        tight and we'll review your submission as soon as possible!
      </p>
    </main>
  );
};
