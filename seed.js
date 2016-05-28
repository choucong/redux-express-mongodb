import User from './server/models/users'

var data = {
  username: 'administrator',
  password: 'password'
}

User.findOne({'username': data.username})
.exec(function (err, result) {
  if (err) {
    console.log(err)
    process.exit(0)
  }
  if (result) {
    console.log('data already added')
    process.exit(0)
  }

  new User(data).save(function (err) {
    if (err) {
      console.log(err)
      process.exit(0)
    }
    console.log('new user added, please start you app and login to your app')
    process.exit(0)
  })
})
