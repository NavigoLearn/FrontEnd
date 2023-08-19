type MetaData = {
  [key in 'title' | // ! important
    'author' | // ? not important for SEO
    'description' | // ! most important
    'keywords' | // deprecated in most search engines
    'image' | // ! important for sharing on social media
    'url' | // ! important for sharing on social media
    'type' | // ? website type article, website, etc
    'site_name' | // ? facebook only from what I find
    'locale' | // ? language and country en_US, ro_RO, de_DE, de_AT
    'theme-color' // ? website main color to display part of the embed (discord, telegram, etc)
  ]?: string;
};

const openGraphMapping = [
  'title',
  'description',
  'image',
  'url',
  'type',
  'site_name',
  'locale',
];

export const setMetaTags = (metaData: MetaData): void => {
  // add open graph meta tags to metadata
  for (const key of openGraphMapping) {
    if (!metaData.hasOwnProperty(key)) {
      continue;
    }
    metaData[`og:${key}`] = metaData[key];
  }
  const head = document.head;
  for (const key in metaData) {
    if (metaData.hasOwnProperty(key)) {
      let tag = head.querySelector(`meta[name="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', key);
        head.appendChild(tag);
      }
      tag.setAttribute('content', metaData[key]);

      // if title then set document title
      if (key === 'title') {
          document.title = `${metaData[key]} | NavigoLearn`;
      }
    }
  }
};
