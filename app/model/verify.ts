import { Application } from 'egg';
import BaseModel from './base';

export default function Verify(app: Application) {
  const { STRING } = app.Sequelize;

  const verifySchema = BaseModel(
    app,
    'verifys',
    {
      account: {
        type: STRING,
        allowNull: false,
      },
      code: {
        type: STRING,
        allowNull: false,
      },
    },
  );
  return verifySchema;
}
