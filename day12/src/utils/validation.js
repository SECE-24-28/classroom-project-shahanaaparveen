export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  return nameRegex.test(name.trim());
};

export const getPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^\w\s]/.test(password)) score++;
  
  if (score < 2) return 'weak';
  if (score < 4) return 'fair';
  if (score < 5) return 'good';
  return 'strong';
};

export const validateForm = (formData, fields) => {
  const errors = {};
  
  fields.forEach(field => {
    switch (field) {
      case 'email':
        if (!formData.email) {
          errors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
          errors.email = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!formData.phone) {
          errors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
          errors.phone = 'Phone number must be exactly 10 digits';
        } else if (!validatePhone(formData.phone)) {
          errors.phone = 'Phone number must start with 6, 7, 8, or 9';
        }
        break;
      case 'password':
        if (!formData.password) {
          errors.password = 'Password is required';
        } else if (!validatePassword(formData.password)) {
          errors.password = 'Password must be at least 6 characters long';
        }
        break;
      case 'name':
        if (!formData.name) {
          errors.name = 'Full name is required';
        } else if (!validateName(formData.name)) {
          errors.name = 'Name must be 2-50 characters and contain only letters';
        }
        break;
      case 'amount':
        if (!formData.amount) {
          errors.amount = 'Amount is required';
        } else if (isNaN(formData.amount) || formData.amount < 10) {
          errors.amount = 'Minimum recharge amount is ₹10';
        } else if (formData.amount > 10000) {
          errors.amount = 'Maximum recharge amount is ₹10,000';
        }
        break;
    }
  });
  
  return errors;
};

export const sanitizeInput = (input) => {
  return input.trim().replace(/[<>"'&]/g, '');
};

export const formatPhoneNumber = (phone) => {
  return phone.replace(/\D/g, '').slice(0, 10);
};