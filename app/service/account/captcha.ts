import { Service } from "egg";
import * as moment from "moment";

function randomn() {
  // if (n > 21) return null;
  // const re = new RegExp("(\\d{" + n + "})(\\.|$)");
  // const num = (Array(n - 1).join(0) + Math.pow(10, n) * Math.random()).match(
  //   re
  // )[1];
  // return num;
  return 123456;
}

const captcheValidity = 300;

export default class CaptchaService extends Service {
  Model: any;

  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.UsersCaptchas;
  }

  // createByEmail(email) {}

  async getByUsername(username) {
    const oData = await this.findByUsername(username);
    if (oData) return oData.code;

    // try {
    return await this.create({ username });
    // } catch (e) {
    //   throw new Error('CreateCaptcheError');
    // }
  }

  createCode() {
    return randomn();
  }

  async checkSend(action, { userId }) {
    const data = await this.Model.findOne({
      where: {
        action,
        userId,
        createdTime: {
          $gt: Date.now() - 50 * 1000 // 50秒
        }
      }
    });
    if (data) throw new Error("频繁操作");
  }

  async checkCode(action, { userId, code }) {
    const data = await this.Model.findOne({
      where: {
        userId,
        code,
        used: false,
        action,
        createdTime: {
          $gt: Date.now() - 300 * 1000 // 5分钟内有效
        }
      }
    });
    if (!data || data.code !== code) throw new Error("CodeError");
    this.usedById(data.id);
    return { message: "发送成功" };
  }

  async create(create) {
    create.createdTime = Date.now();
    return await this.Model.create(create);
  }

  async findByUsername(username) {
    const validityTime = moment()
      .subtract(captcheValidity + 60, "seconds")
      .format("YYYY-MM-DD HH:mm:ss");
    const data = await this.Model.findOne({
      where: { username, used: false, created_at: { $gt: validityTime } },
      order: [["id", "DESC"]]
    });
    return data;
  }

  async checkByUsername({ username, code }) {
    const data = await this.findByUsername(username);
    if (data && data.code === code) {
      await this.usedById(data.id);
      return true;
    }
    throw new Error("CaptchaError");
  }

  async usedById(id) {
    await this.Model.update({ used: true }, { where: { id } });
  }
}
