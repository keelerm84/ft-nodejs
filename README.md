# Find.Torrent Web Service
This is an example Node.js project interfacing with the
[Find.Torrent service](https://github.com/Tortugas-Consulting-LLC/find.torrent),
which is still currently in development.

# Setup
This project requires a working installation of Find.Torrent.  Follow the
installation instructions in the Find.Torrent service README.

To install this application,

    git clone git://github.com/keelerm84/ft-nodejs
    npm install locomotive -g
    cd ft-nodejs
    npm install
    lcm server

## Configuring Client
Currently, configuration of the client relies on manually editing the
configuration file.  Eventually this will be handled through the UI.

For now, simply edit the file app/models/settings.js and specify the host and
private/public key pairs.
