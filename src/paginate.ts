import { QueryParameters } from './query-parameters';

export type Paginated<T> = {
  readonly data: T[];
  readonly meta: Meta;
};

export type Meta = {
  readonly itemsPerPage: number;
  readonly totalItems: number;
  readonly currentPage: number;
  readonly totalPages: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;
};

export function paginate<T>(
  queryParameters: QueryParameters,
  results: [itemCount: number, data: T[]],
): Paginated<T> {
  return {
    data: results[1],
    meta: buildMeta(queryParameters, results[0]),
  };
}

function buildMeta(queryParameters: QueryParameters, totalItems: number): Meta {
  const itemsPerPage = Number(queryParameters.limit);
  const currentPage = Number(queryParameters.page);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;
  return {
    itemsPerPage,
    totalItems,
    currentPage,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
}
