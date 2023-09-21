export type PageMeta = {
  [key in
    | 'title' // ! important
    | 'author' // ? not important for SEO
    | 'description' // ! most important
    | 'keywords' // deprecated in most search engines
    | 'image' // ! important for sharing on social media
    | 'url' // ! important for sharing on social media
    | 'type' // ? website type article, website, etc
    | 'site_name' // ? facebook only from what I find
    | 'locale' // ? language and country en_US, ro_RO, de_DE, de_AT
    | 'theme-color']?: string; // ? website main color to display part of the embed (discord, telegram, etc)
};
