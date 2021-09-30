export default class Validate {
    constructor(parameters) {}
  
    static register = (must = true) => ({
        firstName: {
        presence: must,
        type: "string",
      },
      lastName: {
        presence: must,
        type: "string",
      },
      phone: {
        presence: must,
        type: "string",
      },
      password: {
        presence: must,
        type: "string",
      },
    });
  
    static login = (must = true) => ({
      phone: {
        presence: must,
        type: "string",
      },
      password: {
        presence: must,
        type: "string",
      },
    });
  
    static forget = (must = true) => ({
      phone: {
        presence: must,
        type: "string",
      },
    });
  
    static verifyPassword = (must = true) => ({
      passwordOtp: {
        presence: must,
        type: "number",
      },
      newPassword: {
        presence: must,
        type: "string",
      },
    });
    static addStudent= (must = true) => ({
      firstName: {
      presence: must,
      type: "string",
    },
    lastName: {
      presence: must,
      type: "string",
    },
    email: {
      presence: must,
      email: true,
      type: "string",
    },
    password: {
      presence: must,
      type: "string",
    },
  });
  static loginStudent = (must = true) => ({
    email: {
      presence: must,
      email: true,
      type: "string",
    },
    password: {
      presence: must,
      type: "string",
    },
  });
  }