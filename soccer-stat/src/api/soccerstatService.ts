import apiInstance from './client';

export const footballService = {
  // GET список лиг (4.1)
  getCompetitions: async () => {
    const { data } = await apiInstance.get('/competitions');
    return data;
  },

  // GIT календарь лиги (4.2)
  getLeagueMatches: async (id: string, dateFrom?: string, dateTo?: string) => {
    const params = dateFrom && dateTo ? { dateFrom, dateTo } : {};
    const { data } = await apiInstance.get(`/competitions/${id}/matches`, { params });
    return data;
  },

  // GET список команд (4.3)
  getTeams: async () => {
    const { data } = await apiInstance.get('/teams');
    return data;
  },

  // GET детали команд (4.3.1) (for UI block : name, crest)
  getTeamDetails: async (teamId: string) => {
    const { data } = await apiInstance.get(`/teams/${teamId}`);
    return {
      name: data.name,
      crestUrl: data.crest,
    };
  },

  // GET матчи команд (+optional date filtering) (4.4.1)
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