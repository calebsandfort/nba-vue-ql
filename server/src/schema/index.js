import { gql } from 'apollo-server-express';

import teamSchema from './team';
import seasonSchema from './season';
import gameSchema from './game';
import playSchema from './play';
import scoreBarSchema from './scoreBar';
import seasonMonthSchema from './seasonMonth';
import teamSeasonSchema from './teamSeason';
import teamSeasonMonthSchema from './teamSeasonMonth';
import entityQuerySchema from './entityQuery';


const linkSchema = gql`
    scalar Date
    
    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
    type Subscription {
        _: Boolean
    }
`;

export default [linkSchema, teamSchema, seasonSchema, gameSchema, playSchema, scoreBarSchema, seasonMonthSchema, teamSeasonSchema, teamSeasonMonthSchema, entityQuerySchema];