import {
    REACT_APP_STRAVA_API_KEY,
    REACT_APP_STRAVA_CLIENT_ID,
    REACT_APP_STRAVA_CLIENT_SECRET,
    REACT_APP_STRAVA_AUTH_RESPONSE_TYPE,
    REACT_APP_STRAVA_AUTH_APPROVAL_PROMPT,
    REACT_APP_STRAVA_AUTH_SCOPE,
    REACT_APP_AUTH_REDIRECT_URI
} from "@env";

export const globals = {
    stravaAuthEndpoints: {
        authorizationEndpoint: "https://www.strava.com/oauth/mobile/authorize",
        tokenEndpoint: "https://www.strava.com/oauth/token",
        revocationEndpoint: "https://www.strava.com/oauth/deauthorize",
    },
    stravaApiKey: REACT_APP_STRAVA_API_KEY,
    stravaClientId: REACT_APP_STRAVA_CLIENT_ID,
    stravaClientSecret: REACT_APP_STRAVA_CLIENT_SECRET,
    stravaAuthResponseType: REACT_APP_STRAVA_AUTH_RESPONSE_TYPE,
    stravaAuthApprovalPrompt: REACT_APP_STRAVA_AUTH_APPROVAL_PROMPT,
    stravaAuthScope: REACT_APP_STRAVA_AUTH_SCOPE,
    stravaAuthRedirectNative: REACT_APP_AUTH_REDIRECT_URI,
    stravaAuthGrantType: "authorization_code",
    stravaAthleteEndpoint: "https://www.strava.com/api/v3/athlete",
    stravatAthleteStatsEndpoint: "https://www.strava.com/api/v3/athletes/clientId/stats",
}