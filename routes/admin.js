const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
const mongoose = require('mongoose')
const adminBro = new AdminBro()
const router = new buildRouter(adminBro)
AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
})

const ADMIN ={
  email: process.env.ADMIN_EMAIL || 'admin@gmail.com',
  password : process.env.ADMIN_PASSWORD || 'adminbro'
}

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro,{
  cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
  cookiePassword: process.env.ADMIN_COOKIE_PASS || 'supersecret-and-long-password',
  authenticate: async (email, password)=>{
if (email === ADMIN.email && password === ADMIN.password){
  return ADMIN;
}
return null
  }
})

module.exports = router;