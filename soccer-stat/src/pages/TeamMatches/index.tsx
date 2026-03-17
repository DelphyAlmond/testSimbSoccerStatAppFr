import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { soccerstatService } from '@/api/soccerstatService';

const TeamMatches = () => {
    const { teamId } = useParams<{ teamId: string }>();
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [appliedDates, setAppliedDates] = useState({ from: '', to: '' });

    // [ ! ] Отдельный запрос для "хлебных крошек" (team shortname)
    const { data: teamInfo } = useQuery({
        queryKey: ['teamDetails', teamId],
        queryFn: () => soccerstatService.getTeamDetails(teamId!),
        enabled: !!teamId,
    });

    // [ ! ] Запрос списка матчей команды
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['teamMatches', teamId, appliedDates],
        queryFn: () => soccerstatService.getTeamMatches(teamId!, appliedDates.from, appliedDates.to),
        enabled: !!teamId,
    });

    const handleApplyFilter = () => {
        if (dateFrom && dateTo) setAppliedDates({ from: dateFrom, to: dateTo });
        else alert('< ! > Выберите диапазон дат');
    };

    if (isLoading) return <div>Загрузка матчей команды...</div>;

    if (isError) return (
            <div className="error-message">
                <h3>&lt ! &gt Ошибка загрузки матчей</h3>
                <p>{(error as any)?.message}</p>
            </div>
        );

    return (
        <div className="page-container">
            <nav className="breadcrumbs">
                <Link to="/teams">Команды</Link>
                <span className="separator"> / </span>
                <span className="current-page">
                    {teamInfo ? teamInfo.name : 'Загрузка...'}
                </span>
            </nav>

            <h1>Матчи команды {teamInfo?.name}</h1>

            <div className="filters">
                <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
                <button onClick={handleApplyFilter}>Применить</button>
            </div>

            <section className="matches-list">
            {data?.matches.length === 0 && <p>Матчей за указанный период не найдено.</p>}
            {data?.matches.map(match => (
                <div key={match.id} className="match-row">
                    <span>{new Date(match.utcDate).toLocaleDateString()}</span>
                    <strong> {match.homeTeam.name} vs {match.awayTeam.name} </strong>
                    <span> {match.score.fullTime.home} : {match.score.fullTime.away} </span>
                </div>
            ))}
            </section>
        </div>
    );
};

export default TeamMatches;