# GHLIE - Github Label Import/Export

Small NPM package to import and export labels from Github repositories via CLI as Github has no built in method to do as such

> [!IMPORTANT]
> This package **requires** you to download and login in Github CLI to function properly!
> You can find the official Github CLI download [here.](https://cli.github.com/)

## Installation

Install GHLIE via NPM

```
npm install ghlie
```

## Updates

Current version: **1.0.2** - Fixed Webstorm issues (hopefully)

## Planned

- Simple GUI version
- 1 command to both import and export at the same time

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
ghlie export <owner> <repo> <path_to_json>
```
> [!NOTE]
> Replace owner with the repository owner (Not their display name!), repo with the name of the repository and path_to_json with a path to the JSON file you want to import (if it is in the same directory then just the name of the file)
>
> Don't include the <> in the command

## Licence and terms of use

Created by [Gottchabeach](https://github.com/JirkaUlbricht)

Licence: [GNU GPL v3.0](https://choosealicense.com/licenses/gpl-3.0/)