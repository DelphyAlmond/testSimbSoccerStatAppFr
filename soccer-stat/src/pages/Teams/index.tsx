import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { soccerstatService } from '@/api/soccerstatService';

const Teams = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const { data, isLoading, error, isError } = useQuery({
        queryKey: ['teams'],
        queryFn: () => soccerstatService.getTeams(),
    });

    // >> фильтрация команд по поисковому запросу
    const filteredTeams = data?.teams.filter(team => 
        team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) return <div>Загрузка команд...</div>;
    if (isError) return (
        <div className="error-message">
            <h3>&lt ! &gt Ошибка загрузки команд</h3>
            <p>{(error as any)?.message}</p>
        </div>
    );

    return (
        <div className="page-container">
            <nav className="breadcrumbs">
                <span className="current-page">Команды</span>
            </nav>

            <h1>Команды</h1>

            {/* >> Поиск по командам */}
            <div className="filters">
                <input 
                type="text" 
                placeholder="Поиск команды..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="teams-grid">
                {filteredTeams?.map(team => (
                <div key={team.id} className="team-card">
                    <Link to={`/teams/${team.id}/matches`}>
                    <img src={team.crest} alt={team.name} width="40" />
                    <span>{team.name}</span>
                    </Link>
                </div>
                ))}
            </div>
        </div>
    );
};

export default Teams;