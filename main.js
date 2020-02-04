// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

const { CATCH_ON_MAIN } = require('./utils/constants');

const database = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./database/mydb.sqlite"
  },
  useNullAsDefault: true
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  //mainWindow.loadFile('index.html')

  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, 'index.html')}`,
  )

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()


    /** create table example */
  // database.schema.createTable('users', function (table) {
  //   table.increments();
  //   table.string('name');
  //   table.timestamps();
  // }).then(function() {
  //   database('users').insert({ name: 'Slaughterhouse Five' }).then(function() {
  //       let result = database.select("name").from("users")
  //       result.then(function (rows) {
  //         console.log(rows)

  //         mainWindow.webContents.send("resultSent", rows);
  //       })
  //   })
  // })

  let result = database.select("name").from("users")
  result.then(function (rows) {
    console.log(rows)

    mainWindow.webContents.send("resultSent", rows);
  })


  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('message-from-react', (event, arg) => {
  console.log('message-from-react :: '+arg);

  event.reply('message-from-electron', 'I am fine.');

  mainWindow.webContents.send('message-from-electron', 'Are You There');
});
