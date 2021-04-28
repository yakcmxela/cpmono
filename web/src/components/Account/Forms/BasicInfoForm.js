export const BasicInfoForm = ({ onChange, onSubmit, user }) => {
  return (
    <form onSubmit={onSubmit}>
      <label>
        First name
        <input
          name="firstname"
          onChange={onChange}
          type="text"
          value={user.firstname}
        />
      </label>
      <label>
        Last name
        <input
          name="lastname"
          onChange={onChange}
          type="text"
          value={user.lastname}
        />
      </label>
      <label>
        Username
        <input
          name="username"
          onChange={onChange}
          type="text"
          value={user.username}
        />
      </label>
      <label>
        Phone number
        <input
          name="phone"
          onChange={onChange}
          type="text"
          value={user.phone}
        />
      </label>
      <label>
        Email
        <input
          name="email"
          onChange={onChange}
          required
          type="email"
          value={user.email}
        />
      </label>
      <button>Save</button>
    </form>
  );
};
