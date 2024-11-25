import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {

            "registration": "Registration & Booking at GoStudent",
            "platform": "The leading platform for online tutoring",
            "loginPhone": "Login Phone Number (preferably the parent's)",
            "contactPhone": "Contact Phone Number (preferably the student's)",
            "email": "Contact Email Address (preferably the parent's)",
            "name": "Contact Name",
            "billingAddress": "Billing Address",
            "postalCode": "Postal Code",
            "city": "City",
            "country": "Country",
            "sessions": "Monthly Sessions",
            "payInAdvance": "Pay in advance - EXTRA 5% DISCOUNT",
            "totalPrice": "Total P.M.",
            "discount": "Discount 4%",
            "acceptTerms": "I accept the Terms & Conditions",
            "orderNow": "Order Now",
            "successMessage": "Booking Successful! Your booking has been placed successfully!",
            "errorMessage": "There was an error submitting your booking. Please try again.",
            "andund": "and understand my",
            "terms": "terms",
            "withdrawal": "withdrawl",
            "acceptTerms2": "as well as the circumstances that lead to a repeal of the same."
        },
    },
    ar: {
        translation: {
            "registration": "التسجيل والحجز في GoStudent",
            "platform": "المنصة الرائدة للتدريس عبر الإنترنت",
            "loginPhone": "رقم الهاتف لتسجيل الدخول (يفضل أن يكون للهاتف الوالدين)",
            "contactPhone": "رقم الهاتف للتواصل (يفضل أن يكون للطالب)",
            "email": "عنوان البريد الإلكتروني للتواصل (يفضل أن يكون للوالدين)",
            "name": "اسم المتصل",
            "billingAddress": "عنوان الفاتورة",
            "postalCode": "الرمز البريدي",
            "city": "المدينة",
            "country": "البلد",
            "sessions": "الجلسات الشهرية",
            "payInAdvance": "الدفع مسبقًا - خصم إضافي 5%",
            "totalPrice": "إجمالي السعر الشهري",
            "discount": "الخصم 4%",
            "acceptTerms": "أوافق على الشروط والأحكام",
            "orderNow": "اطلب الآن",
            "successMessage": "تم الحجز بنجاح! تم إجراء الحجز بنجاح!",
            "errorMessage": "حدث خطأ أثناء تقديم الحجز. الرجاء المحاولة مرة أخرى.",
            "acceptTerms2": "بالإضافة إلى الظروف التي تؤدي إلى إلغاء نفس الشيء.",
            "andund": "وفهم",
            "terms": "الشروط والأحكام",
            "withdrawal": "حق السحب"
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

i18n.on('languageChanged', (lng) => {
    const isArabic = lng === 'ar';
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
});

export default i18n;
