const request = require('supertest');
const app = require('../index');

const userId = 'vq9zsnMjhgyhc8jrdhbC';
const email = 'shreyapatel6121997@gmail.com';
const Id = '2VvcxBZIl4hGNdf7TgZp';
const categoryId = 'ffjYYQpYDdczFh2HJmSU';
const categoryID = '6aAlQ3xu96Pb5bR3u5P2';
const productId = 'pTsUbDTiQIciEiU0hv6B';

describe('Post Endpoints create user', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/users/register')
        .send({
            name:'test',
            email:'test@test.com',
            password : 'test123',
            phone : '9876543210',
            role_id: 'a5SEAhRY72lZtR11Kn0Q',
            country_id : 'NhjsxtiFxXiOQnl3WKDk',
            state_id : 'eGM6vFAH31qnZowPoIuF',
            city_id : 'PStSd871AArZnYSa0R1Q'
        })
        // console.log(res.statusCode);
        expect(res.statusCode).toEqual(200)
    })
  })

  test('Should login for a user',async()=>{
    const res = await request(app)
    .post('/users/login')
    .send({
        email : 'shreyapatel6121997@gmail.com',
        password : 'shreya1'
    })
})

it('should get user list',async()=>{
    const res = await request(app)
    .get('/users')
    expect(JSON.stringify(res))
})

test('Should get user by id',async()=>{
    const res = await request(app)
    .get('/users/' + userId)
    expect(JSON.stringify(res))
})

describe('Put Endpoints update user',()=>{
it('should update a user', async()=>{
    const res = await request(app)
    .put('/users/updateprofile/' +userId)
    .send({
        name:'test',
        email:'test@test.com',
        password : 'test12345',
        phone : '9876543210',
        role_id: 'a5SEAhRY72lZtR11Kn0Q',
        country_id : 'NhjsxtiFxXiOQnl3WKDk',
        state_id : 'eGM6vFAH31qnZowPoIuF',
        city_id : 'PStSd871AArZnYSa0R1Q'
    })
    expect(res.statusCode).toEqual(200)
})

it('should delete user',async()=>{
    const res = await request(app)
    .delete('/users/delete/' + Id)
    expect(res.statusCode).toEqual(200)
})

})

describe('put endpoints category',()=>{
    it('should add category', async()=>{
        const res = await request(app)
        .post('/category/addcategory')
        .send({
            name : 'electronics'
        })
        expect(res.statusCode).toEqual(200)
    })
})

test('get all category',async()=>{
    const res = await request(app)
    .get('/category')
    expect(JSON.stringify(res))
})

describe('Put Endpoints update category',()=>{
    it('should update a category', async()=>{
        const res = await request(app)
        .put('/category/updatecategory/' + categoryId)
        .send({
            name:'electronicTest',
        })
        expect(res.statusCode).toEqual(200)
    })

    it('should delete category',async()=>{
        const res = await request(app)
        .delete('/category/delete/' + categoryID)
        expect(res.statusCode).toEqual(200)
    })
})

describe('put endpoints product',()=>{
    it('should add product', async()=>{
        const res = await request(app)
        .post('/product/addproduct')
        .send({
            name : 'vivo v7',
            price : '10000',
            description : 'vivo v7 is smart phone',
            category_id : '66s3XkIfx2P6zk4Y9bNZ',
            image : 'uploads\fries.jpg',
            show_on : '0'
        })
        expect(res.statusCode).toEqual(200)
    })
})

describe('Put Endpoints update product',()=>{
    it('should update a product', async()=>{
        const res = await request(app)
        .put('/product/updateproduct/' + productId)
        .send({
            name : 'vivo v7',
            price : '10000',
            description : 'vivo v7 is smart phone',
            category_id : '66s3XkIfx2P6zk4Y9bNZ',
            image : 'uploads\fries.jpg',
            show_on : '0'
        })
        expect(res.statusCode).toEqual(200)
    })

    it('should delete product',async()=>{
        const res = await request(app)
        .delete('/product/deleteproduct/' + productId)
        expect(res.statusCode).toEqual(200)
    })
    it('should get product list',async()=>{
        const res = await request(app)
        .get('/product')
        expect(JSON.stringify(res))
    })
})