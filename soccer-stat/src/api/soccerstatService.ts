import apiInstance from './client';

import type { 
  CompetitionsResponse, 
  TeamsResponse, 
  MatchesResponse, 
  Team 
} from '@/types/football';

// step 3 : «сырой» JavaScript код -> строго типизированный сервис

export const soccerstatService = {
  // тип возвращаемого объ.-та ⤵ явно.
  getCompetitions: async () : Promise<CompetitionsResponse> => {
    const { data } = await apiInstance.get<CompetitionsResponse>('/competitions');
    return data;
  },

  getLeagueMatches: async (id: string, dateFrom?: string, dateTo?: string)
    : Promise<MatchesResponse> => {
    // empty properties
    let params = {};
    // (с предыдущ.)
    if (dateFrom && dateTo) {
      const trimmedDateFrom = new Date(dateFrom.trim());
      const trimmedDateTo = new Date(dateTo.trim());

      if (trimmedDateFrom < trimmedDateTo) {
        params = { dateFrom, dateTo };
      }
    }
    const { data } = await apiInstance.get<MatchesResponse>(`/competitions/${id}/matches`, { params });
    return data;
  },

  getTeams: async () : Promise<TeamsResponse> => {
    const { data } = await apiInstance.get<TeamsResponse>('/teams');
    return data;
  },

  getTeamDetails: async (teamId: string): Promise<Team> => {
    const { data } = await apiInstance.get<Team>(`/teams/${teamId}`);
    return data;
  },

  getTeamMatches: async (
    teamId: string,
    dateFrom?: string,
    dateTo?: string
  ) : Promise<MatchesResponse> => {
    const params = dateFrom && dateTo ? { dateFrom, dateTo } : {};
    const { data } = await apiInstance.get<MatchesResponse>(`/teams/${teamId}/matches`,
    {
      params,
    });
    // Возвращаемый полный MatchesResponse
    // (включает matches: data.matches, и count: data.count из исзх.-ка:
    return data;
  },

};

// [ note ] https://www.youtube.com/watch?v=GGli3uBqUts ~2:24:..