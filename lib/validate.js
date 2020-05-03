module.exports = {
  // Define name validation function
  validateName: (name) => {
    const re = /^[a-zA-Z ._'\-]{2,30}$/;
    if (re.test(name)) {
      return true;
    } else {
      return "Invalid name. Names must be 2 to 30 characters long and can only contain letters and select special characters.";
    }
  },
  
  // Define salary validation function
  validateSalary: (salary) => {
    const re = /^\d{4,}$/;
    if (re.test(salary)) {
      return true;
    } else {
      return "Invalid salary. Salaries must be at least 4 characters long and can only contain numbers.";
    }
  }
};