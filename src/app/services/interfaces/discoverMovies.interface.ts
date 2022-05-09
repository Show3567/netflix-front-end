export interface DiscoverMovie {
  api_key?: string;
  page?: number;
  language?: string;
  sort_by?: string;
  with_watch_monetization_types?: string;
  include_adult?: boolean;
  include_video?: boolean;
  year?: number;
}
