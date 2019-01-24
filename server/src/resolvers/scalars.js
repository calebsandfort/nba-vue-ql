import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import moment from 'moment';

export const scalarResolverMap = {
  MomentDate: new GraphQLScalarType({
    name: 'MomentDate',
    description: 'MomentDate custom scalar type',
    parseValue(value) {
      return moment(value); // value from the client
    },
    serialize(value) {
      return value.unix();; // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return moment(last.value) // ast value is always in string format
      }
      return null;
    },
  }),
};