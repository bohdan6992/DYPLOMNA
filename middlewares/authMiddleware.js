const jwt = require('jsonwebtoken');
const { secret } = require('../config/config')

module.exports = function (roles) {
  return function (req, res, next) {

    try {
      const token = req.cookies.access_token;
  
      if (!token){
        return res.send('User not autorized')
      }
  
      const decodedData = jwt.verify(token, secret);
      let hasRole = false;

      decodedData.roles.array.forEach(element => {
        if (roles.includes(element)){
          hasRole = true;
        }
      });

      if(!hasRole){
        return res.send('Acces denied')
      };

      // decodedData.roles = [ 'ADMIN' ]
      // req.user = decodedData;

      next();
    } catch (e) {
      console.log(e)
    }
  }
}
