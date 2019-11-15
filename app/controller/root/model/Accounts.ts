export default async ctx => {
  await ctx.model.Users.sync({ alter: true });
  await ctx.model.UsersCaptchas.sync({ alter: true });
};
