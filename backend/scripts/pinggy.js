const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 1. Start the Backend API
console.log('Starting backend server on port 5000...');
const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const server = spawn(npmCmd, ['start'], { stdio: 'inherit', shell: true });

server.on('error', (err) => {
    console.error('Failed to start server:', err);
});

// 2. Start the Passwordless Pinggy Tunnel
console.log('\nCreating secure passwordless tunnel via Pinggy...');
const tunnel = spawn('ssh', ['-p', '443', '-R0:localhost:5000', '-o', 'StrictHostKeyChecking=no', 'a.pinggy.io'], { shell: true });

let publicUrl = '';

tunnel.stdout.on('data', (data) => {
    const output = data.toString();
    // Pinggy outputs the URL like: http://ran-dom-string.a.pinggy.online
    const match = output.match(/http[s]?:\/\/[a-zA-Z0-9-]+\.a\.pinggy\.(link|online)/);

    if (match && !publicUrl) {
        // Upgrade to https if it gave us http
        publicUrl = match[0].replace('http://', 'https://');

        console.log('\n======================================================');
        console.log('🚀 YOUR NEW PASSWORDLESS HACKATHON URL IS:');
        console.log(`=> ${publicUrl}`);
        console.log('======================================================\n');

        updateSystem(publicUrl);
    }

    // Print the rest of Pinggy's cool QR code terminal output
    process.stdout.write(data);
});

tunnel.stderr.on('data', (data) => {
    // Pinggy sometimes prints to stderr
    const output = data.toString();
    const match = output.match(/http[s]?:\/\/[a-zA-Z0-9-]+\.a\.pinggy\.(link|online)/);
    if (match && !publicUrl) {
        publicUrl = match[0].replace('http://', 'https://');
        console.log('\n======================================================');
        console.log('🚀 YOUR NEW PASSWORDLESS HACKATHON URL IS:');
        console.log(`=> ${publicUrl}`);
        console.log('======================================================\n');
        updateSystem(publicUrl);
    }
});

function updateSystem(url) {
    console.log('🔄 Automatically updating GitHub Pages and Frontend API configs...');

    try {
        // Update API_URL in frontend/js/api.js
        const apiPath = path.join(__dirname, '../../frontend/js/api.js');
        let apiContent = fs.readFileSync(apiPath, 'utf8');
        apiContent = apiContent.replace(/const API_URL = '.*';/, `const API_URL = '${url}/api';`);
        fs.writeFileSync(apiPath, apiContent);

        // Update the root redirect in index.html
        const indexPath = path.join(__dirname, '../../index.html');
        let indexContent = fs.readFileSync(indexPath, 'utf8');
        indexContent = indexContent.replace(/<meta http-equiv="refresh" content="0; url=.*" \/>/, `<meta http-equiv="refresh" content="0; url=${url}" />`);
        indexContent = indexContent.replace(/<a href=".*">click here<\/a>/, `<a href="${url}">click here</a>`);
        fs.writeFileSync(indexPath, indexContent);

        // Push to GitHub
        console.log('☁️ Pushing magic auto-redirect to GitHub...');
        const rootDir = path.join(__dirname, '../../');
        execSync('git add frontend/js/api.js index.html', { cwd: rootDir });
        execSync('git commit -m "chore: auto-update pinggy passwordless tunnel URL"', { cwd: rootDir });
        execSync('git push origin main', { cwd: rootDir });

        console.log('\n✅ DONE! Tell the judges to click your GitHub Pages link:');
        console.log('👉 https://vanyusha18.github.io/tweeeety/');
        console.log('(It will perfectly redirect them with NO passwords required!)');
    } catch (err) {
        console.error('Error updating system:', err.message);
    }
}
