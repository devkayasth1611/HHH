const zod = require("zod");

const userValidation = zod.object({
  body: zod.object({
    fullName: zod
      .string()
      .max(50, "The maximum character of user name should be 50")
      .min(3, "The minimum character of user name should be 3"),
    email: zod
      .string()
      .email("Invalid email format") // Zod's built-in email validation
      .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(val), {
        message: "Email must be in a valid format.",
      }),
    password: zod
      .string() // Change from number to string
      .min(6, "Password must be at least 6 characters long."),
    confirmPassword: zod
      .string() // Change from number to string
      .min(6, "Password must be at least 6 characters long."),
    phoneNumber: zod.string().refine(
      (val) => {
        const indianPhoneNumberRegex = /^\+91\d{10}$/;
        return indianPhoneNumberRegex.test(val);
      },
      {
        message: "Invalid Indian phone number",
      }
    ),
    address: zod
      .string()
      .max(50, "The maximum character of address should be 50")
      .min(3, "The minimum character of address should be 3"),
  }),
});

module.exports = userValidation;
