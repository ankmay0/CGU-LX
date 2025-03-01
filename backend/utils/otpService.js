import twilio from "twilio";
import redis from "redis";

// Initialize Twilio client with your credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Initialize Redis client for temporary OTP storage
const otpCache = redis.createClient(); // Assumes Redis is running locally

// Generate a random 6-digit OTP
export const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store OTP in Redis (or use an in-memory store)
export const storeOtp = (phone, otp) => {
    otpCache.setex(phone, 300, otp); // OTP expires in 5 minutes (300 seconds)
};

// Check if OTP is valid
export const checkOtp = (phone, otp) => {
    return new Promise((resolve, reject) => {
        otpCache.get(phone, (err, storedOtp) => {
            if (err || !storedOtp) {
                reject("OTP expired or not found.");
            }
            resolve(storedOtp === otp);
        });
    });
};

// Send OTP via Twilio WhatsApp API
export const sendOtp = async (phoneNumber, otp) => {
    try {
      const message = await client.messages.create({
        body: `Your OTP is: ${otp}`,
        from: 'whatsapp:+14155238886',  // This is the Twilio sandbox WhatsApp number
        to: `whatsapp:${phoneNumber}`,
      });
  
      return { success: true, message: message };
    } catch (error) {
      console.error('Twilio Error:', error);
      return { success: false, error: error.message };
    }
  };
