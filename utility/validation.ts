export default class Validate {
  constructor(parameters) { }

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
  static addStudent = (must = true) => ({
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
  static course = (must = true) => ({
    name: {
      presence: must,
      type: "string",
    },
    admin: {
      presence: must,
      type: "number",
    },
  });
  static test = (must = true) => ({
    name: {
      presence: must,
      type: "string",
    },
    num_of_question: {
      presence: must,
      type: "number",
    },
    total_marks: {
      presence: must,
      type: "number",
    },
    mark_of_each_question: {
      presence: must,
      type: "number",
    },
    minutsOfExam: {
      presence: must,
      type: "number",
    },
    date: {
      presence: must,
      type: "string",
    },
    admin: {
      presence: must,
      type: "number",
    },
    course: {
      presence: must,
      type: "number",
    },
  });
  static testQuestion = (must = true) => ({
    qsn: {
      presence: must,
      type: "string",
    },
    optionA: {
      presence: must,
      type: "string",
    },
    optionB: {
      presence: must,
      type: "string",
    },
    optionC: {
      presence: must,
      type: "string",
    },
    optionD: {
      presence: must,
      type: "string",
    },
    right_answer: {
      presence: must,
      type: "string",
    },
    qsn_no: {
      presence: must,
      type: "number",
    },
    test: {
      presence: must,
      type: "number",
    },
  });
  static enrollCourse = (must = true) => ({
    courseId: {
      presence: must,
      type: "number",
    },
  })

  static taketest = (must = true) => ({
    // test: {
    //   presence: must,
    //   type: "number",
    // },
    answers: {
      type: "array",
    }

  })
  static checkQuestion = (must = false) => ({
    question: {
      presence: must,
      type: "number",
    },
    asnwer: {
      presence: must,
      type: "string",
    },

  });
  static result = (must = true) => ({
    test: {
      presence: must,
      type: "number",
    },
    user: {
      presence: must,
      type: "string",
    },

  });
}
