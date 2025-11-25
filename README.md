# Github Label Import/Export

Small NPM package to import and export labels from Github repositories via CLI as Github has no built in method to do as such

> [!IMPORTANT]
> This package **requires** you to download and login in Github CLI to function properly!
> You can find the official Github CLI download [here.](https://cli.github.com/)

## Installation

Install GHLIE via NPM

```js
npm install ghlie
```

## Usage

### Help:
```
ghlie -h
```

### Correct formatatting

#### Importing:
```
ghlie import <owner> <repo>
```

#### Exporting:
```
ghlie export <owner> <repo>
```
> [!NOTE]
> Replace owner with the repository owner (Not their display name!) and repo with the name of the repository. Don't include the <> in the command

## Licence and terms of use

Created by [Gottchabeach](https://github.com/JirkaUlbricht)

Licence: [GNU GPL v3.0](https://choosealicense.com/licenses/gpl-3.0/)