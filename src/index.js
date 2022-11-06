const { app, BrowserWindow } = require('electron');
const fs = require('fs')
const path = require('path')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
 
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

function buttonClicked(){
  var city = document.getElementById("Hiking_Location").value
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fd7a449d055dba26a982a3220f32aa2`)
  .then((response) => response.json())
  .then((data) =>{
    var info=data
    console.log(info)
    console.log("Temperature at your desired Hiking Place in (Celcius):", Math.ceil((info.main.temp - 273.15)))
    //console.log("Hiking Place:",info.name)
    console.log("The weather:",info.weather[0].description)
    console.log("The windspeed:",info.wind.speed)
    console.log("The pressure:",info.main.pressure)
    console.log("The humidity:",info.main.humidity)


    //var nameplace = document.getElementById("nameplace") 
    //nameplace.innerHTML = info.name

    var temp = document.getElementById("temp") 
    temp.innerHTML = Math.ceil((info.main.temp - 273.15)) + " Celcius in " + info.name

    var weather = document.getElementById("weather")
    weather.innerHTML = info.weather[0].description + " in " + info.name

    var windspeed = document.getElementById("windspeed")
    windspeed.innerHTML = "Windspeed in "+info.wind.speed +" in " +  info.name

    var pressure = document.getElementById("pressure")
    pressure.innerHTML = "The pressure is "+info.main.pressure +" in " + info.name

    var humidity = document.getElementById("humidity")
    humidity.innerHTML = "The humidity is "+info.main.humidity +" in " + info.name

    });
  }
