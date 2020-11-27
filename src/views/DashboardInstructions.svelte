<div>
    <h3>Step {stepIndex + 1}</h3>
    {@html steps[stepIndex].content}
    <div class="controls">
        <button disabled="{stepIndex <= 0}" on:click="{() => stepIndex--}">Previous</button>
        <button disabled="{stepIndex >= (steps.length - 1)}" on:click="{() => stepIndex++}">Next</button>    
    </div>
</div>

<script>
    let stepIndex = 0
    let steps = [{
        content: `
            Download the Android app from the Play Store (Currently links to Github Releases becuase Google's review has been delayed due to COVID-19):
            <br />
            <a href="https://go.skaly.io/androidbrandedapp"><img style="width:250px;" src="badge_play_store.svg"></a>
        `
    }, {
        content: `
            Set up an account and a (virtual) scale to get started...
            <br />
            <video width="270" height="520" autoplay loop>
                <source src="vid_1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        `
    }, {
        content: `
            Point the app to this dashboard (so you as a healthcare professional get the data from this app).
            Normally this connection is hard-coded but we simulate setting this connection using a QR code.
            <br />
            <video width="270" height="520" autoplay loop>
                <source src="vid_2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        `
    }, {
        content: `
            Click the blue "Give Permission"-button after reopening the app.
            <b>That's it!</b> Data should roll in eventually...
        `
    }]
</script>