// eslint-disable-next-line node/no-unpublished-import
import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3000/graphql',
  generates: {
    'src/gql/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        namingConvention: {
          enumValues: 'keep',
        },
      },
    },
  },
};

export default config;
