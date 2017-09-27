import { STRING, TEXT, DECIMAL, INTEGER } from 'sequelize';
import { DEFAULT_MODEL_SETTINGS } from './config';
import sequelize from '../services/sequelize';
import winston from 'winston';

export const Permission = sequelize.define('permission', {
  code: { 
    type: STRING, 
    allowNull: false 
  },
  label: {
    type: STRING,
    allowNull: false
  }
}, DEFAULT_MODEL_SETTINGS);

export const PermissionGroup = sequelize.define('permission_group', {
  name: { 
    type: STRING, 
    allowNull: false 
  }
}, DEFAULT_MODEL_SETTINGS);

export const PermissionGroupPermissions = sequelize.define('permission_group_permissions', {}, DEFAULT_MODEL_SETTINGS);

// Associations. See: http://docs.sequelizejs.com/manual/tutorial/associations.html
PermissionGroupPermissions.belongsTo(PermissionGroup, { foreignKey: 'permission_group_id' });
PermissionGroupPermissions.belongsTo(Permission, { foreignKey: 'permission_id' });

export async function migrate() {
  try {
    await Permission.sync({ force: process.env.RECREATE_SCHEMA === 'true' });
    let createPermissions = [
      {
        code: 'IMPERSONATE',
        label: 'Can Impersonate Other Users'
      },
      {
        code: 'VIEW_ALL_USERS',
        label: 'Can View Other User Profiles'
      }
    ];
  

    let permissions = await Promise.all(createPermissions.map(permissionRecord => {
      return Permission.create(permissionRecord);
    }));

    let permissionGroup = await PermissionGroup.create({
      name: 'System Administrator'
    });

    await permissions
      .map(permission => {
        return PermissionGroupPermissions.create({
          permission_group_id: permissionGroup.id,
          permission_id: permission.id
        });
      });
  } catch (error) {
    winston.error(error);
  }
}
