export default interface NewsItem {
  article_id: string;
  title: string;
  description: string;
  image_url: string;
  link: string;
  pubDate: string;
  creator?: string[];
  source_name: string;
  source_icon: string;
  language: string;
}
