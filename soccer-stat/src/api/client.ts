import axios from 'axios';

// > Singleton-экземпляр : предварительная настройка всех будущих запросов
const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_THESOCCERSTAT_API_URL,
  headers: {
    'X-Auth-Token': import.meta.env.VITE_THESOCCERSTAT_API_KEY,
  },
});

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
        // “API содержит ограничения на бесплатном тарифе,
        // пользователю необходимо корректно сообщать о том,
        // что данные не получены” [ * ] (3.2)
      console.error('Лимит запросов исчерпан. Подождите.');
      alert('Данные не получены: превышен лимит запросов к API. Попробуйте позже.');
    }
    return Promise.reject(error);
  },
);

export default apiInstance;