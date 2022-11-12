import { buildSchemaSync, Resolver, Query } from "type-graphql";
import { ImageResolver } from "./image";
// import { VenueResolver } from "./venue";
import { authChecker } from "./auth";

@Resolver()
class DummyResolver {
  @Query(() => String)
  hello() {
    return "Hello world!";
  }
}

export const schema = buildSchemaSync({
  resolvers: [
    DummyResolver,
    ImageResolver,
    // VenueResolver,
  ],
  authChecker,
  emitSchemaFile: process.env.NODE_ENV === "development",
});
