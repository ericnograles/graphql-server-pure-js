import winston from 'winston';
import jwt from 'jsonwebtoken';
import { userTokens } from '../services/redis';
import { User, UserEmail } from '../models/User';

export default function(req, res, next) {
  // Allow for access token to be passed either as an access_token query parameter (a la Facebook Graph Explorer)
  // or through the Authorization header in a more traditional fashion
  let queryAccessToken = req.query['access_token'];
  let headerAccessToken = req.headers['authorization']
    ? req.headers['authorization'].replace('Bearer ', '')
    : null;
  let token = queryAccessToken || headerAccessToken;

  // Is this a valid user?
  if (token) {
    userTokens
      .getAsync(token)
      .then(response => {
        if (response !== 'true') {
          return res
            .status(401)
            .json({ errors: [{ message: `Unauthorized access detected` }] });
        }
        return jwt.verify(token, process.env.API_SECRET);
      })
      .then(decoded => {
        return UserEmail.findOne({ where: { email: decoded.email } });
      })
      .then(userEmail => {
        if (!userEmail) {
          throw new Error(`Unauthorized access detected`);
        }
        // TODO: Have either a table or a completely separate column that defines a user's permissions per path
        req.user = userEmail.user;
        next();
      })
      .catch(ex => {
        return res
          .status(401)
          .json({ errors: [{ message: `Unauthorized access detected` }] });
      });
  } else {
    next();
  }
}
