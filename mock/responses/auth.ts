export default {
  'post_/sign-in': {
    accessToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoeWFtLmNoZW4iLCJpYXQiOjE2NzQwOTMxMzQsImV4cCI6MTY3NDA5NDMzNH0.Qd2XARFcMVjdITuAZKISU-zNIxrx1O5sfrFVci7LkQI`,
    refreshToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMmZlNzdjMzktNDRlMi00NDRhLTliN2QtMmYyOTk2YjYxMjc2IiwiaWF0IjoxNjc0MDkzMTM0LCJleHAiOjE2NzQxMzYzMzR9.67x8vrDc1K2qgtl6M4Kys2fP83_lr4lF8Ohiw5MqmUw`,
    otpEnabled: false,
    otpVerified: false,
  },
  'post_/sign-in_2fa': {
    accessToken: '',
    refreshToken: '',
    otpEnabled: true,
    otpVerified: true,
  },
  'post_/sign-in_2fa_unverified': {
    accessToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoeWFtLmNoZW4iLCJpYXQiOjE2NzQwOTMxMzQsImV4cCI6MTY3NDA5NDMzNH0.Qd2XARFcMVjdITuAZKISU-zNIxrx1O5sfrFVci7LkQI`,
    refreshToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMmZlNzdjMzktNDRlMi00NDRhLTliN2QtMmYyOTk2YjYxMjc2IiwiaWF0IjoxNjc0MDkzMTM0LCJleHAiOjE2NzQxMzYzMzR9.67x8vrDc1K2qgtl6M4Kys2fP83_lr4lF8Ohiw5MqmUw`,
    otpEnabled: true,
    otpVerified: false,
  },
  'post_/sign-in_error': {
    error: 'Bad Request',
    message: '#password Wrong password. Try again or click Forgot password to reset it.',
    statusCode: 400,
  },
  'post_/auth/otp/validate': {
    accessToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoeWFtLmNoZW4iLCJpYXQiOjE2NzQwOTMxMzQsImV4cCI6MTY3NDA5NDMzNH0.Qd2XARFcMVjdITuAZKISU-zNIxrx1O5sfrFVci7LkQI`,
    refreshToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMmZlNzdjMzktNDRlMi00NDRhLTliN2QtMmYyOTk2YjYxMjc2IiwiaWF0IjoxNjc0MDkzMTM0LCJleHAiOjE2NzQxMzYzMzR9.67x8vrDc1K2qgtl6M4Kys2fP83_lr4lF8Ohiw5MqmUw`,
  },
  'get_/user': {
    username: 'shyam.chen',
    fullName: 'Shyam Chen',
    email: 'shyam.chen@example.com',
  },
};
