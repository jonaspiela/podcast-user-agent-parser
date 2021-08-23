const https = require('https');

module.exports = class UserAgentParser {
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
          var userAgents = this.userAgentDatabase[i].user_agents;
          
          for(let j = 0; j < userAgents.length; j++){
            var regExp = new RegExp(userAgents[j], 'g');

            if(userAgent.match(regExp)){
                return this.userAgentDatabase[i];
            }
          }
        }
    }
}
