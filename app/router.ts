import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.post('/v1/sign-in', controller.account.signIn);
  router.post('/v1/wx-login', controller.wx.login);
  router.post('/v1/login', controller.account.login);
  router.post('/v1/verify-code/sms-code', controller.verify.smsCode);
  router.post('/v1/verify-code/email-code', controller.verify.emailCode);
  router.get('/v1/user', controller.user.info);
};
