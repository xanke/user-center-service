export default async ctx => {
  await ctx.model.Users.sync({ alter: true });
};
