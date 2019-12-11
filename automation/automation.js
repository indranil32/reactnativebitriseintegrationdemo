const wdio = require("webdriverio");
const assert = require("assert");
const fs = require('fs');

const opts = {
  port: 4723,
  capabilities: {
    platformName: "Android",
    platformVersion: "7.1",
    deviceName: "Android Emulator",
    //app: "ApiDemos-debug.apk",
	app: "https://github.com/appium/android-apidemos/releases/download/v3.1.0/ApiDemos-debug.apk",
    appPackage: "io.appium.android.apis",
    appActivity: ".view.TextFields",
    automationName: "UiAutomator2",
    avdLaunchTimeout: 240000, // millisecs
    avdReadyTimeout: 240000, // millisecs
    adbExecTimeout: 240000, // millisecs
    deviceReadyTimeout: 240, // secs
    androidDeviceReadyTimeout: 240, // secs
    androidInstallTimeout: 240000, // millisecs
    uiautomator2ServerLaunchTimeout: 240000, // millisecs
    uiautomator2ServerInstallTimeout: 240000 // millisecs
  }
};

async function main () {
  console.log('==============================================')
  console.log('Starting...');
  console.log('==============================================')
  const client = await wdio.remote(opts);
  client.setTimeouts(240000)


  console.log('==============================================')
  console.log('Taking Screenshot...');
  console.log('==============================================')
  let screenshot = await client.takeScreenshot();
  console.log('==============================================')
  console.log('Screenshot taken...');
  //console.log(screenshot)
  console.log('==============================================')
  fs.writeFile('test.png', screenshot, 'base64', (err) => {
    if (err) throw err;
  });
  console.log('==============================================')
  console.log('Screenshot saved...');
  console.log('==============================================')

  const field = await client.$("android.widget.EditText");
  console.log('==============================================')
  console.log('Text box found...');
  console.log('==============================================')

  await field.setValue("Hello World!");
  const value = await field.getText();
  assert.equal(value,"Hello World!");
  
  
  await client.deleteSession();
  console.log('==============================================')
  console.log('Done...');
  console.log('==============================================')
};

main();
