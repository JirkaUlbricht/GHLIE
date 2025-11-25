
const [,, cmd, owner, repo] = process.argv;

if (!cmd || !owner || !repo) {
    console.error("Wrong format. Use ghlie -h for help");
    process.exit(1);
}

if (cmd === 'help' || cmd === '--help' || cmd === '-h') {
    console.log("GHLIE - GitHub Labels Import/Export Tool by Gottchabeach");
    console.log("Usage: GHLIE import|export <owner> <repo>");
    process.exit(0);
} else if (cmd === 'export') {
    require('./export')(owner, repo);
} else if (cmd === 'import') {
    require('./import')(owner, repo);
} else {
    console.error("Unknown/invalid command:", cmd, "\n Use GHLIE help for correct usage.");
    process.exit(1);
}
