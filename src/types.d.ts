import {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";
declare const tables: readonly [
  {
    readonly name: "Posts";
    readonly columns: readonly [
      {
        readonly name: "Image";
        readonly type: "string";
      },
      {
        readonly name: "lpost";
        readonly type: "text";
      }
    ];
  },
  {
    readonly name: "Users";
    readonly columns: readonly [
      {
        readonly name: "name";
        readonly type: "string";
      },
      {
        readonly name: "email";
        readonly type: "email";
      },
      {
        readonly name: "bio";
        readonly type: "text";
      }
    ];
  }
];
export declare type SchemaTables = typeof tables;
export declare type InferredTypes = SchemaInference<SchemaTables>;
export declare type Posts = InferredTypes["Posts"];
export declare type PostsRecord = Posts & XataRecord;
export declare type Users = InferredTypes["Users"];
export declare type UsersRecord = Users & XataRecord;
export declare type DatabaseSchema = {
  Posts: PostsRecord;
  Users: UsersRecord;
};
declare const DatabaseClient: any;
export declare class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions);
}
export declare const getXataClient: () => XataClient;
export {};
