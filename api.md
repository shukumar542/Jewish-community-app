# Event Creation API Documentation (Postman Style)

Documentation for creating events via the backend API.

---

## 📌 Endpoint Overview

* **Method:** `POST`
* **URL:** `{{BASE_URL}}/events` (e.g. `http://localhost:3000/events`)
* **Authentication:** `Bearer Token` (Required)
* **Headers:**
  ```http
  Content-Type: application/json
  Authorization: Bearer {{ACCESS_TOKEN}}
  ```

---

## 🔑 Common Rules & Behavior

1. **`eventTitle` (Optional):**
   * If provided, the event will use this title.
   * If omitted or empty, the backend **dynamically generates** the title based on the primary person (e.g., Groom's name, Bar Mitzvah boy, Mourner/Deceased name, or Father's name).
2. **`details` (Strict Whitelist):**
   * Only the fields declared for that specific category are allowed. Extra or misspelled fields will return `400 Bad Request`.
3. **Event Status:**
   * Newly submitted events automatically start with `"status": "pending"`.
4. **Geo Coordinates:**
   * Optional `lat` and `long` numbers can be included inside `details` for any event if available from map picker.

---

## 📋 Standard Success Response (201 Created)

```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "_id": "672e1a2f9b1c2d001234abcd",
    "category": "Chasunah",
    "eventTitle": "David Cohen",
    "status": "pending",
    "createdBy": "672e18559b1c2d0012340001",
    "details": { ... },
    "createdAt": "2026-11-08T09:30:00.000Z",
    "updatedAt": "2026-11-08T09:30:00.000Z",
    "__v": 0
  }
}
```

---

## ❌ Common Error Responses

### 400 Bad Request — Unknown or Invalid Fields
```json
{
  "message": "property unknownField should not exist",
  "error": "Bad Request",
  "statusCode": 400
}
```

### 401 Unauthorized — Missing / Expired Token
```json
{
  "message": "Token is required or invalid",
  "error": "Unauthorized",
  "statusCode": 401
}
```

---

# 📦 Category-Wise Postman Examples

---

### 1. Chasunah (Wedding)

**Request Body:**
```json
{
  "category": "Chasunah",
  "eventTitle": "",
  "details": {
    "chosonName": "David Cohen",
    "mechiten1Name": "Rabbi Boruch Lefkowitz",
    "mechiten1BenR": "Rabbi Yisroel Lefkowitz",
    "mechiten1ChasanR": "Rabbi Chaim Weiss",
    "mechiten2Name": "Rabbi Alter Schwartz",
    "mechiten2BenR": "Rabbi Shimon Schwartz",
    "mechiten2ChasanR": "Rabbi Moshe Green",
    "hallName": "Ateres Chaim Hall",
    "address": "123 Main St, Brooklyn, NY",
    "date": "2026-11-20",
    "time": "18:30",
    "lat": 40.6782,
    "long": -73.9442
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "_id": "672e1a2f9b1c2d0012340002",
    "category": "Chasunah",
    "eventTitle": "David Cohen",
    "status": "pending",
    "createdBy": "672e18559b1c2d0012340001",
    "details": {
      "chosonName": "David Cohen",
      "mechiten1Name": "Rabbi Boruch Lefkowitz",
      "mechiten1BenR": "Rabbi Yisroel Lefkowitz",
      "mechiten1ChasanR": "Rabbi Chaim Weiss",
      "mechiten2Name": "Rabbi Alter Schwartz",
      "mechiten2BenR": "Rabbi Shimon Schwartz",
      "mechiten2ChasanR": "Rabbi Moshe Green",
      "hallName": "Ateres Chaim Hall",
      "address": "123 Main St, Brooklyn, NY",
      "date": "2026-11-20",
      "time": "18:30",
      "lat": 40.6782,
      "long": -73.9442
    },
    "createdAt": "2026-11-08T09:30:00.000Z",
    "updatedAt": "2026-11-08T09:30:00.000Z",
    "__v": 0
  }
}
```

---

### 2. Bar Mitzvah

**Request Body:**
```json
{
  "category": "Bar Mitzvah",
  "details": {
    "bucherName": "Yitzchok Goldstein",
    "fatherName": "Rabbi Menachem Goldstein",
    "fatherBenR": "Rabbi Yisroel Goldstein",
    "fatherChasanR": "Rabbi Chaim Weiss",
    "hallName": "Kiryas Joel Hall",
    "address": "45 Forest Rd, Monroe, NY",
    "date": "2026-11-15",
    "time": "19:00",
    "lat": 41.3255,
    "long": -74.1865
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "_id": "672e1a2f9b1c2d0012340003",
    "category": "Bar Mitzvah",
    "eventTitle": "Yitzchok Goldstein",
    "status": "pending",
    "createdBy": "672e18559b1c2d0012340001",
    "details": {
      "bucherName": "Yitzchok Goldstein",
      "fatherName": "Rabbi Menachem Goldstein",
      "fatherBenR": "Rabbi Yisroel Goldstein",
      "fatherChasanR": "Rabbi Chaim Weiss",
      "hallName": "Kiryas Joel Hall",
      "address": "45 Forest Rd, Monroe, NY",
      "date": "2026-11-15",
      "time": "19:00",
      "lat": 41.3255,
      "long": -74.1865
    },
    "createdAt": "2026-11-08T09:30:00.000Z",
    "updatedAt": "2026-11-08T09:30:00.000Z",
    "__v": 0
  }
}
```

---

### 3. Shidduch

**Request Body:**
```json
{
  "category": "Shidduch",
  "details": {
    "chosonName": "Yisroel Green",
    "fatherName": "Rabbi Moshe Green",
    "chosonBenR": "Rabbi Shimon Green",
    "chosonChasanR": "Rabbi Yosef Friedman",
    "kallahName": "Sara Lefkowitz",
    "kallahFatherName": "Rabbi Boruch Lefkowitz",
    "kallahBenR": "Rabbi Alter Lefkowitz",
    "kallahChasanR": "Rabbi Chaim Weiss",
    "shadchen": "Reb Aaron Klein",
    "date": "2026-11-10",
    "time": "20:00"
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "_id": "672e1a2f9b1c2d0012340004",
    "category": "Shidduch",
    "eventTitle": "Yisroel Green & Sara Lefkowitz",
    "status": "pending",
    "createdBy": "672e18559b1c2d0012340001",
    "details": {
      "chosonName": "Yisroel Green",
      "fatherName": "Rabbi Moshe Green",
      "chosonBenR": "Rabbi Shimon Green",
      "chosonChasanR": "Rabbi Yosef Friedman",
      "kallahName": "Sara Lefkowitz",
      "kallahFatherName": "Rabbi Boruch Lefkowitz",
      "kallahBenR": "Rabbi Alter Lefkowitz",
      "kallahChasanR": "Rabbi Chaim Weiss",
      "shadchen": "Reb Aaron Klein",
      "date": "2026-11-10",
      "time": "20:00"
    },
    "createdAt": "2026-11-08T09:30:00.000Z",
    "updatedAt": "2026-11-08T09:30:00.000Z",
    "__v": 0
  }
}
```

---

### 4. Nichum Aveilim

**Request Body:**
```json
{
  "category": "Nichum Aveilim",
  "details": {
    "nifterName": "Reb Yisroel ben Moshe",
    "wifeOf": "Mrs. Greenfeld",
    "sonOf": "Rabbi Moshe Greenfeld",
    "daughterOf": "Rabbi Chaim Friedman",
    "aveilim": "Sons: Moshe, Avrum. Daughters: Gitty, Chayala",
    "address": "45 Bedford Ave, Brooklyn, NY",
    "sittingUntil": "2026-11-14"
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "_id": "672e1a2f9b1c2d0012340005",
    "category": "Nichum Aveilim",
    "eventTitle": "Reb Yisroel ben Moshe",
    "status": "pending",
    "createdBy": "672e18559b1c2d0012340001",
    "details": {
      "nifterName": "Reb Yisroel ben Moshe",
      "wifeOf": "Mrs. Greenfeld",
      "sonOf": "Rabbi Moshe Greenfeld",
      "daughterOf": "Rabbi Chaim Friedman",
      "aveilim": "Sons: Moshe, Avrum. Daughters: Gitty, Chayala",
      "address": "45 Bedford Ave, Brooklyn, NY",
      "sittingUntil": "2026-11-14"
    },
    "createdAt": "2026-11-08T09:30:00.000Z",
    "updatedAt": "2026-11-08T09:30:00.000Z",
    "__v": 0
  }
}
```

---

### 5. Kiddish (or Kiddush)

**Request Body:**
```json
{
  "category": "Kiddish",
  "details": {
    "fatherName": "Rabbi Menachem Goldstein",
    "fatherBenR": "Rabbi Yisroel Goldstein",
    "fatherChasanR": "Rabbi Chaim Weiss",
    "address": "120 Hewes St, Brooklyn, NY",
    "locationDescription": "Father-in-law's house",
    "zmanShachris": "09:30"
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "_id": "672e1a2f9b1c2d0012340006",
    "category": "Kiddish",
    "eventTitle": "Rabbi Menachem Goldstein",
    "status": "pending",
    "createdBy": "672e18559b1c2d0012340001",
    "details": {
      "fatherName": "Rabbi Menachem Goldstein",
      "fatherBenR": "Rabbi Yisroel Goldstein",
      "fatherChasanR": "Rabbi Chaim Weiss",
      "address": "120 Hewes St, Brooklyn, NY",
      "locationDescription": "Father-in-law's house",
      "zmanShachris": "09:30"
    },
    "createdAt": "2026-11-08T09:30:00.000Z",
    "updatedAt": "2026-11-08T09:30:00.000Z",
    "__v": 0
  }
}
```

---

### 6. Zucher Vach Nacht

**Request Body:**
```json
{
  "category": "Zucher Vach Nacht",
  "details": {
    "fatherName": "Rabbi Menachem Goldstein",
    "fatherBenR": "Rabbi Yisroel Goldstein",
    "fatherChasanR": "Rabbi Chaim Weiss",
    "address": "120 Hewes St, Brooklyn, NY",
    "locationDescription": "Father-in-law's house",
    "brisAddress": "78 Rodney St, Brooklyn, NY",
    "brisLocationDescription": "Main Synagogue",
    "date": "2026-11-12",
    "time": "20:30"
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "_id": "672e1a2f9b1c2d0012340007",
    "category": "Zucher Vach Nacht",
    "eventTitle": "Rabbi Menachem Goldstein",
    "status": "pending",
    "createdBy": "672e18559b1c2d0012340001",
    "details": {
      "fatherName": "Rabbi Menachem Goldstein",
      "fatherBenR": "Rabbi Yisroel Goldstein",
      "fatherChasanR": "Rabbi Chaim Weiss",
      "address": "120 Hewes St, Brooklyn, NY",
      "locationDescription": "Father-in-law's house",
      "brisAddress": "78 Rodney St, Brooklyn, NY",
      "brisLocationDescription": "Main Synagogue",
      "date": "2026-11-12",
      "time": "20:30"
    },
    "createdAt": "2026-11-08T09:30:00.000Z",
    "updatedAt": "2026-11-08T09:30:00.000Z",
    "__v": 0
  }
}
```

---

### 7. Bavarfen

**Request Body:**
```json
{
  "category": "Bavarfen",
  "details": {
    "chosonName": "David Cohen",
    "chosonsFather": "Rabbi Boruch Lefkowitz",
    "kallahsFather": "Rabbi Alter Schwartz",
    "address": "50 Rutledge St, Brooklyn, NY",
    "locationDescription": "Father-in-law's house",
    "date": "2026-11-21",
    "zmanShachris": "09:15",
    "ladiesKiddush": "Schwartz residence, 12:00 PM"
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "_id": "672e1a2f9b1c2d0012340008",
    "category": "Bavarfen",
    "eventTitle": "David Cohen",
    "status": "pending",
    "createdBy": "672e18559b1c2d0012340001",
    "details": {
      "chosonName": "David Cohen",
      "chosonsFather": "Rabbi Boruch Lefkowitz",
      "kallahsFather": "Rabbi Alter Schwartz",
      "address": "50 Rutledge St, Brooklyn, NY",
      "locationDescription": "Father-in-law's house",
      "date": "2026-11-21",
      "zmanShachris": "09:15",
      "ladiesKiddush": "Schwartz residence, 12:00 PM"
    },
    "createdAt": "2026-11-08T09:30:00.000Z",
    "updatedAt": "2026-11-08T09:30:00.000Z",
    "__v": 0
  }
}
```

---

### 8. Bris

**Request Body:**
```json
{
  "category": "Bris",
  "details": {
    "fatherName": "Rabbi Menachem Goldstein",
    "fatherBenR": "Rabbi Yisroel Goldstein",
    "fatherChasanR": "Rabbi Chaim Weiss",
    "address": "78 Rodney St, Brooklyn, NY",
    "locationDescription": "Beis Medrash basement",
    "date": "2026-11-13",
    "zmanShachris": "08:30"
  }
}
```

---

### 9. Voch Nocht (or Vach Nacht)

**Request Body:**
```json
{
  "category": "Vach Nacht",
  "details": {
    "fatherName": "Rabbi Menachem Goldstein",
    "fatherBenR": "Rabbi Yisroel Goldstein",
    "fatherChasanR": "Rabbi Chaim Weiss",
    "address": "120 Hewes St, Brooklyn, NY",
    "locationDescription": "Father-in-law's house",
    "date": "2026-11-12",
    "time": "20:00",
    "brisAddress": "78 Rodney St, Brooklyn, NY",
    "brisLocationDescription": "Main Shul",
    "zmanShachris": "08:30"
  }
}
```

---

### 10. Sheva Brachos (or Sheva Broches)

**Request Body:**
```json
{
  "category": "Sheva Brachos",
  "details": {
    "chosonName": "David Cohen",
    "mechiten1Name": "Rabbi Boruch Lefkowitz",
    "mechiten1BenR": "Rabbi Yisroel Lefkowitz",
    "mechiten1ChasanR": "Rabbi Chaim Weiss",
    "mechiten2Name": "Rabbi Alter Schwartz",
    "mechiten2BenR": "Rabbi Shimon Schwartz",
    "mechiten2ChasanR": "Rabbi Moshe Green",
    "hallName": "Kiryas Joel Dining Room",
    "address": "14 Garfield Rd, Monroe, NY",
    "date": "2026-11-22",
    "time": "19:30"
  }
}
```

---

### 11. Tenoyim

**Request Body:**
```json
{
  "category": "Tenoyim",
  "details": {
    "chosonName": "David Cohen",
    "mechiten1Name": "Rabbi Boruch Lefkowitz",
    "mechiten1BenR": "Rabbi Yisroel Lefkowitz",
    "mechiten1ChasanR": "Rabbi Chaim Weiss",
    "mechiten2Name": "Rabbi Alter Schwartz",
    "mechiten2BenR": "Rabbi Shimon Schwartz",
    "mechiten2ChasanR": "Rabbi Moshe Green",
    "hallName": "Ateres Chaim",
    "address": "123 Main St, Brooklyn, NY",
    "date": "2026-11-18",
    "time": "20:00"
  }
}
```

---

### 12. Shabbos Sheva Brachos

**Request Body:**
```json
{
  "category": "Shabbos Sheva Brachos",
  "details": {
    "mechiten1Name": "Rabbi Boruch Lefkowitz",
    "mechiten2Name": "Rabbi Alter Schwartz",
    "chosonName": "David Cohen",
    "hallName": "Main Bais Medrash",
    "address": "550 Bedford Ave, Brooklyn, NY",
    "locationDescription": "Simcha Hall B",
    "date": "2026-11-21",
    "time": "12:00"
  }
}
```

---

### 13. Pidyon Haben

**Request Body:**
```json
{
  "category": "Pidyon Haben",
  "details": {
    "fatherName": "Rabbi Menachem Goldstein",
    "fatherBenR": "Rabbi Yisroel Goldstein",
    "fatherChasanR": "Rabbi Chaim Weiss",
    "address": "10 Heyward St, Brooklyn, NY",
    "locationDescription": "Private Residence",
    "date": "2026-11-25",
    "zmanShachris": "09:00"
  }
}
```

---

### 14. Zocher

**Request Body:**
```json
{
  "category": "Zocher",
  "details": {
    "fatherName": "Rabbi Menachem Goldstein",
    "fatherBenR": "Rabbi Yisroel Goldstein",
    "fatherChasanR": "Rabbi Chaim Weiss",
    "address": "120 Hewes St, Brooklyn, NY",
    "locationDescription": "Home of the grandparents",
    "date": "2026-11-13",
    "time": "21:00"
  }
}
```
