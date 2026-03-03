export interface RegisterRequestDto {
    name: string;
    email: string;
    password: string
}

export interface RegisterResponseDto {
    accessToken: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
    }
}

export interface LoginRequestDto {
    email: string;
    password: string;
}

export enum AuthProvider {
  LOCAL = 'local',
  YANDEX = 'yandex',
  GITHUB = 'github',
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export enum SubscriptionPlan {
  FREE = 'free',
  PRO = 'pro',
  ENTERPRISE = 'enterprise',
}

export enum UserStatus {
  ACTIVE = 'active',
  BANNED = 'banned',
  SUSPENDED = 'suspended',
}

export interface AuthMeRequstDto {
    email: string;
    name: string;
    id: string;
    provider: AuthProvider.LOCAL | AuthProvider.YANDEX | AuthProvider.GITHUB;
    providerId: string;
    isEmailVerified: boolean;
    emailVerificationToken: string;
    passwordResetToken: string;
    passwordResetExpires: Date;
    role: UserRole.USER | UserRole.ADMIN;
    plan: SubscriptionPlan.FREE | SubscriptionPlan.PRO | SubscriptionPlan.ENTERPRISE;
    status: UserStatus.ACTIVE | UserStatus.BANNED | UserStatus.SUSPENDED;
    avatarUrl: string;
    lastLoginAt: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export type LoginResponseDto = RegisterResponseDto

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export interface ChangeProfileDto {
  name: string;
}

export interface ProjectDto {
  id: string;
  nanoId: string;
  name: string;
  description?: string;
  createdAt: string;
}

export interface CreateProjectPayload {
  name: string;
  description?: string;
}

export interface ResourceDto {
  id: string;
  name: string;
  schema: SchemaFieldDto[];
  data: Record<string, unknown>[];
  createdAt: string;
}

export interface CreateResourcePayload {
  name: string;
  projectNanoId: string;
}

export interface SchemaFieldDto {
  name: string;
  type: string;
}

export interface UpdateSchemaPayload {
  resourceId: string;
  projectNanoId: string;
  schema: SchemaFieldDto[];
}

export interface GenerateDataPayload {
  resourceId: string;
  projectNanoId: string;
  count?: number;
}

export interface Session {
  sessionId: string;
  ip: string;
  device: string;
  createdAt: string;
  lastActive: string;
  isCurrent?: boolean
}