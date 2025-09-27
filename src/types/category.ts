export interface Category {
  image_filter: string;
  id: number;
  icon_url: string;
  created_at: string;
  color: string;
  name: string;
  image_seed_offset: number;
}

export interface Categories {
  Categories: Category[];
}
