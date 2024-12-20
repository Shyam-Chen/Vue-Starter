import type { ComponentProps } from 'vue-component-type-helpers';
import { XTable } from '@x/ui';

export type XTableProps = ComponentProps<typeof XTable>;

export type User = {
  _id?: string;
  username?: string;
  fullName?: string;
  email?: string;
  role?: 'viewer' | 'editor' | 'admin' | 'custom';
  status?: boolean;
  otpEnabled?: boolean;
  otpVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type State = {
  usersDialog: boolean;
  usersFilter: User;
  usersLoading: boolean;
  usersRows: User[];
  usersCount: number;
  usersControl: XTableProps['control'];

  userDialog: boolean;
  userMode: 'new' | 'edit';
  userForm: User;

  deleteDialog: boolean;
  deleteExpected: User['username'];
  deleteContent: User;
  deleteLoading: boolean;
};
