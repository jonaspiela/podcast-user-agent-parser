const https = require('https');

exports.UserAgentParser = class UserAgentParser {
    constructor(){
        this.getUserAgentDatabase = this.getUserAgentDatabase.bind(this);
        this.parseU = this.parse.bind(this);

        return (async (userAgent) => { 
            try {
                this.userAgentDatabase = await this.getUserAgentDatabase();
            }catch (e) {
                console.log(e);
            }

            return this;
        })();
    }

    getUserAgentDatabase = () => {
        return new Promise((resolve, reject) => {
            const databaseUrl = 'https://raw.githubusercontent.com/opawg/user-agents/master/src/user-agents.json';

            var request = https.get(databaseUrl, function (res) {
                var data = '';
                res.on('data', function (chunk) {
                    data += chunk;
                });
                res.on('end', function () {
                    resolve(JSON.parse(data));
                });
            });
            request.on('error', function (e) {
                reject(e);
            });
        });
    }

    parse = (userAgent) => {
        for(let i = 0; i < this.userAgentDatabase.length; i++) {
            if(userAgent.match(this.userAgentDatabase[i].user_agents)){
                return this.userAgentDatabase[i];
            }
        }
    }
}
