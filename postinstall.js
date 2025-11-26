const fs = require('fs');
const path = require('path');
const os = require('os');

// Fixes Webstorm issues on the fiest installation  on Windows (hopefully)
if (os.platform() === 'win32') {
    const npmPath = path.join(process.env.APPDATA, 'npm');
    const ps1File = path.join(npmPath, 'ghlie.ps1');
    
    if (fs.existsSync(ps1File)) {
        const psScript = `$indexPath = Join-Path $PSScriptRoot "node_modules\\ghlie\\index.js"
            if (Test-Path $indexPath) {
                & node $indexPath @args
            } else {
                Write-Error "ghlie not found."
            }`;
        fs.writeFileSync(ps1File, psScript, 'utf8');
        console.log('Fixed Windows PowerShell shim for ghlie');
    }
}
