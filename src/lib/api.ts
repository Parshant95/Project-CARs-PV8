import axios from 'axios';

// TODO: Replace this with your new API key from newsapi.org
const API_KEY = 'b2a21599d96d48f08d87d17f4da65f82';
const API_BASE_URL = 'https://newsapi.org/v2';

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  icon: string;
  content?: string;
  imageUrl?: string;
  source?: string;
  link?: string;
}

const mapNewsApiResponse = (article: any): NewsItem => {
  console.log('Mapping article:', article);
  
  // Map the category to our icon system
  const getCategoryAndIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'automotive':
      case 'transportation':
        return { category: 'Automotive', icon: 'car' };
      case 'technology':
        return { category: 'Technology', icon: 'zap' };
      case 'business':
        return { category: 'Business', icon: 'trending-up' };
      default:
        return { category: 'General', icon: 'file-text' };
    }
  };

  const { category, icon } = getCategoryAndIcon(article.category);

  const mappedItem = {
    id: article.url,
    title: article.title,
    date: article.publishedAt,
    excerpt: article.description || article.title,
    category,
    icon,
    content: article.content,
    imageUrl: article.urlToImage,
    source: article.source.name,
    link: article.url
  };

  console.log('Mapped item:', mappedItem);
  return mappedItem;
};

export const fetchLatestNews = async (): Promise<NewsItem[]> => {
  try {
    console.log('Fetching news from NewsAPI...');
    const params = {
      apiKey: API_KEY,
      q: 'India AND (car OR automobile OR vehicle) AND (launch OR update OR unveil OR EV)',
      language: 'en',
      region: 'in',
      sortBy: 'publishedAt',
      pageSize: 5
    };
    
    console.log('Request params:', params);
    
    const response = await axios.get(`${API_BASE_URL}/everything`, { params });
    console.log('Raw API Response:', response.data);

    if (response.data.status === 'ok') {
      if (!response.data.articles || response.data.articles.length === 0) {
        console.log('No articles found in the response');
        return getFallbackNews();
      }
      
      const mappedArticles = response.data.articles.map(mapNewsApiResponse);
      console.log('Final mapped articles:', mappedArticles);
      return mappedArticles;
    }
    
    console.error('API returned non-ok status:', response.data.status);
    return getFallbackNews();
  } catch (error) {
    console.error('Error fetching news:', error);
    if (axios.isAxiosError(error)) {
      console.error('API Error Details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        config: {
          url: error.config?.url,
          params: error.config?.params
        }
      });
    }
    return getFallbackNews();
  }
};

const getFallbackNews = (): NewsItem[] => {
  console.log('Using fallback news data');
  return [
    {
      id: '1',
      title: "Tata Nexon EV Facelift Launched",
      date: "2024-03-15",
      excerpt: "Tata Motors launches the facelifted Nexon EV with enhanced range and features",
      category: "Electric Vehicles",
      icon: "zap",
      source: "Auto News India"
    },
    {
      id: '2',
      title: "Mahindra XUV700 Gets New Variant",
      date: "2024-03-14",
      excerpt: "Mahindra introduces new AX7 variant with advanced driver assistance systems",
      category: "SUV",
      icon: "car",
      source: "Car & Bike"
    },
    {
      id: '3',
      title: "Hyundai Creta N Line Unveiled",
      date: "2024-03-13",
      excerpt: "Hyundai's performance-oriented Creta N Line makes its debut in India",
      category: "Performance",
      icon: "trending-up",
      source: "Auto Today"
    },
    {
      id: '4',
      title: "New EV Policy Announced",
      date: "2024-03-12",
      excerpt: "Government announces new incentives for electric vehicle manufacturers",
      category: "Policy",
      icon: "file-text",
      source: "Economic Times"
    }
  ];
};

export const fetchNewsById = async (id: string): Promise<NewsItem> => {
  try {
    console.log('Fetching news item:', id);
    const response = await axios.get(`${API_BASE_URL}/everything`, {
      params: {
        apiKey: API_KEY,
        qInTitle: id,
        language: 'en',
        pageSize: 1
      }
    });

    console.log('API Response for news item:', response.data);

    if (response.data.status === 'ok' && response.data.articles.length > 0) {
      return mapNewsApiResponse(response.data.articles[0]);
    }
    
    throw new Error('News item not found');
  } catch (error) {
    console.error(`Error fetching news item ${id}:`, error);
    if (axios.isAxiosError(error)) {
      console.error('API Error Details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    }
    throw error;
  }
}; 