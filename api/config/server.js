module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  cron: {
    enabled: true,
  },
  url: env("BASE_URL", "http://localhost:1337"),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "597461b24aa875ae69d4f7480c3a66be"),
    },
  },
});
