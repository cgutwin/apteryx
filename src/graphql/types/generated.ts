import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
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
  Date: any;
  UPC: any;
};

export enum DateQualifier {
  After = 'AFTER',
  Before = 'BEFORE',
  On = 'ON'
}

export type Expiry = {
  __typename?: 'Expiry';
  date: Scalars['Date'];
  id: Scalars['ID'];
  pulled: Scalars['Boolean'];
};

export type ExpiryFilterArg = {
  date: Scalars['Date'];
  qualifier: DateQualifier;
};

export type Mutation = {
  __typename?: 'Mutation';
  product?: Maybe<ProductMutation>;
};

export type Product = {
  __typename?: 'Product';
  /**
   * Retrieve an array of expiry information for a product, with the
   * ability to filter down dates to return.
   *
   * The filter input is defined as either an array of filter(s). Multiple filters in the array are joined with AND.
   */
  expiry: Array<Maybe<Expiry>>;
  id: Scalars['ID'];
  price: Scalars['Float'];
  upc: Scalars['UPC'];
};


export type ProductExpiryArgs = {
  filter?: InputMaybe<Array<ExpiryFilterArg>>;
  first?: InputMaybe<Scalars['Int']>;
};

export type ProductInput = {
  price: Scalars['Float'];
  upc: Scalars['UPC'];
};

export type ProductMutation = {
  __typename?: 'ProductMutation';
  create: Product;
};


export type ProductMutationCreateArgs = {
  product: ProductInput;
};

export type Query = {
  __typename?: 'Query';
  ping: Scalars['String'];
  product: Product;
};


export type QueryProductArgs = {
  upc?: InputMaybe<Scalars['UPC']>;
};



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
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateQualifier: DateQualifier;
  Expiry: ResolverTypeWrapper<Expiry>;
  ExpiryFilterArg: ExpiryFilterArg;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Product: ResolverTypeWrapper<Product>;
  ProductInput: ProductInput;
  ProductMutation: ResolverTypeWrapper<ProductMutation>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  UPC: ResolverTypeWrapper<Scalars['UPC']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  Expiry: Expiry;
  ExpiryFilterArg: ExpiryFilterArg;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Product: Product;
  ProductInput: ProductInput;
  ProductMutation: ProductMutation;
  Query: {};
  String: Scalars['String'];
  UPC: Scalars['UPC'];
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type ExpiryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Expiry'] = ResolversParentTypes['Expiry']> = {
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  pulled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  product?: Resolver<Maybe<ResolversTypes['ProductMutation']>, ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  expiry?: Resolver<Array<Maybe<ResolversTypes['Expiry']>>, ParentType, ContextType, RequireFields<ProductExpiryArgs, 'first'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  upc?: Resolver<ResolversTypes['UPC'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductMutation'] = ResolversParentTypes['ProductMutation']> = {
  create?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<ProductMutationCreateArgs, 'product'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  ping?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType, Partial<QueryProductArgs>>;
};

export interface UpcScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UPC'], any> {
  name: 'UPC';
}

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Expiry?: ExpiryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductMutation?: ProductMutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UPC?: GraphQLScalarType;
};

