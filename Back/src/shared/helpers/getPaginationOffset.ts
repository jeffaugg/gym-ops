export function getPaginationOffset(page: number, limit: number) {
  return (page - 1) * limit;
}
