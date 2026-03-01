const localtunnel = require('localtunnel');
const { spawn } = require('child_process');
const axios = require('axios');

// Start the backend server
console.log('Starting backend server on port 5000...');
const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const server = spawn(npmCmd, ['start'], { stdio: 'inherit', shell: true });

server.on('error', (err) => {
    console.error('Failed to start server:', err);
});

// Wait a bit for the server to spin up, then create the tunnel
setTimeout(async () => {
    try {
        console.log('\nCreating secure tunnel to port 5000...');
        // Request a specific subdomain to try and keep the URL consistent
        const tunnel = await localtunnel({ port: 5000, subdomain: 'tweety-vanyusha-live' });
        // Fetch the public IP to display to the user as the Localtunnel password
        let publicIp = 'Fetching...';
        try {
            const res = await axios.get('https://api.ipify.org?format=json');
            publicIp = res.data.ip;
        } catch (ipErr) {
            publicIp = 'Could not fetch. Google "What is my IP"';
        }

        console.log('\n======================================================');
        console.log('🚀 YOUR LIVE HACKATHON API URL IS:');
        console.log(`=> ${tunnel.url}`);
        console.log('\n======================================================');
        console.log('⚠️ IMPORTANT: SECURE LOCALTUNNEL PASSWORD ⚠️');
        console.log('When judges click the link, it will ask for an IP Address.');
        console.log(`GIVE THEM THIS EXACT NUMBER: ${publicIp}`);
        console.log('======================================================\n');

        tunnel.on('close', () => {
            console.log('Tunnel closed.');
        });
    } catch (err) {
        console.error('Error creating tunnel:', err);
    }
}, 3000); // 3 second delay
