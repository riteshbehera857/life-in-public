## CLIENT

```env
NEXT_PUBLIC_BACKEND_BASE_URL=http://localhost:
NEXT_PUBLIC_BACKEND_PORT=8000

NEXT_PUBLIC_BACKEND_SIGNUP_END_POINT=/auth/signup
NEXT_PUBLIC_BACKEND_LOGIN_END_POINT=/auth/login

NEXT_PUBLIC_CURRENT_USER_END_POINT = /user
```

## SERVER

```
BASE_URL = http://localhost:
PORT = 8000

# Mongo_credentials
MONGO_DATABASE_URL = mongodb+srv://riteshk_behera:<PASSWORD>@cluster0.8f9b4.mongodb.net/LifeInPublic_DB?retryWrites=true&w=majority
MONGO_DATABASE_URL_PASSWORD_DEV = ufgwN8SJRf5Cg6k4

# JWT_credentials
JWT_SECRET_DEV =  hello-this-is-ritesh-building-a-app-for-public-to-share-their-thoughts-without-revealing-their-idenitity
JWT_EXPIRES_IN_DEV = 180d
```
