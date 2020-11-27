import NotFound from './routes/NotFound.svelte'
import Intro from './routes/Intro.svelte'
import Dashboard from './routes/Dashboard.svelte'
import WeightList from './routes/WeightList.svelte'

export default {
    '/': Dashboard,
    '/intro': Intro,
    '/patient/:channelId': WeightList,
    // Catch-all
    '*': NotFound,
}