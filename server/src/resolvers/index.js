import { GraphQLDateTime } from 'graphql-iso-date';

import teamResolvers from './team';
import seasonResolvers from './season';
import gameResolvers from './game';
import playResolvers from './play';
import scoreBarResolvers from './scoreBar';
import {scalarResolverMap} from './scalars'

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  scalarResolverMap,
  customScalarResolver,
  teamResolvers,
  seasonResolvers,
  gameResolvers,
  playResolvers,
  scoreBarResolvers,
];