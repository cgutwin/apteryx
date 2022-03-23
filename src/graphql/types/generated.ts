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
  upc: Scalars['UPC'];
};

export type ExpiryFilter = {
  date: Scalars['Date'];
  inclusive?: InputMaybe<Scalars['Boolean']>;
  qualifier?: InputMaybe<DateQualifier>;
};

export type ExpiryInput = {
  date: Scalars['Date'];
  upc: Scalars['UPC'];
};

export type ExpiryMutation = {
  __typename?: 'ExpiryMutation';
  create: Expiry;
  /** Delete an expiry given an ID. Returns the number of records deleted. */
  deleteByID: Scalars['Int'];
  /** Delete all expiring for a given UPC. Returns the number of records deleted. */
  deleteByUPC: Scalars['Int'];
};


export type ExpiryMutationCreateArgs = {
  expiry: ExpiryInput;
};


export type ExpiryMutationDeleteByIdArgs = {
  id: Scalars['ID'];
};


export type ExpiryMutationDeleteByUpcArgs = {
  upc: Scalars['UPC'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** All mutation functions for expiry operations. */
  expiry: ExpiryMutation;
  /** All mutation functions for product operations. */
  product: ProductMutation;
};

/** Fields required to update a new product in the database. All optional. */
export type PartialProductInput = {
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  upc?: InputMaybe<Scalars['UPC']>;
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
  /** Product ID set from the database. */
  id: Scalars['ID'];
  /** Recognizable name of the product. */
  name: Scalars['String'];
  /** Scalar price value. */
  price: Scalars['Float'];
  /** UPC-A type, including parity digit, of the product. */
  upc: Scalars['UPC'];
};


export type ProductExpiryArgs = {
  filter?: InputMaybe<Array<ExpiryFilter>>;
};

/** Fields required to create a new product in the database. */
export type ProductInput = {
  name: Scalars['String'];
  price: Scalars['Float'];
  upc: Scalars['UPC'];
};

export type ProductMutation = {
  __typename?: 'ProductMutation';
  /** Create a product given the required ProductInput. */
  create: Product;
  update: Product;
};


export type ProductMutationCreateArgs = {
  product: ProductInput;
};


export type ProductMutationUpdateArgs = {
  data: PartialProductInput;
  upc: Scalars['UPC'];
};

export type Query = {
  __typename?: 'Query';
  /** Find expiry data for a product, given a UPC and an optional filter. */
  expiryByUPC?: Maybe<Array<Expiry>>;
  ping: Scalars['String'];
  /** Query for a product given the UPC-A code. */
  product: Product;
};


export type QueryExpiryByUpcArgs = {
  filter?: InputMaybe<Array<ExpiryFilter>>;
  upc: Scalars['UPC'];
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
  ExpiryFilter: ExpiryFilter;
  ExpiryInput: ExpiryInput;
  ExpiryMutation: ResolverTypeWrapper<ExpiryMutation>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  PartialProductInput: PartialProductInput;
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
  ExpiryFilter: ExpiryFilter;
  ExpiryInput: ExpiryInput;
  ExpiryMutation: ExpiryMutation;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  PartialProductInput: PartialProductInput;
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
  upc?: Resolver<ResolversTypes['UPC'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExpiryMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExpiryMutation'] = ResolversParentTypes['ExpiryMutation']> = {
  create?: Resolver<ResolversTypes['Expiry'], ParentType, ContextType, RequireFields<ExpiryMutationCreateArgs, 'expiry'>>;
  deleteByID?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<ExpiryMutationDeleteByIdArgs, 'id'>>;
  deleteByUPC?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<ExpiryMutationDeleteByUpcArgs, 'upc'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  expiry?: Resolver<ResolversTypes['ExpiryMutation'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['ProductMutation'], ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  expiry?: Resolver<Array<Maybe<ResolversTypes['Expiry']>>, ParentType, ContextType, Partial<ProductExpiryArgs>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  upc?: Resolver<ResolversTypes['UPC'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductMutation'] = ResolversParentTypes['ProductMutation']> = {
  create?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<ProductMutationCreateArgs, 'product'>>;
  update?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<ProductMutationUpdateArgs, 'data' | 'upc'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  expiryByUPC?: Resolver<Maybe<Array<ResolversTypes['Expiry']>>, ParentType, ContextType, RequireFields<QueryExpiryByUpcArgs, 'upc'>>;
  ping?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType, Partial<QueryProductArgs>>;
};

export interface UpcScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UPC'], any> {
  name: 'UPC';
}

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Expiry?: ExpiryResolvers<ContextType>;
  ExpiryMutation?: ExpiryMutationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductMutation?: ProductMutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UPC?: GraphQLScalarType;
};

