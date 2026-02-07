import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res) => {
    const { region: regionParam, season: seasonParam } = req.query;
    const regions = await getListOfRegions();
    let routes = await getAllRoutes();
    const seasons = await getListOfSeasons();

    if (regionParam && regionParam !== 'all') {
        routes = routes.filter(r => r.region.toLowerCase() === regionParam.toLowerCase());
    }
    if (seasonParam && seasonParam !== 'all') {
        routes = routes.filter(r => r.bestSeason.toLowerCase() === seasonParam.toLowerCase());
    }

    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons,
        query: { region: regionParam || 'all', season: seasonParam || 'all' }
    });
};
