import { gql } from 'apollo-server-express';

import teamSchema from './team';
import seasonSchema from './season';
import gameSchema from './game';
import playSchema from './play';
import scoreBarSchema from './scoreBar';


const linkSchema = gql`
    scalar Date
    scalar MomentDate
    
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

export default [linkSchema, teamSchema, seasonSchema, gameSchema, playSchema, scoreBarSchema];