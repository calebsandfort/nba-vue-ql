import { GraphQLDateTime } from 'graphql-iso-date';

import teamResolvers from './team';
import seasonResolvers from './season';
import seasonMonthResolvers from './seasonMonth';
import gameResolvers from './game';
import playResolvers from './play';
import scoreBarResolvers from './scoreBar';
import teamSeasonResolvers from './teamSeason';
import teamSeasonMonthResolvers from './teamSeasonMonth';
// import {scalarResolverMap} from './scalars'

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  // scalarResolverMap,
  customScalarResolver,
  teamResolvers,
  seasonResolvers,
  gameResolvers,
  playResolvers,
  scoreBarResolvers,
  seasonMonthResolvers,
  teamSeasonResolvers,
  teamSeasonMonthResolvers
];