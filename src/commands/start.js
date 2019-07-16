/* eslint-disable complexity */
/* eslint-disable no-negated-condition */
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
const actionSpecTemplete = __dirname + '/boilerplate/action.spec.js.ejs'
const reducerSpecTemplete = __dirname + '/boilerplate/reducer.spec.js.ejs'
const sagaSpecTemplete = __dirname + '/boilerplate/saga.spec.js.ejs'

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

const askFileOnlyQuestions = () => {
  const questions = [
    {
      name: 'ACTIONS',
      type: 'confirm',
      message: 'Action File Required?',
    },
    {
      name: 'ACTIONTYPE',
      type: 'confirm',
      message: 'ActionType File Required?',
    },
    {
      name: 'COMPONENT',
      type: 'confirm',
      message: 'Component File Required?',
    },
    {
      name: 'CONTAINER',
      type: 'confirm',
      message: 'Container File Required?',
    },
    {
      name: 'REDUCER',
      type: 'confirm',
      message: 'Reducer File Required?',
    },
    {
      name: 'SAGA',
      type: 'confirm',
      message: 'Saga File Required?',
    },
    {
      name: 'STYLE',
      type: 'confirm',
      message: 'Style File Required?',
    },
    {
      name: 'ACTIONTEST',
      type: 'confirm',
      message: 'Action Test File Required?',
    },
    {
      name: 'REDUCERTEST',
      type: 'confirm',
      message: 'Reducer Test File Required?',
    },
    {
      name: 'SAGATEST',
      type: 'confirm',
      message: 'Saga Test File Required?',
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

const endMessage = logger => {
  logger(
    chalk.red.underline.bold(
      'Dont forget to add saga and reducer to root!!!'
    )
  )
}

class StartCommand extends Command {
  async run() {
    initMessage(this.log)
    const answers = await askQuestions()
    const {FEATURENAME, FILEONLY} = answers
    const uderScoreName = FEATURENAME.match(/[A-Z][a-z]+|\d+/g).join('_')
    const ALLCAPSNAME = uderScoreName.toUpperCase()
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
      ejs.renderFile(actionTemplete, {props: {name: FEATURENAME, dirname: DIRNAME, allcapsname: ALLCAPSNAME}},
        function (err, result) {
          if (!err) {
            let path = ''
            path = `${process.cwd()}/${FEATURENAME}/Actions/${DIRNAME}Action.js`
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
      ejs.renderFile(actionSpecTemplete, {props: {name: FEATURENAME, dirname: DIRNAME, allcapsname: ALLCAPSNAME}},
        function (err, result) {
          if (!err) {
            let path = ''
            path = `${process.cwd()}/${FEATURENAME}/Test/${DIRNAME}Action.spec.js`
            fs.writeFile(path, result, function (err) {
              if (err) {
                return console.log(err)
              }
              console.log('The Action  spec file was saved!')
            })
          }
          console.log(err)
        }
      )
      ejs.renderFile(actionTypeTemplete, {props: {name: FEATURENAME, dirname: DIRNAME, allcapsname: ALLCAPSNAME}},
        function (err, result) {
          if (!err) {
            let path = ''
            path = `${process.cwd()}/${FEATURENAME}/ActionTypes/${DIRNAME}ActionType.js`
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
            path = `${process.cwd()}/${FEATURENAME}/Components/${DIRNAME}Component.js`
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
            path = `${process.cwd()}/${FEATURENAME}/Containers/${DIRNAME}Container.js`
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
            path = `${process.cwd()}/${FEATURENAME}/Reducers/${DIRNAME}Reducer.js`
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
      ejs.renderFile(reducerSpecTemplete, {props: {name: FEATURENAME, dirname: DIRNAME, allcapsname: ALLCAPSNAME}},
        function (err, result) {
          if (!err) {
            let path = ''
            path = `${process.cwd()}/${FEATURENAME}/Test/${DIRNAME}Reducer.spec.js`
            fs.writeFile(path, result, function (err) {
              if (err) {
                return console.log(err)
              }
              console.log('The Reducer test file was saved!')
            })
          }
          console.log(err)
        }
      )
      ejs.renderFile(sagaTemplete, {props: {name: FEATURENAME, dirname: DIRNAME, allcapsname: ALLCAPSNAME}},
        function (err, result) {
          if (!err) {
            let path = ''
            path = `${process.cwd()}/${FEATURENAME}/Sagas/${DIRNAME}Saga.js`
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
      ejs.renderFile(sagaSpecTemplete, {props: {name: FEATURENAME, dirname: DIRNAME, allcapsname: ALLCAPSNAME}},
        function (err, result) {
          if (!err) {
            let path = ''
            path = `${process.cwd()}/${FEATURENAME}/Test/${DIRNAME}Saga.spec.js`
            fs.writeFile(path, result, function (err) {
              if (err) {
                return console.log(err)
              }
              console.log('The Saga test file was saved!')
            })
          }
          console.log(err)
        }
      )
      ejs.renderFile(styleTemplete, {props: {name: FEATURENAME, dirname: DIRNAME, allcapsname: ALLCAPSNAME}},
        function (err, result) {
          if (!err) {
            let path = ''
            path = `${process.cwd()}/${FEATURENAME}/Styles/${DIRNAME}Style.js`
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
      endMessage(this.log)
    } else {
      const answersForFiles = await askFileOnlyQuestions()
      const {ACTIONS, ACTIONTYPE, COMPONENT, CONTAINER, REDUCER, SAGA, STYLE, ACTIONTEST, REDUCERTEST, SAGATEST} = answersForFiles
      if (ACTIONS) {
        ejs.renderFile(actionTemplete, {props: {name: FEATURENAME, dirname: DIRNAME, allcapsname: ALLCAPSNAME}},
          function (err, result) {
            if (!err) {
              let path = ''
              path = `${process.cwd()}/Actions/${DIRNAME}Action.js`
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
      }
      if (ACTIONTEST) {
        ejs.renderFile(actionSpecTemplete, {props: {name: FEATURENAME, dirname: DIRNAME, allcapsname: ALLCAPSNAME}},
          function (err, result) {
            if (!err) {
              let path = ''
              path = `${process.cwd()}/Test/${DIRNAME}Action.spec.js`
              fs.writeFile(path, result, function (err) {
                if (err) {
                  return console.log(err)
                }
                console.log('The Action test file was saved!')
              })
            }
            console.log(err)
          }
        )
      }
      if (ACTIONTYPE) {
        ejs.renderFile(actionTypeTemplete, {props: {name: FEATURENAME, dirname: DIRNAME, allcapsname: ALLCAPSNAME}},
          function (err, result) {
            if (!err) {
              let path = ''

              path = `${process.cwd()}/ActionTypes/${DIRNAME}ActionType.js`

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
      }
      if (COMPONENT) {
        ejs.renderFile(componentTemplete, {props: {name: FEATURENAME, dirname: DIRNAME, allcapsname: ALLCAPSNAME}},
          function (err, result) {
            if (!err) {
              let path = ''
              path = `${process.cwd()}/Components/${DIRNAME}Component.js`

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
      }
      if (CONTAINER) {
        ejs.renderFile(containerTemplete, {props: {name: FEATURENAME, dirname: DIRNAME, allcapsname: ALLCAPSNAME}},
          function (err, result) {
            if (!err) {
              let path = ''
              path = `${process.cwd()}/Containers/${DIRNAME}Container.js`

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
      }
      if (REDUCER) {
        ejs.renderFile(reducerTemplete, {props: {name: FEATURENAME, dirname: DIRNAME, allcapsname: ALLCAPSNAME}},
          function (err, result) {
            if (!err) {
              let path = ''
              path = `${process.cwd()}/Reducers/${DIRNAME}Reducer.js`

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
      }
      if (REDUCERTEST) {
        ejs.renderFile(reducerSpecTemplete, {props: {name: FEATURENAME, dirname: DIRNAME, allcapsname: ALLCAPSNAME}},
          function (err, result) {
            if (!err) {
              let path = ''
              path = `${process.cwd()}/Test/${DIRNAME}Reducer.spec.js`

              fs.writeFile(path, result, function (err) {
                if (err) {
                  return console.log(err)
                }
                console.log('The Reducer  test file was saved!')
              })
            }
            console.log(err)
          }
        )
      }
      if (SAGA) {
        ejs.renderFile(sagaTemplete, {props: {name: FEATURENAME, dirname: DIRNAME, allcapsname: ALLCAPSNAME}},
          function (err, result) {
            if (!err) {
              let path = ''
              path = `${process.cwd()}/Sagas/${DIRNAME}Saga.js`

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
      }
      if (SAGATEST) {
        ejs.renderFile(sagaSpecTemplete, {props: {name: FEATURENAME, dirname: DIRNAME, allcapsname: ALLCAPSNAME}},
          function (err, result) {
            if (!err) {
              let path = ''
              path = `${process.cwd()}/Test/${DIRNAME}Saga.spec.js`

              fs.writeFile(path, result, function (err) {
                if (err) {
                  return console.log(err)
                }
                console.log('The Saga test file was saved!')
              })
            }
            console.log(err)
          }
        )
      }
      if (STYLE) {
        ejs.renderFile(styleTemplete, {props: {name: FEATURENAME, dirname: DIRNAME, allcapsname: ALLCAPSNAME}},
          function (err, result) {
            if (!err) {
              let path = ''
              path = `${process.cwd()}/Styles/${DIRNAME}Style.js`

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
  }
}

StartCommand.description = `
Feature Starter Kit
`

module.exports = StartCommand
