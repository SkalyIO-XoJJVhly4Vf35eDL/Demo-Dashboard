<script>
const QRCode = require('easyqrcodejs');
import { onMount } from "svelte";
let qrCodeDiv;

export let rootKey;

onMount(() => {
    const options = {
        text: rootKey,
        binary: false,
        colorDark: '#601d60',
        colorLight: '#ffffff',
        logo: "/logo-qr.png",
        logoBackgroundTransparent: true
    };
    new QRCode(qrCodeDiv, options)
})
</script>
<div>
    <div bind:this="{qrCodeDiv}"></div>
</div>