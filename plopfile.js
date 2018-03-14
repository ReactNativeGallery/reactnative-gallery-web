function config(plop) {
  plop.setGenerator('Component test file', {
    description: 'Generate a test file for a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "What is the component's name?",
        validate(value) {
          if (/.+/.test(value)) {
            return true
          }
          return 'component name is required'
        }
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'components/__tests__/{{properCase name}}.test.js',
        templateFile: 'templates/Component.test.txt',
        abortOnFail: true
      }
    ]
  })
}

module.exports = config
