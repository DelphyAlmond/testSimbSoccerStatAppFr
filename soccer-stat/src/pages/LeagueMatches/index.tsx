import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { soccerstatService } from '@/api/soccerstatService'; // > объект competition*

// [ * ] Фильтр по дате (с - по, должны быть заполнены ‘дата с’ и ‘дата по’ для API).
// При указании даты данные должны фильтроваться.

const LeagueMatchesPage = () => {
    const { competitionId } = useParams<{ competitionId: string }>();

    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [appliedDates, setAppliedDates] = useState({ from: '', to: '' });
    // ^ запомнили для кэша

    // [ ! ] data request через React Query
    const { data, isLoading, error, isError } = useQuery({
        queryKey: ['leagueMatches', competitionId, appliedDates],
        queryFn: () => soccerstatService.getLeagueMatches(
        competitionId!, 
        appliedDates.from, 
        appliedDates.to
        ),
        enabled: !!competitionId,
    });

    const handleApplyFilter = () => {
        if (dateFrom && dateTo) setAppliedDates({ from: dateFrom, to: dateTo });
        else alert('< ! > Для фильтрации выберите 2 даты');
    };

    if (isLoading) return <div>Загрузка...</div>;

    if (isError) {
        return (
            <div className="error-message">
                <h3>&lt ! &gt Ошибка при загрузке календаря</h3>
                <p>{(error as any)?.response?.data?.message || '> Проверьте интернет-соединение/лимиты API'}</p>
                <button onClick={() => window.location.reload()}>Попробовать снова</button>
            </div>
        );
    }

    return (
        <div className="page-container">
            <nav className="breadcrumbs">
                <Link to="/leagues">Лиги</Link>
                <span className="separator"> / </span>
                <span className="current-page">
                    {isLoading ? 'Загрузка...' : data?.competition.name}
                </span>
            </nav>

            {/* >> фильтр по датам */}
            <div className="filters">
                <input 
                type="date" 
                value={dateFrom} 
                onChange={(e) => setDateFrom(e.target.value)} />
                <input 
                type="date" 
                value={dateTo} 
                onChange={(e) => setDateTo(e.target.value)} />
                <button onClick={handleApplyFilter}>Применить</button>
            </div>

            {/* >> галлерея матчей */}
            <section className="matches-list">
                {data?.matches.map(match => (
                <div key={match.id}>
                    {/* rend.-g матча << */}
                </div>
                ))}
            </section>
        </div>
    );
};

export default LeagueMatchesPage;