import { User, UserEmail, UserProfile, migrate as MigrateUser } from './User';
import { Permission, migrate as MigratePermission } from './Permission';

export let Models = {
  User,
  UserEmail,
  UserProfile,
  Permission
};

export let Migrations = {
  MigrateUser,
  MigratePermission
};
