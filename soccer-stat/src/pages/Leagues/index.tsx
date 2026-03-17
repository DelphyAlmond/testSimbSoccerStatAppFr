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
        <div className="leagues-grid">
            {data?.competitions.map((league) => (
                <div key={league.id} className="league-card"> {/* > карточка */}
                    <Link to={`/leagues/${league.id}/matches`}>
                        <div className="card-image-wrapper"> {/* > обертка для фото */}
                            <img src={league.emblem} alt={league.name} width="50" />
                        </div>
                        <span>{league.name}</span>
                        <p>{league.area.name}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Leagues;