const app = require('./app')
const { info } = require('./utils/logger')

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    info(`server running on port ${PORT}`)
})