export const PasswordResetForm = ({
  isConfirmed = false,
  onChange,
  onSubmit,
  user,
}) => {
  return (
    <section>
      <h2>Change password</h2>
      <form onSubmit={onSubmit}>
        {!isConfirmed ? (
          <label>
            Your old password
            <input
              name="firstname"
              onChange={onChange}
              type="text"
              value={user.password}
            />
          </label>
        ) : (
          <>
            <label>
              Enter new password
              <input
                name="password"
                onChange={onChange}
                type="text"
                value={user.newPassword}
              />
            </label>
            <label>
              Confirm new password
              <input
                name="passwordConfirm"
                onChange={onChange}
                type="text"
                value={user.newPasswordConfirm}
              />
            </label>
          </>
        )}
        <button>{isConfirmed ? "Change Password" : "Submit"}</button>
      </form>
    </section>
  );
};
