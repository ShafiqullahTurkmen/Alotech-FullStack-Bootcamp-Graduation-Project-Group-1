## API Reference

#### Login user

```http
  POST /api/
```

| Parameter | Type | Description |
| :-------- | :------- | :------- |
| `username` | `body` | **Required**. Your username |
| `user_password` | `body` | **Required**. Your password |
| `redirectURL` | `body` | **Required**. Url to redirect |

---
#### Get Login Page

```http
  GET /api/
```

| Parameter | Type | Description |
| :------- | :------- | :------- |
| `redirectURL` | `parameter` | **Required**. Url to redirect |

---
#### Is Token Valid

```http
  POST /api/token
```

| Parameter | Type | Description |
| :-------- | :------- | :------- |
| `token` | `body` | **Required**. Token to validate |
