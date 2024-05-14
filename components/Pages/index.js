const baseURL = "http://192.168.1.5:8097";

const LoginURL = `${baseURL}/user/login`;
const createJobURL = `${baseURL}/create`;
const applyURL = `${baseURL}/apply`;
const userDataURL = `${baseURL}/user/complete/`;
const createUserURL = `${baseURL}/user/create`;
const searchURL = `${baseURL}/find?`;
const appliesList = `${baseURL}/myapplies`;
const overallURL = `${baseURL}/overall`;
const recruiterJobListURL = `${baseURL}/recruiter`;
const recruiterAppliesURL = `${baseURL}/applies`;
const replyURL = `${baseURL}/reply`;
const deactivateURL = `${baseURL}/deactivate`;

export {
  baseURL,
  LoginURL,
  createJobURL,
  applyURL,
  userDataURL,
  createUserURL,
  searchURL,
  appliesList,
  overallURL,
  recruiterJobListURL,
  deactivateURL,
  recruiterAppliesURL,
  replyURL
};
