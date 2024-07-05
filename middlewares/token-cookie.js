import jwt from 'jsonwebtoken'

export const tokenCookie = () => (req, res, next) => {
    const token = req.cookies['access_token']
    req.session = { user: null }
    try {
        req.session.user = jwt.verify(token, process.env.JWT_SECRET)
    } catch {}
    next()
}
