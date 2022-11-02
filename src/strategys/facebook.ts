import axios from "axios";
import passport from "passport";
import OAuth2Strategy from "passport-oauth2";

const credentials = {
  authorizationURL: "https://graph.facebook.com/oauth/authorize.",
  tokenURL: "https://graph.facebook.com/oauth/access_token",
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: "",
  scope: "repo,gist",
} as OAuth2Strategy.StrategyOptions;

const strategyFunction: OAuth2Strategy.VerifyFunction = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { data } = await axios.get(process.env.GITHUB_USER_URL, {
      headers: { Authorization: `token ${accessToken}` },
    });

    done(null, data);
  } catch (error) {
    done(error);
  }
};

const strategy = new OAuth2Strategy(credentials, strategyFunction);

passport.use(strategy);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

export { passport as passportGithub };
