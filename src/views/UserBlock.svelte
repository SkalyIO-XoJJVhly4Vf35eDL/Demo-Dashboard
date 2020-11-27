<script>
import { onMount, onDestroy } from 'svelte';
import { iota } from "root/Singleton.js";
import {
    FreighterPrivateChannel,
    Freighter,
    FreighterPolling,
    FreighterCrypto
} from "freighter";
var dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

async function loadHistory() {
    const historyMessages = await Freighter.getChannelHistory(iota.instance, freighter.getAddressSeed(), historyIndex, 15)
    if(historyMessages !== null && historyMessages.length > 0) {
        historyIndex = historyMessages[0].index
        messages = messages.concat(historyMessages.reverse())
        
        if(historyIndex > 0) {
            await loadHistory()
        }
    }
}

export let user;
let freighter, polling;
let messages = [];
let addrSeed;
var historyIndex = -1;

function processMessage(d) {
    const decrypted = FreighterCrypto.decrypt(addrSeed, d.message).toString('ascii')
    const json = JSON.parse(decrypted.substring(0, decrypted.lastIndexOf("}") + 1))
    let weightDataStr = `${json.weight} KG`
    if('bodyWater' in json) {
        weightDataStr += ` | ${json['bodyWater']}% body water`
    }
    if('bodyFat' in json) {
        weightDataStr += ` | ${json['bodyFat']}% body fat`
    }
    console.log(dayjs, json);
    return `${weightDataStr} (${dayjs(json.timestamp * 1000).fromNow()})`;
}

onMount(() => {
    const channelKey = Buffer.from(user.key, 'hex')
    freighter = new Freighter(iota.instance, channelKey)
    addrSeed = freighter.getAddressSeed()
    polling = new FreighterPolling(Freighter, iota.instance, freighter.getAddressSeed())
    polling.on('messages', (newMsgs) => {
        newMsgs.reverse()
        messages = newMsgs.concat(messages)
    })
    polling.startPolling()
    loadHistory().then()
})
</script>

<div class="user-block">
    <b>{ user.name }</b>
    <br />
    {#if messages.length === 0}
    <img src="loading.gif" width="32" alt="Loading Spinner" />
    {/if}
    {#each messages as message}
		<li>{ processMessage(message) }</li>
	{/each}
</div>