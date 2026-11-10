# Event Creation & API Reference (Postman Style)

Complete documentation for creating events and updating user profile with addresses & coordinatesss.

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

## 🔑 Common Rules & Validation Behavior

1. **`eventTitle` (Optional):**
   * If provided in the root body, that title is used.
   * If omitted or empty, the backend **automatically generates** a meaningful title from the primary person (e.g., groom, boy, father, deceased, or mechitunim).
2. **`details` (Strict Whitelist):**
   * Only the fields declared for that specific category are allowed. Extra or misspelled properties will immediately return `400 Bad Request`.
3. **Geo-Coordinates (`lat`, `long`):**
   * **Primary Venue:** `address`, `lat`, `long`
   * **Bris Venue (for `Voch Nocht` & `Zucher Vach Nacht`):** `brisAddress`, `brisLat`, `brisLong`
   * `lat` and `long` are optional numbers from map picker.
4. **Special Category Nuances:**
   * **Shidduch:** Engagement announcement only — **NO** address, lat, or long.
   * **Sheva Brachos & Shabbos Sheva Brachos:** Focused on Mechitunim — **NO** chosonName, hallName, or time.
   * **Zocher:** Friday night gathering — **NO** date or time.
5. **Initial Status:**
   * All newly submitted events start with `"status": "pending"`.

---

## ❌ Error Responses

### 400 Bad Request (Invalid / Unknown Field)
```json
{
  "message": "property unknownField should not exist",
  "error": "Bad Request",
  "statusCode": 400
}
```

### 401 Unauthorized (Missing / Expired Token)
```json
{
  "message": "Token is required or invalid",
  "error": "Unauthorized",
  "statusCode": 401
}
```

---

# 📦 All 14 Category Postman Examples (Request & Response)

---

### 1. Chasunah (Wedding)

**Request Body:**
```json
{
  "category": "Chasunah",
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
    "lat": 40.6782,
    "long": -73.9442,
    "date": "2026-11-20",
    "time": "18:30"
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "_id": "672e1a2f9b1c2d0012340001",
    "category": "Chasunah",
    "eventTitle": "David Cohen",
    "status": "pending",
    "createdBy": "672e18559b1c2d0012340000",
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
      "lat": 40.6782,
      "long": -73.9442,
      "date": "2026-11-20",
      "time": "18:30"
    },
    "createdAt": "2026-11-09T06:40:00.000Z",
    "updatedAt": "2026-11-09T06:40:00.000Z",
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
    "lat": 41.3255,
    "long": -74.1865,
    "date": "2026-11-15",
    "time": "19:00"
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
    "category": "Bar Mitzvah",
    "eventTitle": "Yitzchok Goldstein",
    "status": "pending",
    "createdBy": "672e18559b1c2d0012340000",
    "details": {
      "bucherName": "Yitzchok Goldstein",
      "fatherName": "Rabbi Menachem Goldstein",
      "fatherBenR": "Rabbi Yisroel Goldstein",
      "fatherChasanR": "Rabbi Chaim Weiss",
      "hallName": "Kiryas Joel Hall",
      "address": "45 Forest Rd, Monroe, NY",
      "lat": 41.3255,
      "long": -74.1865,
      "date": "2026-11-15",
      "time": "19:00"
    },
    "createdAt": "2026-11-09T06:40:00.000Z",
    "updatedAt": "2026-11-09T06:40:00.000Z",
    "__v": 0
  }
}
```

---

### 3. Shidduch (Matchmaking Announcement — No Venue Address)

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
    "_id": "672e1a2f9b1c2d0012340003",
    "category": "Shidduch",
    "eventTitle": "Yisroel Green & Sara Lefkowitz",
    "status": "pending",
    "createdBy": "672e18559b1c2d0012340000",
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
    "createdAt": "2026-11-09T06:40:00.000Z",
    "updatedAt": "2026-11-09T06:40:00.000Z",
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
    "lat": 40.7199,
    "long": -73.9525,
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
    "_id": "672e1a2f9b1c2d0012340004",
    "category": "Nichum Aveilim",
    "eventTitle": "Reb Yisroel ben Moshe",
    "status": "pending",
    "createdBy": "672e18559b1c2d0012340000",
    "details": {
      "nifterName": "Reb Yisroel ben Moshe",
      "wifeOf": "Mrs. Greenfeld",
      "sonOf": "Rabbi Moshe Greenfeld",
      "daughterOf": "Rabbi Chaim Friedman",
      "aveilim": "Sons: Moshe, Avrum. Daughters: Gitty, Chayala",
      "address": "45 Bedford Ave, Brooklyn, NY",
      "lat": 40.7199,
      "long": -73.9525,
      "sittingUntil": "2026-11-14"
    },
    "createdAt": "2026-11-09T06:40:00.000Z",
    "updatedAt": "2026-11-09T06:40:00.000Z",
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
    "lat": 40.7042,
    "long": -73.9555,
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
    "_id": "672e1a2f9b1c2d0012340005",
    "category": "Kiddish",
    "eventTitle": "Rabbi Menachem Goldstein",
    "status": "pending",
    "createdBy": "672e18559b1c2d0012340000",
    "details": {
      "fatherName": "Rabbi Menachem Goldstein",
      "fatherBenR": "Rabbi Yisroel Goldstein",
      "fatherChasanR": "Rabbi Chaim Weiss",
      "address": "120 Hewes St, Brooklyn, NY",
      "locationDescription": "Father-in-law's house",
      "lat": 40.7042,
      "long": -73.9555,
      "zmanShachris": "09:30"
    },
    "createdAt": "2026-11-09T06:40:00.000Z",
    "updatedAt": "2026-11-09T06:40:00.000Z",
    "__v": 0
  }
}
```

---

### 6. Zucher Vach Nacht (Dual Venue)

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
    "lat": 40.7042,
    "long": -73.9555,
    "brisAddress": "78 Rodney St, Brooklyn, NY",
    "brisLocationDescription": "Main Synagogue",
    "brisLat": 40.7078,
    "brisLong": -73.9589,
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
    "_id": "672e1a2f9b1c2d0012340006",
    "category": "Zucher Vach Nacht",
    "eventTitle": "Rabbi Menachem Goldstein",
    "status": "pending",
    "createdBy": "672e18559b1c2d0012340000",
    "details": {
      "fatherName": "Rabbi Menachem Goldstein",
      "fatherBenR": "Rabbi Yisroel Goldstein",
      "fatherChasanR": "Rabbi Chaim Weiss",
      "address": "120 Hewes St, Brooklyn, NY",
      "locationDescription": "Father-in-law's house",
      "lat": 40.7042,
      "long": -73.9555,
      "brisAddress": "78 Rodney St, Brooklyn, NY",
      "brisLocationDescription": "Main Synagogue",
      "brisLat": 40.7078,
      "brisLong": -73.9589,
      "date": "2026-11-12",
      "time": "20:30"
    },
    "createdAt": "2026-11-09T06:40:00.000Z",
    "updatedAt": "2026-11-09T06:40:00.000Z",
    "__v": 0
  }
}
```

---

### 7. Voch Nocht (or Vach Nacht) (Dual Venue)

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
    "lat": 40.7042,
    "long": -73.9555,
    "date": "2026-11-12",
    "time": "20:00",
    "brisAddress": "78 Rodney St, Brooklyn, NY",
    "brisLocationDescription": "Main Shul",
    "brisLat": 40.7078,
    "brisLong": -73.9589,
    "zmanShachris": "08:30"
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
    "category": "Vach Nacht",
    "eventTitle": "Rabbi Menachem Goldstein",
    "status": "pending",
    "createdBy": "672e18559b1c2d0012340000",
    "details": {
      "fatherName": "Rabbi Menachem Goldstein",
      "fatherBenR": "Rabbi Yisroel Goldstein",
      "fatherChasanR": "Rabbi Chaim Weiss",
      "address": "120 Hewes St, Brooklyn, NY",
      "locationDescription": "Father-in-law's house",
      "lat": 40.7042,
      "long": -73.9555,
      "date": "2026-11-12",
      "time": "20:00",
      "brisAddress": "78 Rodney St, Brooklyn, NY",
      "brisLocationDescription": "Main Shul",
      "brisLat": 40.7078,
      "brisLong": -73.9589,
      "zmanShachris": "08:30"
    },
    "createdAt": "2026-11-09T06:40:00.000Z",
    "updatedAt": "2026-11-09T06:40:00.000Z",
    "__v": 0
  }
}
```

---

### 8. Bavarfen

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
    "lat": 40.7011,
    "long": -73.9542,
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
    "createdBy": "672e18559b1c2d0012340000",
    "details": {
      "chosonName": "David Cohen",
      "chosonsFather": "Rabbi Boruch Lefkowitz",
      "kallahsFather": "Rabbi Alter Schwartz",
      "address": "50 Rutledge St, Brooklyn, NY",
      "locationDescription": "Father-in-law's house",
      "lat": 40.7011,
      "long": -73.9542,
      "date": "2026-11-21",
      "zmanShachris": "09:15",
      "ladiesKiddush": "Schwartz residence, 12:00 PM"
    },
    "createdAt": "2026-11-09T06:40:00.000Z",
    "updatedAt": "2026-11-09T06:40:00.000Z",
    "__v": 0
  }
}
```

---

### 9. Bris

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
    "lat": 40.7078,
    "long": -73.9589,
    "date": "2026-11-13",
    "zmanShachris": "08:30"
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "_id": "672e1a2f9b1c2d0012340009",
    "category": "Bris",
    "eventTitle": "Rabbi Menachem Goldstein",
    "status": "pending",
    "createdBy": "672e18559b1c2d0012340000",
    "details": {
      "fatherName": "Rabbi Menachem Goldstein",
      "fatherBenR": "Rabbi Yisroel Goldstein",
      "fatherChasanR": "Rabbi Chaim Weiss",
      "address": "78 Rodney St, Brooklyn, NY",
      "locationDescription": "Beis Medrash basement",
      "lat": 40.7078,
      "long": -73.9589,
      "date": "2026-11-13",
      "zmanShachris": "08:30"
    },
    "createdAt": "2026-11-09T06:40:00.000Z",
    "updatedAt": "2026-11-09T06:40:00.000Z",
    "__v": 0
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
    "mechiten1Name": "Rabbi Boruch Lefkowitz",
    "mechiten2Name": "Rabbi Alter Schwartz",
    "address": "14 Garfield Rd, Monroe, NY",
    "locationDescription": "Dining Room / Basement",
    "lat": 41.3211,
    "long": -74.1822,
    "date": "2026-11-22"
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "_id": "672e1a2f9b1c2d0012340010",
    "category": "Sheva Brachos",
    "eventTitle": "Rabbi Boruch Lefkowitz - Rabbi Alter Schwartz",
    "status": "pending",
    "createdBy": "672e18559b1c2d0012340000",
    "details": {
      "mechiten1Name": "Rabbi Boruch Lefkowitz",
      "mechiten2Name": "Rabbi Alter Schwartz",
      "address": "14 Garfield Rd, Monroe, NY",
      "locationDescription": "Dining Room / Basement",
      "lat": 41.3211,
      "long": -74.1822,
      "date": "2026-11-22"
    },
    "createdAt": "2026-11-09T06:40:00.000Z",
    "updatedAt": "2026-11-09T06:40:00.000Z",
    "__v": 0
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
    "lat": 40.6782,
    "long": -73.9442,
    "date": "2026-11-18",
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
    "_id": "672e1a2f9b1c2d0012340011",
    "category": "Tenoyim",
    "eventTitle": "David Cohen",
    "status": "pending",
    "createdBy": "672e18559b1c2d0012340000",
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
      "lat": 40.6782,
      "long": -73.9442,
      "date": "2026-11-18",
      "time": "20:00"
    },
    "createdAt": "2026-11-09T06:40:00.000Z",
    "updatedAt": "2026-11-09T06:40:00.000Z",
    "__v": 0
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
    "address": "550 Bedford Ave, Brooklyn, NY",
    "locationDescription": "Simcha Hall B",
    "lat": 40.7099,
    "long": -73.9567,
    "date": "2026-11-21"
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "_id": "672e1a2f9b1c2d0012340012",
    "category": "Shabbos Sheva Brachos",
    "eventTitle": "Rabbi Boruch Lefkowitz - Rabbi Alter Schwartz",
    "status": "pending",
    "createdBy": "672e18559b1c2d0012340000",
    "details": {
      "mechiten1Name": "Rabbi Boruch Lefkowitz",
      "mechiten2Name": "Rabbi Alter Schwartz",
      "address": "550 Bedford Ave, Brooklyn, NY",
      "locationDescription": "Simcha Hall B",
      "lat": 40.7099,
      "long": -73.9567,
      "date": "2026-11-21"
    },
    "createdAt": "2026-11-09T06:40:00.000Z",
    "updatedAt": "2026-11-09T06:40:00.000Z",
    "__v": 0
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
    "lat": 40.7018,
    "long": -73.9575,
    "date": "2026-11-25",
    "zmanShachris": "09:00"
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "_id": "672e1a2f9b1c2d0012340013",
    "category": "Pidyon Haben",
    "eventTitle": "Rabbi Menachem Goldstein",
    "status": "pending",
    "createdBy": "672e18559b1c2d0012340000",
    "details": {
      "fatherName": "Rabbi Menachem Goldstein",
      "fatherBenR": "Rabbi Yisroel Goldstein",
      "fatherChasanR": "Rabbi Chaim Weiss",
      "address": "10 Heyward St, Brooklyn, NY",
      "locationDescription": "Private Residence",
      "lat": 40.7018,
      "long": -73.9575,
      "date": "2026-11-25",
      "zmanShachris": "09:00"
    },
    "createdAt": "2026-11-09T06:40:00.000Z",
    "updatedAt": "2026-11-09T06:40:00.000Z",
    "__v": 0
  }
}
```

---

### 14. Zocher (Friday Night — No Date & Time)

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
    "lat": 40.7042,
    "long": -73.9555
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "_id": "672e1a2f9b1c2d0012340014",
    "category": "Zocher",
    "eventTitle": "Rabbi Menachem Goldstein",
    "status": "pending",
    "createdBy": "672e18559b1c2d0012340000",
    "details": {
      "fatherName": "Rabbi Menachem Goldstein",
      "fatherBenR": "Rabbi Yisroel Goldstein",
      "fatherChasanR": "Rabbi Chaim Weiss",
      "address": "120 Hewes St, Brooklyn, NY",
      "locationDescription": "Home of the grandparents",
      "lat": 40.7042,
      "long": -73.9555
    },
    "createdAt": "2026-11-09T06:40:00.000Z",
    "updatedAt": "2026-11-09T06:40:00.000Z",
    "__v": 0
  }
}
```

---

# 👤 User Profile Update with Address & Coordinates

* **Method:** `PATCH`
* **URL:** `{{BASE_URL}}/user/profile`
* **Authentication:** `Bearer Token` (Required)
* **Headers:**
  ```http
  Authorization: Bearer {{ACCESS_TOKEN}}
  Content-Type: application/json
  ```

**Request Body:**
```json
{
  "fullName": "Mendel Green",
  "phoneNumber": "+17185551234",
  "address": "120 Hewes St, Brooklyn, NY",
  "lat": 40.7042,
  "long": -73.9555
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "picture": "https://res.cloudinary.com/...",
    "fullName": "Mendel Green",
    "phoneNumber": "+17185551234",
    "address": "120 Hewes St, Brooklyn, NY",
    "lat": 40.7042,
    "long": -73.9555
  }
}

