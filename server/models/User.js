import { STRING, TEXT, BOOLEAN } from 'sequelize';
import { DEFAULT_MODEL_SETTINGS } from './config';
import sequelize from '../services/sequelize';
import winston from 'winston';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';
import { Permission, PermissionGroup } from './Permission';

// Model definitions. Define parents and children in the same file, or create a subfolder for them with individual model files
// depending on how elaborate your model is.
export const User = sequelize.define(
  'user',
  {
    password: { type: TEXT, allowNull: false }
  },
  DEFAULT_MODEL_SETTINGS
);

export const UserProfile = sequelize.define(
  'user_profile',
  {
    first_name: {
      type: STRING,
      allowNull: false
    },
    last_name: { type: STRING, allowNull: false },
    city: { type: STRING },
    state: { type: STRING }
  },
  DEFAULT_MODEL_SETTINGS
);

export const UserEmail = sequelize.define(
  'user_email',
  {
    email: { type: STRING, allowNull: false, unique: true },
    is_primary: { type: BOOLEAN }
  },
  DEFAULT_MODEL_SETTINGS
);

export const UserPermission = sequelize.define('user_permission',
{}, DEFAULT_MODEL_SETTINGS);

export const UserPermissionGroup = sequelize.define('user_permission_group',
{}, DEFAULT_MODEL_SETTINGS);

// Associations. See: http://docs.sequelizejs.com/manual/tutorial/associations.html
UserProfile.hasOne(User, { foreignKey: 'user_profile_id' });
UserEmail.belongsTo(User, { foreignKey: 'user_id' });
UserPermission.belongsTo(User, { foreignKey: 'user_id'});
UserPermission.belongsTo(Permission, { foreignKey: 'permission_id' });
UserPermissionGroup.belongsTo(User, { foreignKey: 'user_id' });
UserPermissionGroup.belongsTo(PermissionGroup, { foreignKey: 'permission_group_id'});

export async function migrate() {
  try {
    await UserProfile.sync({ force: process.env.RECREATE_SCHEMA === 'true' });
    await User.sync({ force: process.env.RECREATE_SCHEMA === 'true' });
    await UserEmail.sync({ force: process.env.RECREATE_SCHEMA === 'true' });
    await UserPermission.sync({ force: process.env.RECREATE_SCHEMA === 'true' });

    let user = await User.create({
      password: bcrypt.hashSync(`P@ssword!1`, 5)
    });
    let userProfile = await UserProfile.create({
      first_name: `Eric`,
      last_name: `Nograles`,
      city: `Tampa`,
      state: `FL`
    });

    await user.update({ user_profile_id: userProfile.id });

    let createEmails = [
      {
        email: 'enograles+graphql.primary@appirio.com',
        is_primary: true,
        user_id: user.id
      },
      {
        email: 'enograles+graphql.secondary@appirio.com',
        is_primary: false,
        user_id: user.id
      }
    ].map(emailRecord => {
      return UserEmail.create(emailRecord);
    });

    let permissions = await Permission.findAll({
      where: {
        code: 'IMPERSONATE'
      }
    });

    let createPermissions = permissions
      .map(permissionRecord => {
      return UserPermission.create({
        permission_id: permissionRecord.id,
        user_id: user.id
      });
    });

    let permissionGroup = await PermissionGroup.find({
      where: {
        name: 'System Administrator'
      }
    });

    await UserPermissionGroup.create({
      user_id: user.id,
      permission_group_id: permissionGroup.id
    });
    await Promise.all(createEmails);
    await Promise.all(createPermissions);
  } catch (ex) {
    winston.error(`Could not scaffold User model and hierarchy. ${ex}`);
  }
}
