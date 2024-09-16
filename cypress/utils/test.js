const dns = require('dns');

const domain = 'appdevs.team';

dns.resolveMx(domain, (err, addresses) => {
  if (err) {
    console.error('Error resolving MX records:', err);
    return;
  }

  addresses.sort((a, b) => a.priority - b.priority); // Sort by priority
  console.log('MX Records:', addresses);

  // Assuming the first record is the primary SMTP server
  if (addresses.length > 0) {
    console.log(`Primary SMTP server: ${addresses[0].exchange}`);
  } else {
    console.log('No MX records found.');
  }
});