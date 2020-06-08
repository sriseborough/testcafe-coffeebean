# TestCafe Coffee Bean
Coffee Bean is a simple template for DevExpress' TestCafe tool. There are 2 page object models to choose from, one more simple than the other depending on the complexity of your project.

# Getting Started
## Installation
Ensure you have installed Node.js then run:
```
npm install
```

## Setting up your local configuration

### Secret management
Ideally we don't want secrets stored anywhere in plain text. Looking at `config.ts` we can see that usernames and passwords are taken from environment variables. You can either add them in locally for your testing, or set them in your environment.

# Build and Test
To run the example pack just run:
```
npm run-script test
```
which will run all the tests in Chrome in a headed browser. Looking at the scripts defined in `package.json` you can see we've already defined some scripts that can run it headlessly or only testing a specific file for instance

# POM (Page Object Model)
I've used to slgihtly different POMs in this example repository. Everything should be clearly commented within the code itself. I would recommend first looking at the Login tests and the login page object, then moving on to the other tests and the other pages.

# Suggestions
If there is something you would like to see added to this repository then please reach out to me, otherwise feel free to raise a PR against the repo.
