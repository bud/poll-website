1. User sign up: /user/sign_up
   request:

   ```json
   {
     "rcs_id": "id",
     "student_name": "username",
     "password": "password"
   }
   ```

   response:

   ```json
   {
   	"success": 1
   	"message": "Successfully signed up"
   }
   ```

2. User log in: /user/log_in
   request:

   ```json
   {
     "rcs_id": "id",
     "password": "password"
   }
   ```

   response:

   ```json
   {
     "success": "1",
     "message": "Login successful",
     "token": "eyJ0eXAiOiJKV1QiLCJhbGciOdJIUzPSbiJ9.eyJyY3NfaWQiOiJoZWo5iiwidGltZXN0YW1wIjonNjY4OTk0MTY5LjY5MjMwNH0.--2-o0lROzQyFrD62M11qpXCNF6EtdVt_P-6d03sSTs",
     "user": {
       "id": 3,
       "rcs_id": "id",
       "name": "username"
     }
   }
   ```

3. Create poll
