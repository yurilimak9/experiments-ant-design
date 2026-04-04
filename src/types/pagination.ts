export interface PaginatedReponse<T> {
  current_page: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
  total_items: number;
  items_per_page: number;
  data: T[];
}
