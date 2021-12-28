
## User Module API Reference

#### Get list of users

```http
  GET /api/users
```

| Parameter | Type | Description |
| :-------- | :------- | :------- |
| `access_token` | `header` | **Required**. Your session token. |

---
#### Create user
```http
  POST /api/users
```
| Parameter | Type | Description |
| :-------- | :------- | :------- |
| `access_token` | `header` | **Required**. Your session token. |
| `username` | `body` | **Required**. Username for login. |
| `user_name` | `body` | **Required**. |
| `user_surname` | `body` | **Required**. |
| `user_password` | `body` | **Required**. Password for login |
| `user_email` | `body` | **Required**. |
| `user_type` | `body` | **Required**. Role of user. |

---
#### Get user info

```http
  GET /api/users/${id}
```

| Parameter | Type | Description |
| :-------- | :------- | :------- |
| `access_token` | `header` | **Required**. Your session token. |
| `id` | `parameter` | **Required**. Id of item to fetch |

---
#### Update user
```http
  PUT /api/users/${id}
```

| Parameter | Type | Description |
| :-------- | :------- | :------- |
| `access_token` | `header` | **Required**. Your session token. |
| `id` | `parameter` | **Required**. Id of item to fetch |
| `username` | `body` | **Required**. |
| `user_name` | `body` | **Required**. |
| `user_surname` | `body` | **Required**. |
| `user_password` | `body` | **Required**. |
| `user_email` | `body` | **Required**. |
| `user_type` | `body` | **Required**. |

---
#### Delete user

```http
  DELETE /api/users/${id}
```

| Parameter | Type | Description |
| :-------- | :------- | :------- |
| `access_token` | `header` | **Required**. Your session token. |
| `id` | `parameter` | **Required**. Id of item to fetch |
