import apiInstance from './client';

export const footballService = {
  getCompetitions: async () => {
    const { data } = await apiInstance.get('/competitions');
    return data;
  },

  getLeagueMatches: async (id: string, dateFrom?: string, dateTo?: string) => {
    const params = dateFrom && dateTo ? { dateFrom, dateTo } : {};
    const { data } = await apiInstance.get(`/competitions/${id}/matches`, { params });
    return data;
  },

  getTeams: async () => {
    const { data } = await apiInstance.get('/teams');
    return data;
  },

  getTeamDetails: async (teamId: string) => {
    const { data } = await apiInstance.get(`/teams/${teamId}`);
    return {
      name: data.name,
      crestUrl: data.crest,
    };
  },

  getTeamMatches: async (
    teamId: string,
    dateFrom?: string,
    dateTo?: string
  ) => {
    const params = dateFrom && dateTo ? { dateFrom, dateTo } : {};
    const { data } = await apiInstance.get(`/teams/${teamId}/matches`, {
      params,
    });
    return {
      matches: data.matches,
      count: data.count,
    };
  },

};