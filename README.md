# nestjs-prisma-pagination

## Installation

```console
> npm i @mirrom/nestjs-prisma-pagination
> pnpm add @mirrom/nestjs-prisma-pagination
> yarn add @mirrom/nestjs-prisma-pagination
```


## Setup

Add to your main.ts:

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // [...]

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // [...]

  await app.listen(3000);
}
```

## Usage

### Controller

```ts
import { Paginated, QueryParameters } from '@mirrom/nestjs-prisma-pagination';

@Controller('cats')
@ApiTags('Cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getCats(
    @Query()
    queryParameters: QueryParameters,
  ): Promise<Paginated<Cat>> {
    return this.catsService.getCats(queryParameters);
  }
}
```

### Service

```ts
import {
  Paginated,
  QueryParameters,
  paginate,
} from '@mirrom/nestjs-prisma-pagination';

@Injectable()
export class CatsService {
  constructor(private prisma: PrismaService) {}

  async getCats(queryParameters: QueryParameters): Promise<Paginated<Cat>> {
    return paginate(
      queryParameters,
      await this.prisma.$transaction([
        this.prisma.cat.count({
          where: {},
        }),
        this.prisma.cat.findMany({
          where: {},
          take: queryParameters.limit,
          skip: queryParameters.limit * (queryParameters.page - 1),
        }),
      ]),
    );
  }
}
```
