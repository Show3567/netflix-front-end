export interface DiscoverMovie {
  language?: string;
  region?: string;
  sort_by?: string;
  certification_country?: string;
  certification?: string;
  include_adult?: boolean;

  include_video?: boolean;
  page?: number;
  primary_release_year?: number;
  primary_release_date?: string;
  release_date?: string;
  with_release_type?: number;

  year?: number;
  vote_count?: number;
  vote_average?: number;
  with_cast?: string;
  with_crew?: string;
  with_people?: string;

  with_companies?: string;
  with_genres?: string;
  without_genres?: string;
  with_keywords?: string;
  without_keywords?: string;
  with_runtime?: number;

  with_original_language?: string;
  with_watch_providers?: string;
  watch_region?: string;
  with_watch_monetization_types?: string;
  without_companies?: string;
}
