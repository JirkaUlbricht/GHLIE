const [,, cmd, owner, repo, outputPath] = process.argv;
const { execSync } = require('child_process');

const { version } = require('./package.json');

// Github CLI check
function checkGitHubCLI() {
    try {
        execSync('gh --version', { stdio: 'ignore' });
    } catch (error) {
        console.error("Error: GitHub CLI (gh) is not installed or not in PATH.");
        console.error("Please install it from: https://cli.github.com/");
        process.exit(1);
    }

    try {
        execSync('gh auth status', { stdio: 'ignore' });
    } catch (error) {
        console.error("Error: You are not logged in to GitHub CLI.");
        console.error("Please run: gh auth login");
        process.exit(1);
    }
}

// Commands
if (cmd === 'help' || cmd === '--help' || cmd === '-h') {
    console.log("GHLIE - GitHub Labels Import/Export Tool by Gottchabeach");
    console.log("Usage: GHLIE import|export <owner> <repo> [output-path]");
    console.log("Options:");
    console.log("  -h, --help, help      Show help");
    console.log("  -v, --version, version  Show version");
    console.log("  -i, --info, info      Show tool info");
    process.exit(0);
} else if (cmd === 'version' || cmd === '--version' || cmd === '-v') {
    console.log(`GHLIE version ${version}`);
    process.exit(0);
} else if (cmd === 'info' || cmd === '--info' || cmd === '-i') {
    console.log(`GHLIE v.${version} - GitHub Labels Import/Export Tool by Gottchabeach`);
    console.log("Import and export GitHub labels between repositories.");
    console.log("Github: https://github.com/Gottchabeach/GHLIE");
    process.exit(0);
} else if (cmd === 'export') {
    if (!owner || !repo) {
        console.error("Wrong format. Use ghlie -h for help");
        process.exit(1);
    }
    checkGitHubCLI();
    require('./export')(owner, repo, outputPath);
} else if (cmd === 'import') {
    if (!owner || !repo) {
        console.error("Wrong format. Use ghlie -h for help");
        process.exit(1);
    }
    checkGitHubCLI();
    require('./import')(owner, repo, outputPath);
} else {
    console.error("Unknown/invalid command:", cmd, "\nUse ghlie -h for correct usage.");
    process.exit(1);
}
