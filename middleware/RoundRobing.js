const Docker = require('dockerode');

class RoundRobing {
  docker = new Docker({ socketPath: '/var/run/docker.sock' });
  pgpool1 = docker.getContainer('pgpool'); //id

  STATUS = ""


  static checkHelathyStatus() {
    container.inspect(function (err, data) {
      STATUS = data.State.Running
    })
    console.log(`Container state running: ${STATUS}`);
    if (STATUS) {
      return 0
    }
    else {
      return 1
    }
  }

}


