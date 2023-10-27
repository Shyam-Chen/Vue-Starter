export type SignInForm = {
  username: string;
  password: string;
};

export type SignInRes = {
  message: string;
  accessToken: string;
  refreshToken: string;
  otpEnabled: boolean;
  otpVerified: boolean;
};

export type OtpValidateRes = {
  message: string;
  accessToken: string;
  refreshToken: string;
};
