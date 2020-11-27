# Skaly Demo Dashboard

The demo showcases all functionality of Freighter and Skaly in the browser. You can opt to install it yourself or to run a hosted version. This dashboard only works if you also install or run the Skaly Branded App: [Play Store [Android Only]](https://go.skaly.io/androidbrandedapp)

# Run the hosted version

Go to [demo_dashboard.skaly.io](https://demo_dashboard.skaly.io)

# Run the demo from source

**Note:** The author assumes the use of Linux or Linux-based operating systems. The author is not familiar with Windows.

Text written `like this` are terminal commands.

1. Make sure you have NodeJS (preferably version >= 13), npm and git installed. If not, use the conventional way of your OS to install NodeJS (npm is most often included)

2. Install yarn because it's better than npm and we need some of it's features: `npm install -g yarn`

3. Run `git clone https://github.com/SkalyIO/Freighter.git` to clone this repo

4. Go to the Library folder in this repo: `cd <repo folder>/Library`

5. Run `yarn install` to set dependencies and run `yarn link` to create a linkable package.

6. Go to the Demo folder: `cd <repo folder>/Demo`

7. Run `yarn link freighter` and run `yarn install`

8. Run `yarn dev` and open the adress mentioned in your terminal (most likely http://localhost:8080) to open the demo page.