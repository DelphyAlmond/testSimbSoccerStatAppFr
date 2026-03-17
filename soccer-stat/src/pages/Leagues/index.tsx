import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { soccerstatService } from '@/api/soccerstatService';

const Leagues = () => {
    // [ ! ] Запрос списка лиг.
    // Кэшируем (staleTime) - список лиг меняется редко.(вероятно)
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['leagues'],
        queryFn: () => soccerstatService.getCompetitions(),
        staleTime: 1000 * 60 * 60, // 1 час
    });

    if (isLoading) return <div>Загрузка списка лиг...</div>;

    if (isError) return (
        <div className="error-message">
            <h3>&lt ! &gt Ошибка загрузки лиг</h3>
            <p>{(error as any)?.message}</p>
        </div>
    );

    return (
        <div className="page-container">
            <nav className="breadcrumbs">
                <span className="current-page">Лиги</span>
            </nav>

            <h1>Лиги</h1>
            
            <div className="leagues-grid">
                {data?.competitions.map((league) => (
                <div key={league.id} className="league-card">
                    {/* Link: календарь конкретной лиги*/}
                    <Link to={`/leagues/${league.id}/matches`}>
                    <img src={league.emblem} alt={league.name} width="50" />
                    <span>{league.name}</span>
                    <p>{league.area.name}</p>
                    </Link>
                </div>
                ))}
            </div>
        </div>
    );
};

export default Leagues;