module.exports = async (ctx, next) => {
  if (ctx.state.user.uid === ctx.params.id) {
    return await next();
  }
  ctx.unauthorized(`You're not allowed to perform this action!`);
};
