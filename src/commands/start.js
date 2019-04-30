/* eslint-disable max-nested-callbacks */
/* eslint-disable no-path-concat */
/* eslint-disable no-console */
const {Command} = require('@oclif/command')
const inquirer = require('inquirer')
const chalk = require('chalk')
const figlet = require('figlet')
const fs = require('fs')
const ejs = require('ejs')

const actionTemplete = __dirname + '/boilerplate/action.js.ejs'
const actionTypeTemplete = __dirname + '/boilerplate/actionType.js.ejs'
const componentTemplete = __dirname + '/boilerplate/component.js.ejs'
const containerTemplete = __dirname + '/boilerplate/container.js.ejs'
const reducerTemplete = __dirname + '/boilerplate/reducer.js.ejs'
const sagaTemplete = __dirname + '/boilerplate/saga.js.ejs'
const styleTemplete = __dirname + '/boilerplate/styles.js.ejs'

const askQuestions = () => {
  const questions = [
    {
      name: 'FEATURENAME',
      type: 'input',
      message: 'What is the name of the FEATURE?',
    },
    {
      name: 'FILEONLY',
      type: 'confirm',
      message: 'only Files?',
    },
  ]
  return inquirer.prompt(questions)
}

const initMessage = logger => {
  logger(
    chalk.green(
      figlet.textSync('Welcome !', {
        font: 'speed',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      })
    )
  )
}

class StartCommand extends Command {
  async run() {
    initMessage(this.log)
    const answers = await askQuestions()
    const {FEATURENAME, FILEONLY} = answers
    const ALLCAPSNAME = FEATURENAME.toUpperCase()
    const DIRNAME = FEATURENAME.charAt(0).toLowerCase() + FEATURENAME.slice(1)
    this.log(FEATURENAME)
    this.log(DIRNAME)
    this.log(ALLCAPSNAME)
    this.log(FILEONLY)
    if (!FILEONLY) {
      if (!fs.existsSync(`${process.cwd()}/${FEATURENAME}`)) {
        fs.mkdirSync(`${process.cwd()}/${FEATURENAME}`)
      }
      if (!fs.existsSync(`${process.cwd()}/${FEATURENAME}/Actions`)) {
        fs.mkdirSync(`${process.cwd()}/${FEATURENAME}/Actions`)
      }
      if (!fs.existsSync(`${process.cwd()}/${FEATURENAME}/ActionTypes`)) {
        fs.mkdirSync(`${process.cwd()}/${FEATURENAME}/ActionTypes`)
      }
      if (!fs.existsSync(`${process.cwd()}/${FEATURENAME}/ActionTypes`)) {
        fs.mkdirSync(`${process.cwd()}/${FEATURENAME}/ActionTypes`)
      }
      if (!fs.existsSync(`${process.cwd()}/${FEATURENAME}/Components`)) {
        fs.mkdirSync(`${process.cwd()}/${FEATURENAME}/Components`)
      }
      if (!fs.existsSync(`${process.cwd()}/${FEATURENAME}/Containers`)) {
        fs.mkdirSync(`${process.cwd()}/${FEATURENAME}/Containers`)
      }
      if (!fs.existsSync(`${process.cwd()}/${FEATURENAME}/Reducers`)) {
        fs.mkdirSync(`${process.cwd()}/${FEATURENAME}/Reducers`)
      }
      if (!fs.existsSync(`${process.cwd()}/${FEATURENAME}/Sagas`)) {
        fs.mkdirSync(`${process.cwd()}/${FEATURENAME}/Sagas`)
      }
      if (!fs.existsSync(`${process.cwd()}/${FEATURENAME}/Styles`)) {
        fs.mkdirSync(`${process.cwd()}/${FEATURENAME}/Styles`)
      }
      if (!fs.existsSync(`${process.cwd()}/${FEATURENAME}/Test`)) {
        fs.mkdirSync(`${process.cwd()}/${FEATURENAME}/Test`)
      }
    }
    ejs.renderFile(actionTemplete, {props: {name: FEATURENAME, dirname: DIRNAME, allcapsname: ALLCAPSNAME}},
      function (err, result) {
        if (!err) {
          let path = ''
          if (FILEONLY) {
            path = `${process.cwd()}/Actions/${DIRNAME}Action.js`
          } else {
            path = `${process.cwd()}/${FEATURENAME}/Actions/${DIRNAME}Action.js`
          }
          fs.writeFile(path, result, function (err) {
            if (err) {
              return console.log(err)
            }
            console.log('The Action file was saved!')
          })
        }
        console.log(err)
      }
    )
    ejs.renderFile(actionTypeTemplete, {props: {name: FEATURENAME, dirname: DIRNAME, allcapsname: ALLCAPSNAME}},
      function (err, result) {
        if (!err) {
          let path = ''
          if (FILEONLY) {
            path = `${process.cwd()}/ActionTypes/${DIRNAME}ActionType.js`
          } else {
            path = `${process.cwd()}/${FEATURENAME}/ActionTypes/${DIRNAME}ActionType.js`
          }
          fs.writeFile(path, result, function (err) {
            if (err) {
              return console.log(err)
            }
            console.log('The Action type file was saved!')
          })
        }
        console.log(err)
      }
    )
    ejs.renderFile(componentTemplete, {props: {name: FEATURENAME, dirname: DIRNAME, allcapsname: ALLCAPSNAME}},
      function (err, result) {
        if (!err) {
          let path = ''
          if (FILEONLY) {
            path = `${process.cwd()}/Components/${DIRNAME}Component.js`
          } else {
            path = `${process.cwd()}/${FEATURENAME}/Components/${DIRNAME}Component.js`
          }
          fs.writeFile(path, result, function (err) {
            if (err) {
              return console.log(err)
            }
            console.log('The Component file was saved!')
          })
        }
        console.log(err)
      }
    )
    ejs.renderFile(containerTemplete, {props: {name: FEATURENAME, dirname: DIRNAME, allcapsname: ALLCAPSNAME}},
      function (err, result) {
        if (!err) {
          let path = ''
          if (FILEONLY) {
            path = `${process.cwd()}/Containers/${DIRNAME}Container.js`
          } else {
            path = `${process.cwd()}/${FEATURENAME}/Containers/${DIRNAME}Container.js`
          }
          fs.writeFile(path, result, function (err) {
            if (err) {
              return console.log(err)
            }
            console.log('The Container file was saved!')
          })
        }
        console.log(err)
      }
    )
    ejs.renderFile(reducerTemplete, {props: {name: FEATURENAME, dirname: DIRNAME, allcapsname: ALLCAPSNAME}},
      function (err, result) {
        if (!err) {
          let path = ''
          if (FILEONLY) {
            path = `${process.cwd()}/Reducers/${DIRNAME}Reducer.js`
          } else {
            path = `${process.cwd()}/${FEATURENAME}/Reducers/${DIRNAME}Reducer.js`
          }
          fs.writeFile(path, result, function (err) {
            if (err) {
              return console.log(err)
            }
            console.log('The Reducer file was saved!')
          })
        }
        console.log(err)
      }
    )
    ejs.renderFile(sagaTemplete, {props: {name: FEATURENAME, dirname: DIRNAME, allcapsname: ALLCAPSNAME}},
      function (err, result) {
        if (!err) {
          let path = ''
          if (FILEONLY) {
            path = `${process.cwd()}/Sagas/${DIRNAME}Saga.js`
          } else {
            path = `${process.cwd()}/${FEATURENAME}/Sagas/${DIRNAME}Saga.js`
          }
          fs.writeFile(path, result, function (err) {
            if (err) {
              return console.log(err)
            }
            console.log('The Saga file was saved!')
          })
        }
        console.log(err)
      }
    )
    ejs.renderFile(styleTemplete, {props: {name: FEATURENAME, dirname: DIRNAME, allcapsname: ALLCAPSNAME}},
      function (err, result) {
        if (!err) {
          let path = ''
          if (FILEONLY) {
            path = `${process.cwd()}/Styles/${DIRNAME}Style.js`
          } else {
            path = `${process.cwd()}/${FEATURENAME}/Styles/${DIRNAME}Style.js`
          }
          fs.writeFile(path, result, function (err) {
            if (err) {
              return console.log(err)
            }
            console.log('The Style file was saved!')
          })
        }
        console.log(err)
      }
    )
  }
}

StartCommand.description = `
Feature Starter Kit
`

module.exports = StartCommand
