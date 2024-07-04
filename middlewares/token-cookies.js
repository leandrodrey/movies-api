import jwt from 'jsonwebtoken'

export const tokenCookie = () => (req, res, next) => {
    const token = req.cookies['access_token']
    req.session = { user: null }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.session.user = data.user
    } catch {}
    next()
}

