import * as authSchema from "./schemas/auth-schema";
import * as contentSchema from "./schemas/content-schema";

const schema = {
  ...authSchema,
  ...contentSchema,
};

export default schema;
