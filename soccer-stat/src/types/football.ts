// Интерфейсы, <T>
// Базов. 
export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string | null;
}

// Лиги (4.2)
export interface Competition {
  id: number;
  area: Area;
  name: string;
  code: string;
  type: string;
  emblem: string;
  plan: string;
  lastUpdated: string;
}

export interface CompetitionsResponse {
  count: number;
  competitions: Competition[];
}

// Команды (4.3)
export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string; // - логотип
  address: string;
  website: string;
  founded: number;
  clubColors: string;
}

export interface TeamsResponse {
  count: number;
  teams: Team[];
}

// Матч (4.4)
export interface Match {
  id: number;
  utcDate: string;
  status: 'SCHEDULED' | 'LIVE' | 'IN_PLAY' | 'PAUSED' | 'FINISHED' | 'POSTPONED' | 'SUSPENDED' | 'CANCELED';
  matchday: number;
  homeTeam: Pick<Team, 'id' | 'name' | 'shortName' | 'tla' | 'crest'>;
  awayTeam: Pick<Team, 'id' | 'name' | 'shortName' | 'tla' | 'crest'>;
  score: MatchScore;
}

export interface MatchesResponse {
  count: number;
  competition: Competition; // ^ comp.-nId (* App.tsz)
  matches: Match[];
} // [ ! ] end-point return календаря лиг
// > объект, с объектом competition и массивом matches

export interface MatchScore {
  winner: string | null;
  duration: string;
  fullTime: MatchScoreValue;
  extraTime: MatchScoreValue;
  penalties: MatchScoreValue;
}

export interface MatchScoreValue {
  home: number | null;
  away: number | null;
}
