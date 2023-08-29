# Tonlend Blockchain Server

## Bootstrap

Fill in the `.env` and `.yaml` in /config folder

```
npm run prepare
npm run dev
```

## Database

### Migration

Prisma schema: `./prisma/schema.prisma`

Migrations: `./prisma/migrations/<name>`

Auto-generate typescript types

```
npx prisma generate
```

Auto-generate typescript types and sync database schema

```
npm run prisma:sync
```

Generate migration

```
npm run prisma:migrate --name=MIGRATION_NAME
```

### start prisma studio

it will show you the simple GUI for doing CRUD

```
npx prisma studio
```

## GraphQL Update Procedure

1. Add schema in `gql/`
2. Start server
3. Setup `codegen.ts` based on server URL
4. Execute `npm run codegen` to generate corresponding types
