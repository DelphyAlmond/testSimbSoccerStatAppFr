import axios from 'axios';

const apiInstance = axios.create({
  baseURL: import.meta.env.THESOCCERSTAT_API_URL,
  headers: {
    'X-Auth-Token': import.meta.env.THESOCCERSTAT_API_KEY,
  },
});

// [ * ] Exception-catcher типа (Rate Limits)
apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      // Спец. обработка для беспл.тарифа (лимит запросов)
      console.error('Лимит запросов исчерпан. Подождите.');
      alert('Данные не получены: превышен лимит запросов к API. Попробуйте позже.');
    }
    return Promise.reject(error);
  },
);

export default apiInstance;