export default {
  successful: {
    message: 'OK',
    accessToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoeWFtLmNoZW4iLCJpYXQiOjE2NzQwOTMxMzQsImV4cCI6MTY3NDA5NDMzNH0.Qd2XARFcMVjdITuAZKISU-zNIxrx1O5sfrFVci7LkQI`,
    refreshToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMmZlNzdjMzktNDRlMi00NDRhLTliN2QtMmYyOTk2YjYxMjc2IiwiaWF0IjoxNjc0MDkzMTM0LCJleHAiOjE2NzQxMzYzMzR9.67x8vrDc1K2qgtl6M4Kys2fP83_lr4lF8Ohiw5MqmUw`,
    otpEnabled: false,
    otpVerified: false,
  },
  failed: {
    error: 'Bad Request',
    message: '#password Wrong password. Try again or click Forgot password to reset it.',
    statusCode: 400,
  },
  successful_hasMFA: {
    message: 'OK',
    accessToken: '',
    refreshToken: '',
    otpEnabled: true,
    otpVerified: true,
  },
  successful_hasMFA_unverified: {
    accessToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoeWFtLmNoZW4iLCJpYXQiOjE2NzQwOTMxMzQsImV4cCI6MTY3NDA5NDMzNH0.Qd2XARFcMVjdITuAZKISU-zNIxrx1O5sfrFVci7LkQI`,
    refreshToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMmZlNzdjMzktNDRlMi00NDRhLTliN2QtMmYyOTk2YjYxMjc2IiwiaWF0IjoxNjc0MDkzMTM0LCJleHAiOjE2NzQxMzYzMzR9.67x8vrDc1K2qgtl6M4Kys2fP83_lr4lF8Ohiw5MqmUw`,
    otpEnabled: true,
    otpVerified: false,
  },
};
