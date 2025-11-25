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

## Webstorm issues local fix

For some reason instead of running ghlie, Powershell seems to want to open its contents in Webstorm.

For more details check out the [issue here](https://github.com/JirkaUlbricht/GHLIE/issues/2).

#### Local fix (run each ps block separately)

```ps1
New-Item -ItemType File -Path $PROFILE -Force
```

```ps1
function ghlie {
    $npmPath = [Environment]::GetFolderPath('ApplicationData')
    $indexPath = Join-Path $npmPath "npm\node_modules\ghlie\index.js"
    if (Test-Path $indexPath) {
        & node $indexPath @args
    } else {
        Write-Error "ghlie not found. Run 'npm link' from the ghlie project folder."
    }
}
```

```ps1
. $PROFILE
```

If that doesn't fix the issue, go to your environment variables>user>PATH and delete %WebStorm%

## Licence and terms of use

Created by [Gottchabeach](https://github.com/JirkaUlbricht)

Licence: [GNU GPL v3.0](https://choosealicense.com/licenses/gpl-3.0/)