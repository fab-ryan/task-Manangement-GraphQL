/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../schema/context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  TaskFilter: { // input type
    category?: string | null; // String
    description?: string | null; // String
    dueDate?: NexusGenScalars['DateTime'] | null; // DateTime
    priority?: NexusGenEnums['Priority'] | null; // Priority
    status?: NexusGenEnums['Status'] | null; // Status
    title?: string | null; // String
  }
  TaskSort: { // input type
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    dueDate?: NexusGenEnums['SortOrder'] | null; // SortOrder
    updatedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  Upload: { // input type
    encoding: string; // String!
    filename: string; // String!
    mimetype: string; // String!
  }
}

export interface NexusGenEnums {
  Category: "OTHER" | "PERSONAL" | "SHOPPING" | "WORK"
  Priority: "HIGH" | "LOW" | "MEDIUM"
  Role: "ADMIN" | "USER"
  SortOrder: "asc" | "desc"
  Status: "COMPLETED" | "IN_PROGRESS" | "PENDING"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
  JSONTypes: any
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    accessToken: string; // String!
    refreshToken: string; // String!
  }
  AuthRefreshToken: { // root type
    accessToken: string; // String!
    refreshToken?: string | null; // String
  }
  Dashboard: { // root type
    activeUsers: number; // Int!
    completedTasks: number; // Int!
    inProgressTasks: number; // Int!
    inactiveUsers: number; // Int!
    overallProgress: number; // Int!
    pendingTasks: number; // Int!
    tasksByCategory: NexusGenScalars['JSONTypes']; // JSONTypes!
    tasksByPriority: NexusGenScalars['JSONTypes']; // JSONTypes!
    totalTasks: number; // Int!
    totalUsers: number; // Int!
  }
  Mutation: {};
  Profile: { // root type
    address?: string | null; // String
    city?: string | null; // String
    createdAt?: string | null; // String
    id: string; // ID!
    isVerified?: boolean | null; // Boolean
    phone?: string | null; // String
    profilePictureUrl?: string | null; // String
    state?: string | null; // String
    updatedAt?: string | null; // String
    userId: string; // ID!
    zip?: string | null; // String
  }
  Query: {};
  Task: { // root type
    category: string; // String!
    createdAt: string; // String!
    description: string; // String!
    dueDate: string; // String!
    id: string; // ID!
    priority: NexusGenEnums['Priority']; // Priority!
    startDate: string; // String!
    status: NexusGenEnums['Status']; // Status!
    title: string; // String!
    updatedAt: string; // String!
  }
  User: { // root type
    createdAt: string; // String!
    email: string; // String!
    id: string; // ID!
    name: string; // String!
    password: string; // String!
    role: string; // String!
    status: boolean; // Boolean!
    updatedAt: string; // String!
  }
  UserProfile: { // root type
    profile?: NexusGenRootTypes['Profile'] | null; // Profile
    user: NexusGenRootTypes['User']; // User!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    accessToken: string; // String!
    refreshToken: string; // String!
  }
  AuthRefreshToken: { // field return type
    accessToken: string; // String!
    refreshToken: string | null; // String
  }
  Dashboard: { // field return type
    activeUsers: number; // Int!
    completedTasks: number; // Int!
    inProgressTasks: number; // Int!
    inactiveUsers: number; // Int!
    overallProgress: number; // Int!
    pendingTasks: number; // Int!
    tasksByCategory: NexusGenScalars['JSONTypes']; // JSONTypes!
    tasksByPriority: NexusGenScalars['JSONTypes']; // JSONTypes!
    totalTasks: number; // Int!
    totalUsers: number; // Int!
  }
  Mutation: { // field return type
    activateUser: NexusGenRootTypes['User'] | null; // User
    completeTask: NexusGenRootTypes['Task']; // Task!
    createProfile: NexusGenRootTypes['Profile'] | null; // Profile
    createTask: NexusGenRootTypes['Task']; // Task!
    createUser: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
    deleteTask: NexusGenRootTypes['Task']; // Task!
    inProgressTask: NexusGenRootTypes['Task']; // Task!
    login: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    refreshToken: NexusGenRootTypes['AuthRefreshToken']; // AuthRefreshToken!
    updateTask: NexusGenRootTypes['Task']; // Task!
  }
  Profile: { // field return type
    address: string | null; // String
    city: string | null; // String
    createdAt: string | null; // String
    id: string; // ID!
    isVerified: boolean | null; // Boolean
    phone: string | null; // String
    profilePictureUrl: string | null; // String
    state: string | null; // String
    updatedAt: string | null; // String
    userId: string; // ID!
    zip: string | null; // String
  }
  Query: { // field return type
    allUsers: Array<NexusGenRootTypes['User'] | null> | null; // [User]
    getAllTasks: Array<NexusGenRootTypes['Task'] | null> | null; // [Task]
    getDashboard: NexusGenRootTypes['Dashboard'] | null; // Dashboard
    getTaskById: NexusGenRootTypes['Task'] | null; // Task
    getUserProfile: NexusGenRootTypes['UserProfile'] | null; // UserProfile
  }
  Task: { // field return type
    category: string; // String!
    createdAt: string; // String!
    description: string; // String!
    dueDate: string; // String!
    id: string; // ID!
    priority: NexusGenEnums['Priority']; // Priority!
    startDate: string; // String!
    status: NexusGenEnums['Status']; // Status!
    title: string; // String!
    updatedAt: string; // String!
  }
  User: { // field return type
    createdAt: string; // String!
    email: string; // String!
    id: string; // ID!
    name: string; // String!
    password: string; // String!
    role: string; // String!
    status: boolean; // Boolean!
    updatedAt: string; // String!
  }
  UserProfile: { // field return type
    profile: NexusGenRootTypes['Profile'] | null; // Profile
    user: NexusGenRootTypes['User']; // User!
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    accessToken: 'String'
    refreshToken: 'String'
  }
  AuthRefreshToken: { // field return type name
    accessToken: 'String'
    refreshToken: 'String'
  }
  Dashboard: { // field return type name
    activeUsers: 'Int'
    completedTasks: 'Int'
    inProgressTasks: 'Int'
    inactiveUsers: 'Int'
    overallProgress: 'Int'
    pendingTasks: 'Int'
    tasksByCategory: 'JSONTypes'
    tasksByPriority: 'JSONTypes'
    totalTasks: 'Int'
    totalUsers: 'Int'
  }
  Mutation: { // field return type name
    activateUser: 'User'
    completeTask: 'Task'
    createProfile: 'Profile'
    createTask: 'Task'
    createUser: 'AuthPayload'
    deleteTask: 'Task'
    inProgressTask: 'Task'
    login: 'AuthPayload'
    refreshToken: 'AuthRefreshToken'
    updateTask: 'Task'
  }
  Profile: { // field return type name
    address: 'String'
    city: 'String'
    createdAt: 'String'
    id: 'ID'
    isVerified: 'Boolean'
    phone: 'String'
    profilePictureUrl: 'String'
    state: 'String'
    updatedAt: 'String'
    userId: 'ID'
    zip: 'String'
  }
  Query: { // field return type name
    allUsers: 'User'
    getAllTasks: 'Task'
    getDashboard: 'Dashboard'
    getTaskById: 'Task'
    getUserProfile: 'UserProfile'
  }
  Task: { // field return type name
    category: 'String'
    createdAt: 'String'
    description: 'String'
    dueDate: 'String'
    id: 'ID'
    priority: 'Priority'
    startDate: 'String'
    status: 'Status'
    title: 'String'
    updatedAt: 'String'
  }
  User: { // field return type name
    createdAt: 'String'
    email: 'String'
    id: 'ID'
    name: 'String'
    password: 'String'
    role: 'String'
    status: 'Boolean'
    updatedAt: 'String'
  }
  UserProfile: { // field return type name
    profile: 'Profile'
    user: 'User'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    activateUser: { // args
      id: string; // String!
    }
    completeTask: { // args
      id: string; // String!
    }
    createProfile: { // args
      address?: string | null; // String
      city?: string | null; // String
      phone?: string | null; // String
      state?: string | null; // String
      userId: string; // String!
      zip?: string | null; // String
    }
    createTask: { // args
      category: NexusGenEnums['Category']; // Category!
      description: string; // String!
      dueDate: string; // String!
      priority: NexusGenEnums['Priority']; // Priority!
      startDate: string; // String!
      title: string; // String!
    }
    createUser: { // args
      email: string; // String!
      name: string; // String!
      password: string; // String!
      role?: NexusGenEnums['Role'] | null; // Role
      status: boolean; // Boolean!
    }
    deleteTask: { // args
      id: string; // String!
      status?: NexusGenEnums['Status'] | null; // Status
    }
    inProgressTask: { // args
      id: string; // String!
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    refreshToken: { // args
      refreshToken: string; // String!
    }
    updateTask: { // args
      category?: NexusGenEnums['Category'] | null; // Category
      description?: string | null; // String
      dueDate?: string | null; // String
      id: string; // String!
      priority?: NexusGenEnums['Priority'] | null; // Priority
      startDate?: string | null; // String
      title?: string | null; // String
    }
  }
  Query: {
    allUsers: { // args
      skip?: number | null; // Int
      take: number | null; // Int
    }
    getAllTasks: { // args
      filter?: NexusGenInputs['TaskFilter'] | null; // TaskFilter
      skip?: number | null; // Int
      sort?: NexusGenInputs['TaskSort'] | null; // TaskSort
      take: number | null; // Int
    }
    getTaskById: { // args
      id?: string | null; // String
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}