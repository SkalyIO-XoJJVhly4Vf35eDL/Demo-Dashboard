<script>
  import { userSeedCheck } from "root/Config.js";
  import {
    FreighterPrivateChannel,
    Freighter,
    FreighterPolling,
  } from "freighter";
  import { iota } from "root/Singleton.js";
  import { push, link } from "svelte-spa-router";
  import { onMount, onDestroy } from "svelte";
  import SkalyRootKeyQRCode from "root/views/SkalyRootKeyQRCode.svelte";
  import UserBlock from "root/views/UserBlock.svelte";
  import DashboardInstructions from "root/views/DashboardInstructions.svelte";

  const crypto = require("crypto");
  const store = require("store2");

  let users = [];
  let username = "",
    password = "";
  let keyPair = null,
    privateChannel = null;

  function seedStoredCheck() {
    if (!store.has("encryptedSeed")) {
      push("/intro");
    }
  }

  async function start(seed) {
    const privateKey = Freighter.getKey(seed, "Key:FPC");
    keyPair = await FreighterPrivateChannel.generatePrivateChannel(privateKey);
    console.log("public key (base64)", keyPair.address.toString("base64"));
    privateChannel = new FreighterPrivateChannel(
      Freighter,
      FreighterPolling,
      iota.instance,
      keyPair
    );
    privateChannel.mwm = iota.mwm;
    privateChannel.on("dial", (obj) => {
      console.log("dial", obj);
      const keyHex = obj.channelKey.toString("hex");
      for (var user of users) {
        if (user.key === keyHex) {
          return; // We already have this channel
        }
      }
      users.push({ key: keyHex, name: obj.metadata.toString("ascii") });
      users = users;
    });
    privateChannel
      .loadPreviousDials()
      .then(() => {
        console.log("loadPreviousDials done");
      })
      .catch((e) => {
        console.error("loadPreviousDials error", e);
      });
  }

  function login() {
    const encryptedSeed = Buffer.from(store.get("encryptedSeed"), "hex");
    const key = crypto
      .createHmac("sha256", password)
      .update("user:" + username)
      .digest();
    const iv = encryptedSeed.slice(
      encryptedSeed.length - 16,
      encryptedSeed.length
    );
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    const decryptedSeed = decipher.update(
      encryptedSeed.slice(0, encryptedSeed.length - 16)
    );
    if (decryptedSeed.slice(0, userSeedCheck.length).equals(userSeedCheck)) {
      start(decryptedSeed.slice(userSeedCheck.length, decryptedSeed.length));
    } else {
      alert("Username or password is incorrect");
    }
  }

  onDestroy(() => {
    if (privateChannel !== null) {
      privateChannel.destroy();
      privateChannel = null;
    }
  });

  onMount(() => {
    seedStoredCheck();
  });
</script>

<div>
  {#if keyPair === null}
    <p>Log in</p>
    <form on:submit|preventDefault={login}>
      <input type="text" bind:value={username} placeholder="Username" />
      <input type="password" bind:value={password} placeholder="Password" />
      <br />
      <input type="submit" value="Login" />
    </form>
  {:else}
    <h1>List of weight data</h1>
    {#if users.length === 0}
      <p>
        No weight data or users found yet. Make sure to download the Skaly app
        and link a real or virtual scale!
        <DashboardInstructions />
      </p>
      <img src="loading.gif" width="32" alt="Loading Spinner" />
    {:else}
      {#each users as user}
        <UserBlock {user} />
      {/each}
    {/if}
    <SkalyRootKeyQRCode rootKey={keyPair.address.toString('base64')} />
  {/if}
</div>
