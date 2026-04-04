import type { PaginatedReponse } from "@/types/pagination";

export const EMPTY_RESPONSE: PaginatedReponse<never> = {
  current_page: 1,
  total_pages: 0,
  has_next: false,
  has_previous: false,
  total_items: 0,
  items_per_page: 10,
  data: [],
};
