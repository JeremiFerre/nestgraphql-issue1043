import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';

// tslint:disable-next-line:no-var-requires
const { constraintDirective, constraintDirectiveTypeDefs } = require('graphql-constraint-directive');

@Module({
  imports: [
    GraphQLModule.forRoot({
        context: ({ req, res }) => ({ req, res }),
        typePaths: ['./**/*.graphql'],
        typeDefs: constraintDirectiveTypeDefs,
        transformSchema: constraintDirective(),
        playground: {
          settings: {
            'request.credentials': 'include',
          },
        },
        introspection: true,
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
