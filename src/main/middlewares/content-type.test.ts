import request from 'supertest'
import app from '../config/app'

describe('Content Type Middleware', () => {
    test('Should return content type as json', async () => {
        app.get('/test_content', (req, res) => {
            res.send('')
        })

        await request(app)
            .get('/test_content')
            .expect('content-type', /json/)
    })
});