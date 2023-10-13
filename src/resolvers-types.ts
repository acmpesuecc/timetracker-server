import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum EventType {
  End = 'End',
  Start = 'Start'
}

export type IRecord = {
  event?: InputMaybe<EventType>;
  time: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateAccount?: Maybe<Scalars['Boolean']>;
  Delete?: Maybe<Scalars['Boolean']>;
  Edit?: Maybe<Scalars['Boolean']>;
  Login?: Maybe<Scalars['String']>;
  Punch?: Maybe<Scalars['ID']>;
  Sheet?: Maybe<Scalars['ID']>;
};


export type MutationCreateAccountArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationDeleteArgs = {
  itemId: Scalars['ID'];
};


export type MutationEditArgs = {
  itemId: Scalars['ID'];
  record?: InputMaybe<IRecord>;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationPunchArgs = {
  sheetId: Scalars['ID'];
};


export type MutationSheetArgs = {
  Month: Scalars['Int'];
  Year: Scalars['Int'];
  sheetName: Scalars['String'];
};

export type NRecord = {
  __typename?: 'NRecord';
  event: EventType;
  id: Scalars['ID'];
  time: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  Sheet?: Maybe<SheetInfo>;
  Sheets?: Maybe<Array<Sheet>>;
};


export type QuerySheetArgs = {
  sheetId: Scalars['ID'];
};

export type Sheet = {
  __typename?: 'Sheet';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type SheetInfo = {
  __typename?: 'SheetInfo';
  hasEnded: Scalars['Boolean'];
  records: Array<NRecord>;
  summary: Sheet;
  total: Scalars['Int'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  EventType: EventType;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  IRecord: IRecord;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  NRecord: ResolverTypeWrapper<NRecord>;
  Query: ResolverTypeWrapper<{}>;
  Sheet: ResolverTypeWrapper<Sheet>;
  SheetInfo: ResolverTypeWrapper<SheetInfo>;
  String: ResolverTypeWrapper<Scalars['String']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  ID: Scalars['ID'];
  IRecord: IRecord;
  Int: Scalars['Int'];
  Mutation: {};
  NRecord: NRecord;
  Query: {};
  Sheet: Sheet;
  SheetInfo: SheetInfo;
  String: Scalars['String'];
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  CreateAccount?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationCreateAccountArgs, 'password' | 'username'>>;
  Delete?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteArgs, 'itemId'>>;
  Edit?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationEditArgs, 'itemId'>>;
  Login?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'username'>>;
  Punch?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationPunchArgs, 'sheetId'>>;
  Sheet?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationSheetArgs, 'Month' | 'Year' | 'sheetName'>>;
}>;

export type NRecordResolvers<ContextType = any, ParentType extends ResolversParentTypes['NRecord'] = ResolversParentTypes['NRecord']> = ResolversObject<{
  event?: Resolver<ResolversTypes['EventType'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  Sheet?: Resolver<Maybe<ResolversTypes['SheetInfo']>, ParentType, ContextType, RequireFields<QuerySheetArgs, 'sheetId'>>;
  Sheets?: Resolver<Maybe<Array<ResolversTypes['Sheet']>>, ParentType, ContextType>;
}>;

export type SheetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Sheet'] = ResolversParentTypes['Sheet']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SheetInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['SheetInfo'] = ResolversParentTypes['SheetInfo']> = ResolversObject<{
  hasEnded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  records?: Resolver<Array<ResolversTypes['NRecord']>, ParentType, ContextType>;
  summary?: Resolver<ResolversTypes['Sheet'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Mutation?: MutationResolvers<ContextType>;
  NRecord?: NRecordResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Sheet?: SheetResolvers<ContextType>;
  SheetInfo?: SheetInfoResolvers<ContextType>;
}>;

