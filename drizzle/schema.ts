import { sql } from 'drizzle-orm';
import {
  pgTable,
  pgEnum,
  uniqueIndex,
  text,
  boolean,
  timestamp,
  varchar,
  uuid,
} from 'drizzle-orm/pg-core';

export const keyStatus = pgEnum('key_status', [
  'default',
  'valid',
  'invalid',
  'expired',
]);
export const keyType = pgEnum('key_type', [
  'aead-ietf',
  'aead-det',
  'hmacsha512',
  'hmacsha256',
  'auth',
  'shorthash',
  'generichash',
  'kdf',
  'secretbox',
  'secretstream',
  'stream_xchacha20',
]);
export const aalLevel = pgEnum('aal_level', ['aal1', 'aal2', 'aal3']);
export const codeChallengeMethod = pgEnum('code_challenge_method', [
  's256',
  'plain',
]);
export const factorStatus = pgEnum('factor_status', ['unverified', 'verified']);
export const factorType = pgEnum('factor_type', ['totp', 'webauthn']);

export const refreshToken = pgTable(
  'refresh_token',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    hashedToken: text('hashedToken').notNull(),
    userId: text('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    revoked: boolean('revoked').notNull(),
    createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }),
  },
  (table) => {
    return {
      refreshTokenIdKey: uniqueIndex('RefreshToken_id_key').on(table.id),
    };
  },
);

export const user = pgTable(
  'user',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }),
  },
  (table) => {
    return {
      userIdKey: uniqueIndex('User_id_key').on(table.id),
    };
  },
);
