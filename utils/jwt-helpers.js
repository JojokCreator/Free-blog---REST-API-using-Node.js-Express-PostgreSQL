import jwt from 'jsonwebtoken';

function jwtTokens({user_id, first_name, email}) {
    const user = {user_id, first_name, email};
    const accessToken = jwt.sign(user, process.env.ACCESS_SECRET, {expiresIn:'1m'})
    const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET, {expiresIn:'15m'})
    return ({accessToken, refreshToken})
}

export {jwtTokens}