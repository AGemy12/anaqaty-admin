export const nameRules = [
  (value) => {
    if (value) return true;
    return "يجب إدخال إسم المستخدم";
  },
  (value) => {
    if (value.length >= 3) return true;
    return "لا يجب ان يكون اقل من 3 احرف";
  },
];

export const emailRules = [
  (value) => {
    if (value) return true;
    return "يجب إدخال البريد الإلكتروني";
  },
  (value) => {
    const emailPattern = /^[a-zA-Z0-9]{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(value)) return true;
    return "يجب إدخال بريد إلكتروني صالح";
  },
];

export const passwordRules = [
  (value) => {
    if (value) return true;
    return "يجب إدخال كلمة المرور";
  },
  (value) => {
    if (value.length >= 6) return true;
    return "يجب ألا تقل كلمة المرور عن 6 أحرف";
  },
];
