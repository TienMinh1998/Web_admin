export type PaginatorInterface = {
  current_page: number
  per_page: number
  total: number
  total_pages: number
}
export type ResponsePaginatorApi<T> = {
  data: T[]
  meta: {
    pagination: PaginatorInterface
  }
}
