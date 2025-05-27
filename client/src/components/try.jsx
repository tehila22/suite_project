

// // // // import React, { useState, useEffect, useContext } from "react";
// // // // import { useParams, useNavigate } from "react-router-dom";
// // // // import {
// // // //   Box,
// // // //   Button,
// // // //   TextField,
// // // //   Typography,
// // // //   CssBaseline,
// // // //   Container,
// // // //   Select,
// // // //   MenuItem,
// // // //   InputLabel,
// // // //   FormControl,
// // // //   Snackbar,
// // // //   Alert,
// // // // } from "@mui/material";
// // // // import axios from "axios";
// // // // import { UserContext } from "./Context";

// // // // export default function BookingForm() {
// // // //   const { id } = useParams();
// // // //   const navigate = useNavigate();
// // // //   const { currentUser } = useContext(UserContext);

// // // //   const [suite, setSuite] = useState(null);
// // // //   const [formData, setFormData] = useState({
// // // //     fullName: "",
// // // //     phone: "",
// // // //     checkInDate: "",
// // // //     checkOutDate: "",
// // // //     paymentMethod: "",
// // // //     cardNumber: "",
// // // //     cardExpiry: "",
// // // //     cardCvc: "",
// // // //   });

// // // //   const [errors, setErrors] = useState({});
// // // //   const [numNights, setNumNights] = useState(0);
// // // //   const [totalPrice, setTotalPrice] = useState(0);

// // // //   const [openSnackbar, setOpenSnackbar] = useState(false);
// // // //   const [bookingDetails, setBookingDetails] = useState(null);

// // // //   useEffect(() => {
// // // //     const fetchSuite = async () => {
// // // //       try {
// // // //         const res = await axios.get(`http://localhost:5000/suite/${id}`);
// // // //         setSuite(res.data);
// // // //       } catch (err) {
// // // //         console.error("Error fetching suite:", err);
// // // //       }
// // // //     };

// // // //     fetchSuite();
// // // //   }, [id]);

// // // //   useEffect(() => {
// // // //     calculateNightsAndPrice();
// // // //   }, [formData.checkInDate, formData.checkOutDate, suite]);

// // // //   const getTodayDate = () => {
// // // //     const today = new Date();
// // // //     return today.toISOString().split("T")[0];
// // // //   };

// // // //   const calculateNightsAndPrice = () => {
// // // //     const { checkInDate, checkOutDate } = formData;
// // // //     if (checkInDate && checkOutDate) {
// // // //       const inDate = new Date(checkInDate);
// // // //       const outDate = new Date(checkOutDate);
// // // //       const diffTime = outDate - inDate;
// // // //       const nights = diffTime / (1000 * 60 * 60 * 24);
// // // //       setNumNights(nights > 0 ? nights : 0);
// // // //       if (suite && suite.pricePerNight) {
// // // //         setTotalPrice(nights * suite.pricePerNight);
// // // //       }
// // // //     } else {
// // // //       setNumNights(0);
// // // //       setTotalPrice(0);
// // // //     }
// // // //   };

// // // //   const handleChange = (e) => {
// // // //     const { name, value } = e.target;

// // // //     if (name === "cardNumber") {
// // // //       const formattedCardNumber = value.replace(/\D/g, '').replace(/(.{4})(?=.)/g, '$1 ');
// // // //       setFormData((prev) => ({ ...prev, [name]: formattedCardNumber }));
// // // //     } else {
// // // //       setFormData((prev) => ({ ...prev, [name]: value }));
// // // //     }

// // // //     setErrors((prev) => ({ ...prev, [name]: "" }));
// // // //   };

// // // //   const validateDates = () => {
// // // //     const { checkInDate, checkOutDate } = formData;
// // // //     const checkIn = new Date(checkInDate);
// // // //     const checkOut = new Date(checkOutDate);
// // // //     const today = new Date();
// // // //     today.setHours(0, 0, 0, 0);

// // // //     let newErrors = {};

// // // //     if (!checkInDate) newErrors.checkInDate = "יש לבחור תאריך כניסה";
// // // //     else if (checkIn < today) newErrors.checkInDate = "תאריך הכניסה לא יכול להיות בעבר";

// // // //     if (!checkOutDate) newErrors.checkOutDate = "יש לבחור תאריך יציאה";
// // // //     else if (checkOut <= checkIn) newErrors.checkOutDate = "תאריך היציאה חייב להיות אחרי תאריך הכניסה";

// // // //     return newErrors;
// // // //   };

// // // //   const isValidLuhn = (number) => {
// // // //     let sum = 0;
// // // //     let shouldDouble = false;
// // // //     for (let i = number.length - 1; i >= 0; i--) {
// // // //       let digit = parseInt(number[i]);
// // // //       if (shouldDouble) {
// // // //         digit *= 2;
// // // //         if (digit > 9) digit -= 9;
// // // //       }
// // // //       sum += digit;
// // // //       shouldDouble = !shouldDouble;
// // // //     }
// // // //     return sum % 10 === 0;
// // // //   };

// // // //   const validatePayment = () => {
// // // //     const { paymentMethod, cardNumber, cardExpiry, cardCvc } = formData;
// // // //     let newErrors = {};

// // // //     if (!paymentMethod) {
// // // //       newErrors.paymentMethod = "יש לבחור אמצעי תשלום";
// // // //     } else if (paymentMethod === "creditCard") {
// // // //       const cardNumberRegex = /^\d{16}$/;
// // // //       if (!cardNumber) {
// // // //         newErrors.cardNumber = "יש להזין מספר כרטיס אשראי";
// // // //       } else if (!cardNumberRegex.test(cardNumber.replace(/\s/g, ''))) {
// // // //         newErrors.cardNumber = "מספר הכרטיס חייב להכיל 16 ספרות";
// // // //       } else if (!isValidLuhn(cardNumber.replace(/\s/g, ''))) {
// // // //         newErrors.cardNumber = "מספר הכרטיס אינו תקף (בדיקת Luhn נכשלה)";
// // // //       }

// // // //       const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
// // // //       if (!cardExpiry) {
// // // //         newErrors.cardExpiry = "יש להזין תוקף כרטיס";
// // // //       } else if (!expiryRegex.test(cardExpiry)) {
// // // //         newErrors.cardExpiry = "תוקף הכרטיס בפורמט שגוי (נדרש MM/YY)";
// // // //       } else {
// // // //         const [expMonth, expYear] = cardExpiry.split("/");
// // // //         const expiryDate = new Date(`20${expYear}`, parseInt(expMonth));
// // // //         const now = new Date();
// // // //         if (expiryDate <= now) {
// // // //           newErrors.cardExpiry = "תוקף הכרטיס פג";
// // // //         }
// // // //       }

// // // //       const cvcRegex = /^\d{3,4}$/;
// // // //       if (!cardCvc) {
// // // //         newErrors.cardCvc = "יש להזין CVC";
// // // //       } else if (!cvcRegex.test(cardCvc)) {
// // // //         newErrors.cardCvc = "CVC חייב להיות בן 3 או 4 ספרות";
// // // //       }
// // // //     }

// // // //     return newErrors;
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();

// // // //     if (!currentUser) {
// // // //       alert("חייבים להתחבר כדי לבצע הזמנה.");
// // // //       return;
// // // //     }

// // // //     const dateErrors = validateDates();
// // // //     const paymentErrors = validatePayment();
// // // //     const allErrors = { ...dateErrors, ...paymentErrors };

// // // //     if (Object.keys(allErrors).length > 0) {
// // // //       setErrors(allErrors);
// // // //       return;
// // // //     }

// // // //     const booking = {
// // // //       suiteId: id,
// // // //       userId: currentUser._id,
// // // //       ...formData,
// // // //       numNights,
// // // //       totalPrice,
// // // //     };

// // // //     try {
// // // //       const res = await axios.post("http://localhost:5000/booking", booking);
// // // //       if (res.status === 200 || res.status === 201) {
// // // //         setBookingDetails(booking);  // שמירת פרטי ההזמנה
// // // //         setOpenSnackbar(true);  // הצגת ה-Snackbar
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error submitting booking:", error);
// // // //       alert("אירעה שגיאה בעת ביצוע ההזמנה.");
// // // //     }
// // // //   };

// // // //   const handleSnackbarClose = () => {
// // // //     setOpenSnackbar(false);
// // // //     navigate("/show-suites");  // ניווט לאחר סיום ההזמנה
// // // //   };

// // // //   if (!suite) return <Typography>טוען פרטי צימר...</Typography>;

// // // //   return (
// // // //     <>
// // // //       <div
// // // //         style={{
// // // //           position: 'fixed',
// // // //           top: 0,
// // // //           left: 0,
// // // //           width: '100%',
// // // //           height: '100vh',
// // // //           backgroundImage: `url(${process.env.PUBLIC_URL}/images/nof4.jpg)`,
// // // //           backgroundSize: 'cover',
// // // //           backgroundPosition: 'center',
// // // //           opacity: 0.2,
// // // //           zIndex: -1
// // // //         }}
// // // //       ></div>

// // // //       <CssBaseline />
// // // //       <Container
// // // //         component="main"
// // // //         maxWidth="xs"
// // // //         style={{
// // // //           backgroundColor: 'white',
// // // //           padding: '32px',
// // // //           borderRadius: '8px',
// // // //           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
// // // //           position: 'relative',
// // // //           top: '144px',
// // // //         }}
// // // //       >
// // // //         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
// // // //           <Typography component="h1" variant="h5" gutterBottom align="center">
// // // //             טופס הזמנת צימר - {suite.name}
// // // //           </Typography>

// // // //           <form onSubmit={handleSubmit} style={{ width: '100%' }}>
// // // //             <TextField
// // // //               label="שם מלא"
// // // //               name="fullName"
// // // //               value={formData.fullName}
// // // //               onChange={handleChange}
// // // //               fullWidth
// // // //               required
// // // //               sx={{ mb: 2 }}
// // // //               inputProps={{ dir: "rtl" }}
// // // //             />
// // // //             <TextField
// // // //               label="טלפון"
// // // //               name="phone"
// // // //               value={formData.phone}
// // // //               onChange={handleChange}
// // // //               fullWidth
// // // //               required
// // // //               sx={{ mb: 2 }}
// // // //               inputProps={{ dir: "rtl" }}
// // // //             />
// // // //             <TextField
// // // //               label="תאריך כניסה"
// // // //               name="checkInDate"
// // // //               type="date"
// // // //               value={formData.checkInDate}
// // // //               onChange={handleChange}
// // // //               fullWidth
// // // //               required
// // // //               error={!!errors.checkInDate}
// // // //               helperText={errors.checkInDate}
// // // //               sx={{ mb: 2 }}
// // // //               InputLabelProps={{ shrink: true }}
// // // //               inputProps={{ dir: "rtl", min: getTodayDate() }}
// // // //             />
// // // //             <TextField
// // // //               label="תאריך יציאה"
// // // //               name="checkOutDate"
// // // //               type="date"
// // // //               value={formData.checkOutDate}
// // // //               onChange={handleChange}
// // // //               fullWidth
// // // //               required
// // // //               error={!!errors.checkOutDate}
// // // //               helperText={errors.checkOutDate}
// // // //               sx={{ mb: 3 }}
// // // //               InputLabelProps={{ shrink: true }}
// // // //               inputProps={{ dir: "rtl", min: formData.checkInDate || getTodayDate() }}
// // // //             />

// // // //             <FormControl fullWidth required sx={{ mb: 3 }}>
// // // //               <InputLabel>אמצעי תשלום</InputLabel>
// // // //               <Select
// // // //                 label="אמצעי תשלום"
// // // //                 name="paymentMethod"
// // // //                 value={formData.paymentMethod}
// // // //                 onChange={handleChange}
// // // //               >
// // // //                 <MenuItem value="creditCard">כרטיס אשראי</MenuItem>
// // // //                 <MenuItem value="paypal">פייפאל</MenuItem>
// // // //               </Select>
// // // //             </FormControl>

// // // //             {formData.paymentMethod === "creditCard" && (
// // // //               <>
// // // //                 <TextField
// // // //                   label="מספר כרטיס אשראי"
// // // //                   name="cardNumber"
// // // //                   value={formData.cardNumber}
// // // //                   onChange={handleChange}
// // // //                   fullWidth
// // // //                   required
// // // //                   error={!!errors.cardNumber}
// // // //                   helperText={errors.cardNumber}
// // // //                   sx={{ mb: 2 }}
// // // //                 />
// // // //                 <TextField
// // // //                   label="תוקף כרטיס (MM/YY)"
// // // //                   name="cardExpiry"
// // // //                   value={formData.cardExpiry}
// // // //                   onChange={handleChange}
// // // //                   fullWidth
// // // //                   required
// // // //                   error={!!errors.cardExpiry}
// // // //                   helperText={errors.cardExpiry}
// // // //                   placeholder="MM/YY"
// // // //                   sx={{ mb: 2 }}
// // // //                 />
// // // //                 <TextField
// // // //                   label="CVC"
// // // //                   name="cardCvc"
// // // //                   value={formData.cardCvc}
// // // //                   onChange={handleChange}
// // // //                   fullWidth
// // // //                   required
// // // //                   error={!!errors.cardCvc}
// // // //                   helperText={errors.cardCvc}
// // // //                   sx={{ mb: 3 }}
// // // //                 />
// // // //               </>
// // // //             )}

// // // //             {numNights > 0 && (
// // // //               <Box sx={{ mb: 3, textAlign: 'right' }}>
// // // //                                 <Typography variant="body1">סה"כ לילות: {numNights}</Typography>
// // // //                 <Typography variant="body1">מחיר ללילה: ₪{suite.nightPrice}</Typography>
// // // //                 <Typography variant="h6" fontWeight="bold">סה"כ לתשלום: ₪{numNights*suite.nightPrice}</Typography>

// // // //               </Box>
// // // //             )}

// // // //             <Button type="submit" variant="contained" color="primary" fullWidth>
// // // //               אשר הזמנה
// // // //             </Button>
// // // //           </form>
// // // //         </Box>
// // // //       </Container>

// // // //       {/* Snackbar Alert */}
// // // //       <Snackbar
// // // //         open={openSnackbar}
// // // //         autoHideDuration={6000}
// // // //         onClose={handleSnackbarClose}
// // // //       >
// // // //         <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
// // // //           <Typography variant="h6">ההזמנה בוצעה בהצלחה!</Typography>
// // // //           <Typography variant="body2">שם: {formData.fullName}</Typography>
// // // //           <Typography variant="body2">טלפון: {formData.phone}</Typography>
// // // //           <Typography variant="body2">תאריך כניסה: {formData.checkInDate}</Typography>
// // // //           <Typography variant="body2">תאריך יציאה: {formData.checkOutDate}</Typography>
// // // //           <Typography variant="body1">סה"כ לילות: {numNights}</Typography>
// // // //                 <Typography variant="body1">מחיר ללילה: ₪{suite.nightPrice}</Typography>
// // // //                 <Typography variant="h6" fontWeight="bold">סה"כ לתשלום: ₪{numNights*suite.nightPrice}</Typography>

// // // //         </Alert>
// // // //       </Snackbar>
// // // //     </>
// // // //   );
// // // // }
// // // // import React, { useState, useEffect, useContext } from "react";
// // // // import { useParams, useNavigate } from "react-router-dom";
// // // // import {
// // // //   Box,
// // // //   Button,
// // // //   TextField,
// // // //   Typography,
// // // //   CssBaseline,
// // // //   Container,
// // // //   Select,
// // // //   MenuItem,
// // // //   InputLabel,
// // // //   FormControl,
// // // //   Snackbar,
// // // //   Alert,
// // // // } from "@mui/material";
// // // // import axios from "axios";
// // // // import { UserContext } from "./Context";
// // // // import { jsPDF } from "jspdf";
// // // // import "jspdf-autotable";

// // // // export default function BookingForm() {
// // // //   const { id } = useParams();
// // // //   const navigate = useNavigate();
// // // //   const { currentUser } = useContext(UserContext);

// // // //   const [suite, setSuite] = useState(null);
// // // //   const [formData, setFormData] = useState({
// // // //     fullName: "",
// // // //     phone: "",
// // // //     checkInDate: "",
// // // //     checkOutDate: "",
// // // //     paymentMethod: "",
// // // //     cardNumber: "",
// // // //     cardExpiry: "",
// // // //     cardCvc: "",
// // // //   });

// // // //   const [errors, setErrors] = useState({});
// // // //   const [numNights, setNumNights] = useState(0);
// // // //   const [totalPrice, setTotalPrice] = useState(0);

// // // //   const [openSnackbar, setOpenSnackbar] = useState(false);
// // // //   const [bookingDetails, setBookingDetails] = useState(null);

// // // //   useEffect(() => {
// // // //     const fetchSuite = async () => {
// // // //       try {
// // // //         const res = await axios.get(`http://localhost:5000/suite/${id}`);
// // // //         setSuite(res.data);
// // // //       } catch (err) {
// // // //         console.error("Error fetching suite:", err);
// // // //       }
// // // //     };

// // // //     fetchSuite();
// // // //   }, [id]);

// // // //   useEffect(() => {
// // // //     calculateNightsAndPrice();
// // // //   }, [formData.checkInDate, formData.checkOutDate, suite]);

// // // //   const getTodayDate = () => {
// // // //     const today = new Date();
// // // //     return today.toISOString().split("T")[0];
// // // //   };

// // // //   const calculateNightsAndPrice = () => {
// // // //     const { checkInDate, checkOutDate } = formData;
// // // //     if (checkInDate && checkOutDate) {
// // // //       const inDate = new Date(checkInDate);
// // // //       const outDate = new Date(checkOutDate);
// // // //       const diffTime = outDate - inDate;
// // // //       const nights = diffTime / (1000 * 60 * 60 * 24);
// // // //       setNumNights(nights > 0 ? nights : 0);
// // // //       if (suite && suite.pricePerNight) {
// // // //         setTotalPrice(nights * suite.pricePerNight);
// // // //       }
// // // //     } else {
// // // //       setNumNights(0);
// // // //       setTotalPrice(0);
// // // //     }
// // // //   };

// // // //   const handleChange = (e) => {
// // // //     const { name, value } = e.target;

// // // //     if (name === "cardNumber") {
// // // //       const formattedCardNumber = value.replace(/\D/g, '').replace(/(.{4})(?=.)/g, '$1 ');
// // // //       setFormData((prev) => ({ ...prev, [name]: formattedCardNumber }));
// // // //     } else {
// // // //       setFormData((prev) => ({ ...prev, [name]: value }));
// // // //     }

// // // //     setErrors((prev) => ({ ...prev, [name]: "" }));
// // // //   };

// // // //   const validateDates = () => {
// // // //     const { checkInDate, checkOutDate } = formData;
// // // //     const checkIn = new Date(checkInDate);
// // // //     const checkOut = new Date(checkOutDate);
// // // //     const today = new Date();
// // // //     today.setHours(0, 0, 0, 0);

// // // //     let newErrors = {};

// // // //     if (!checkInDate) newErrors.checkInDate = "יש לבחור תאריך כניסה";
// // // //     else if (checkIn < today) newErrors.checkInDate = "תאריך הכניסה לא יכול להיות בעבר";

// // // //     if (!checkOutDate) newErrors.checkOutDate = "יש לבחור תאריך יציאה";
// // // //     else if (checkOut <= checkIn) newErrors.checkOutDate = "תאריך היציאה חייב להיות אחרי תאריך הכניסה";

// // // //     return newErrors;
// // // //   };

// // // //   const isValidLuhn = (number) => {
// // // //     let sum = 0;
// // // //     let shouldDouble = false;
// // // //     for (let i = number.length - 1; i >= 0; i--) {
// // // //       let digit = parseInt(number[i]);
// // // //       if (shouldDouble) {
// // // //         digit *= 2;
// // // //         if (digit > 9) digit -= 9;
// // // //       }
// // // //       sum += digit;
// // // //       shouldDouble = !shouldDouble;
// // // //     }
// // // //     return sum % 10 === 0;
// // // //   };

// // // //   const validatePayment = () => {
// // // //     const { paymentMethod, cardNumber, cardExpiry, cardCvc } = formData;
// // // //     let newErrors = {};

// // // //     if (!paymentMethod) {
// // // //       newErrors.paymentMethod = "יש לבחור אמצעי תשלום";
// // // //     } else if (paymentMethod === "creditCard") {
// // // //       const cardNumberRegex = /^\d{16}$/;
// // // //       if (!cardNumber) {
// // // //         newErrors.cardNumber = "יש להזין מספר כרטיס אשראי";
// // // //       } else if (!cardNumberRegex.test(cardNumber.replace(/\s/g, ''))) {
// // // //         newErrors.cardNumber = "מספר הכרטיס חייב להכיל 16 ספרות";
// // // //       } else if (!isValidLuhn(cardNumber.replace(/\s/g, ''))) {
// // // //         newErrors.cardNumber = "מספר הכרטיס אינו תקף (בדיקת Luhn נכשלה)";
// // // //       }

// // // //       const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
// // // //       if (!cardExpiry) {
// // // //         newErrors.cardExpiry = "יש להזין תוקף כרטיס";
// // // //       } else if (!expiryRegex.test(cardExpiry)) {
// // // //         newErrors.cardExpiry = "תוקף הכרטיס בפורמט שגוי (נדרש MM/YY)";
// // // //       } else {
// // // //         const [expMonth, expYear] = cardExpiry.split("/");
// // // //         const expiryDate = new Date(`20${expYear}`, parseInt(expMonth));
// // // //         const now = new Date();
// // // //         if (expiryDate <= now) {
// // // //           newErrors.cardExpiry = "תוקף הכרטיס פג";
// // // //         }
// // // //       }

// // // //       const cvcRegex = /^\d{3,4}$/;
// // // //       if (!cardCvc) {
// // // //         newErrors.cardCvc = "יש להזין CVC";
// // // //       } else if (!cvcRegex.test(cardCvc)) {
// // // //         newErrors.cardCvc = "CVC חייב להיות בן 3 או 4 ספרות";
// // // //       }
// // // //     }

// // // //     return newErrors;
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();

// // // //     if (!currentUser) {
// // // //       alert("חייבים להתחבר כדי לבצע הזמנה.");
// // // //       return;
// // // //     }

// // // //     const dateErrors = validateDates();
// // // //     const paymentErrors = validatePayment();
// // // //     const allErrors = { ...dateErrors, ...paymentErrors };

// // // //     if (Object.keys(allErrors).length > 0) {
// // // //       setErrors(allErrors);
// // // //       return;
// // // //     }

// // // //     const booking = {
// // // //       suiteId: id,
// // // //       userId: currentUser._id,
// // // //       ...formData,
// // // //       numNights,
// // // //       totalPrice,
// // // //     };

// // // //     try {
// // // //       const res = await axios.post("http://localhost:5000/booking", booking);
// // // //       if (res.status === 200 || res.status === 201) {
// // // //         setBookingDetails(booking);  // שמירת פרטי ההזמנה
// // // //         setOpenSnackbar(true);  // הצגת ה-Snackbar
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error submitting booking:", error);
// // // //       alert("אירעה שגיאה בעת ביצוע ההזמנה.");
// // // //     }
// // // //   };

// // // //   const generatePDF = () => {
// // // //     const doc = new jsPDF();
// // // //     doc.setFont("Helvetica", "normal");

// // // //     doc.text("ההזמנה בוצעה בהצלחה!", 14, 20);
// // // //     doc.text(`שם: ${formData.fullName}`, 14, 30);
// // // //     doc.text(`טלפון: ${formData.phone}`, 14, 40);
// // // //     doc.text(`תאריך כניסה: ${formData.checkInDate}`, 14, 50);
// // // //     doc.text(`תאריך יציאה: ${formData.checkOutDate}`, 14, 60);
// // // //     doc.text(`סה"כ לילות: ${numNights}`, 14, 70);
// // // //     doc.text(`מחיר: ${totalPrice} ש"ח`, 14, 80);

// // // //     // הוספת תמונה של הצימר אם יש
// // // //     if (suite && suite.image) {
// // // //       const imageUrl = suite.image;  // כתובת התמונה של הצימר
// // // //       doc.addImage(imageUrl, "JPEG", 14, 90, 180, 120);  // גודל התמונה ב-PDF
// // // //     }

// // // //     doc.save("הזמנה.pdf");
// // // //   };

// // // //   const handleSnackbarClose = () => {
// // // //     setOpenSnackbar(false);
// // // //     navigate("/show-suites");  // ניווט לאחר סיום ההזמנה
// // // //   };

// // // //   if (!suite) return <Typography>טוען פרטי צימר...</Typography>;

// // // //   return (
// // // //     <>
// // // //       <div
// // // //         style={{
// // // //           position: 'fixed',
// // // //           top: 0,
// // // //           left: 0,
// // // //           width: '100%',
// // // //           height: '100vh',
// // // //           backgroundImage: `url(${process.env.PUBLIC_URL}/images/nof4.jpg)`,
// // // //           backgroundSize: 'cover',
// // // //           backgroundPosition: 'center',
// // // //           opacity: 0.2,
// // // //           zIndex: -1
// // // //         }}
// // // //       ></div>

// // // //       <CssBaseline />
// // // //       <Container
// // // //         component="main"
// // // //         maxWidth="xs"
// // // //         style={{
// // // //           backgroundColor: 'white',
// // // //           padding: '32px',
// // // //           borderRadius: '8px',
// // // //           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
// // // //           position: 'relative',
// // // //           top: '144px',
// // // //         }}
// // // //       >
// // // //         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
// // // //           <Typography component="h1" variant="h5" gutterBottom align="center">
// // // //             טופס הזמנת צימר - {suite.name}
// // // //           </Typography>

// // // //           <form onSubmit={handleSubmit} style={{ width: '100%' }}>
// // // //             <TextField
// // // //               label="שם מלא"
// // // //               name="fullName"
// // // //               value={formData.fullName}
// // // //               onChange={handleChange}
// // // //               fullWidth
// // // //               required
// // // //               sx={{ mb: 2 }}
// // // //               inputProps={{ dir: "rtl" }}
// // // //             />
// // // //             <TextField
// // // //               label="טלפון"
// // // //               name="phone"
// // // //               value={formData.phone}
// // // //               onChange={handleChange}
// // // //               fullWidth
// // // //               required
// // // //               sx={{ mb: 2 }}
// // // //               inputProps={{ dir: "rtl" }}
// // // //             />
// // // //             <TextField
// // // //               label="תאריך כניסה"
// // // //               name="checkInDate"
// // // //               type="date"
// // // //               value={formData.checkInDate}
// // // //               onChange={handleChange}
// // // //               fullWidth
// // // //               required
// // // //               error={!!errors.checkInDate}
// // // //               helperText={errors.checkInDate}
// // // //               sx={{ mb: 2 }}
// // // //               InputLabelProps={{ shrink: true }}
// // // //               inputProps={{ dir: "rtl", min: getTodayDate() }}
// // // //             />
// // // //             <TextField
// // // //               label="תאריך יציאה"
// // // //               name="checkOutDate"
// // // //               type="date"
// // // //               value={formData.checkOutDate}
// // // //               onChange={handleChange}
// // // //               fullWidth
// // // //               required
// // // //               error={!!errors.checkOutDate}
// // // //               helperText={errors.checkOutDate}
// // // //               sx={{ mb: 3 }}
// // // //               InputLabelProps={{ shrink: true }}
// // // //               inputProps={{ dir: "rtl", min: formData.checkInDate || getTodayDate() }}
// // // //             />

// // // //             <FormControl fullWidth required sx={{ mb: 3 }}>
// // // //               <InputLabel>אמצעי תשלום</InputLabel>
// // // //               <Select
// // // //                 label="אמצעי תשלום"
// // // //                 name="paymentMethod"
// // // //                 value={formData.paymentMethod}
// // // //                 onChange={handleChange}
// // // //               >
// // // //                 <MenuItem value="creditCard">כרטיס אשראי</MenuItem>
// // // //                 <MenuItem value="paypal">פייפאל</MenuItem>
// // // //               </Select>
// // // //             </FormControl>

// // // //             {formData.paymentMethod === "creditCard" && (
// // // //               <>
// // // //                 <TextField
// // // //                   label="מספר כרטיס אשראי"
// // // //                   name="cardNumber"
// // // //                   value={formData.cardNumber}
// // // //                   onChange={handleChange}
// // // //                   fullWidth
// // // //                   required
// // // //                   error={!!errors.cardNumber}
// // // //                   helperText={errors.cardNumber}
// // // //                   sx={{ mb: 2 }}
// // // //                 />
// // // //                 <TextField
// // // //                   label="תוקף כרטיס (MM/YY)"
// // // //                   name="cardExpiry"
// // // //                   value={formData.cardExpiry}
// // // //                   onChange={handleChange}
// // // //                   fullWidth
// // // //                   required
// // // //                   error={!!errors.cardExpiry}
// // // //                   helperText={errors.cardExpiry}
// // // //                   placeholder="MM/YY"
// // // //                   sx={{ mb: 2 }}
// // // //                 />
// // // //                 <TextField
// // // //                   label="CVC"
// // // //                   name="cardCvc"
// // // //                   value={formData.cardCvc}
// // // //                   onChange={handleChange}
// // // //                   fullWidth
// // // //                   required
// // // //                   error={!!errors.cardCvc}
// // // //                   helperText={errors.cardCvc}
// // // //                   sx={{ mb: 3 }}
// // // //                 />
// // // //               </>
// // // //             )}

// // // //             {numNights > 0 && (
// // // //               <Box sx={{ mb: 3, textAlign: 'right' }}>
// // // //                  <Typography variant="body1">סה"כ לילות: {numNights}</Typography>
// // // //                 <Typography variant="body1">מחיר ללילה: ₪{suite.nightPrice}</Typography>
// // // //                 <Typography variant="h6" fontWeight="bold">סה"כ לתשלום: ₪{numNights*suite.nightPrice}</Typography>
// // // //               </Box>
// // // //             )}

// // // //             <Button type="submit" variant="contained" color="primary" fullWidth>
// // // //               אשר הזמנה
// // // //             </Button>
// // // //           </form>
// // // //         </Box>
// // // //       </Container>

// // // //       {/* Snackbar Alert */}
// // // //       <Snackbar
// // // //         open={openSnackbar}
// // // //         autoHideDuration={6000}
// // // //         onClose={handleSnackbarClose}
// // // //       >
// // // //         <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
// // // //           <Typography variant="h6">ההזמנה בוצעה בהצלחה!</Typography>
// // // //           <Typography variant="body2">שם: {formData.fullName}</Typography>
// // // //           <Typography variant="body2">טלפון: {formData.phone}</Typography>
// // // //           <Typography variant="body2">תאריך כניסה: {formData.checkInDate}</Typography>
// // // //           <Typography variant="body2">תאריך יציאה: {formData.checkOutDate}</Typography>
// // // //           <Typography variant="body1">סה"כ לילות: {numNights}</Typography>
// // // //                 <Typography variant="body1">מחיר ללילה: ₪{suite.nightPrice}</Typography>
// // // //                 <Typography variant="h6" fontWeight="bold">סה"כ לתשלום: ₪{numNights*suite.nightPrice}</Typography>
// // // //         </Alert>
// // // //       </Snackbar>

// // // //       {/* כפתור ליצירת קובץ PDF */}
// // // //       {openSnackbar && (
// // // //         <Button 
// // // //           variant="contained" 
// // // //           color="primary" 
// // // //           fullWidth 
// // // //           onClick={generatePDF} 
// // // //           sx={{ mt: 2 }}
// // // //         >
// // // //           הורד את קובץ ה-PDF
// // // //         </Button>
// // // //       )}
// // // //     </>
// // // //   );
// // // // }



import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  CssBaseline,
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { UserContext } from "./Context";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
export default function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [suite, setSuite] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    checkInDate: "",
    checkOutDate: "",
    paymentMethod: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });
  const [errors, setErrors] = useState({});
  const [numNights, setNumNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  useEffect(() => {
    const fetchSuite = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/suite/${id}`);
        setSuite(res.data);
      } catch (err) {
        console.error("Error fetching suite:", err);
      }
    };
    fetchSuite();
  }, [id]);
  useEffect(() => {
    calculateNightsAndPrice();
  }, [formData.checkInDate, formData.checkOutDate, suite]);
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };
  const calculateNightsAndPrice = () => {
    const { checkInDate, checkOutDate } = formData;
    if (checkInDate && checkOutDate) {
      const inDate = new Date(checkInDate);
      const outDate = new Date(checkOutDate);
      const diffTime = outDate - inDate;
      const nights = diffTime / (1000 * 60 * 60 * 24);
      setNumNights(nights > 0 ? nights : 0);
      if (suite?.nightPrice) {
        setTotalPrice(nights * suite.nightPrice);
      }
    } else {
      setNumNights(0);
      setTotalPrice(0);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cardNumber") {
      const formattedCardNumber = value.replace(/\D/g, '').replace(/(.{4})(?=.)/g, '$1 ');
      setFormData((prev) => ({ ...prev, [name]: formattedCardNumber }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const validateDates = () => {
    const { checkInDate, checkOutDate } = formData;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let newErrors = {};
    if (!checkInDate) newErrors.checkInDate = "יש לבחור תאריך כניסה";
    else if (checkIn < today) newErrors.checkInDate = "תאריך הכניסה לא יכול להיות בעבר";
    if (!checkOutDate) newErrors.checkOutDate = "יש לבחור תאריך יציאה";
    else if (checkOut <= checkIn) newErrors.checkOutDate = "תאריך היציאה חייב להיות אחרי תאריך הכניסה";
    return newErrors;
  };
  const isValidLuhn = (number) => {
    let sum = 0;
    let shouldDouble = false;
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number[i]);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };
  const validatePayment = () => {
    const { paymentMethod, cardNumber, cardExpiry, cardCvc } = formData;
    let newErrors = {};
    if (!paymentMethod) {
      newErrors.paymentMethod = "יש לבחור אמצעי תשלום";
    } else if (paymentMethod === "creditCard") {
      const cardNumberRegex = /^\d{16}$/;
      if (!cardNumber) newErrors.cardNumber = "יש להזין מספר כרטיס אשראי";
      else if (!cardNumberRegex.test(cardNumber.replace(/\s/g, '')))
        newErrors.cardNumber = "מספר הכרטיס חייב להכיל 16 ספרות";
      else if (!isValidLuhn(cardNumber.replace(/\s/g, '')))
        newErrors.cardNumber = "מספר הכרטיס אינו תקף (בדיקת Luhn נכשלה)";
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (!cardExpiry) newErrors.cardExpiry = "יש להזין תוקף כרטיס";
      else if (!expiryRegex.test(cardExpiry)) newErrors.cardExpiry = "תוקף הכרטיס בפורמט שגוי (נדרש MM/YY)";
      else {
        const [expMonth, expYear] = cardExpiry.split("/");
        const expiryDate = new Date(`20${expYear}`, parseInt(expMonth));
        const now = new Date();
        if (expiryDate <= now) newErrors.cardExpiry = "תוקף הכרטיס פג";
      }
      const cvcRegex = /^\d{3,4}$/;
      if (!cardCvc) newErrors.cardCvc = "יש להזין CVC";
      else if (!cvcRegex.test(cardCvc)) newErrors.cardCvc = "CVC חייב להיות בן 3 או 4 ספרות";
    }
    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("חייבים להתחבר כדי לבצע הזמנה.");
      return;
    }
    const dateErrors = validateDates();
    const paymentErrors = validatePayment();
    const allErrors = { ...dateErrors, ...paymentErrors };
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      return;
    }
    const booking = {
      suiteId: id,
      userId: currentUser._id,
      ...formData,
      numNights,
      totalPrice,
    };
    try {
      const res = await axios.post("http://localhost:5000/booking", booking);
      if (res.status === 200 || res.status === 201) {
        setBookingDetails(booking);
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("אירעה שגיאה בעת ביצוע ההזמנה.");
    }
  };
  const getBase64FromUrl = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  const generatePDF = async () => {
    const doc = new jsPDF();
    doc.setFont("Helvetica", "normal");
    doc.text("ההזמנה בוצעה בהצלחה!", 14, 20);
    doc.text(`שם: ${formData.fullName}`, 14, 30);
    doc.text(`טלפון: ${formData.phone}`, 14, 40);
    doc.text(`תאריך כניסה: ${formData.checkInDate}`, 14, 50);
    doc.text(`תאריך יציאה: ${formData.checkOutDate}`, 14, 60);
    doc.text(`סה\"כ לילות: ${numNights}`, 14, 70);
    doc.text(`מחיר כולל: ${totalPrice} ש\"ח`, 14, 80);
    if (suite?.image) {
      try {
        const imageData = await getBase64FromUrl(suite.image);
        doc.addImage(imageData, "JPEG", 14, 90, 180, 120);
      } catch (err) {
        console.error("שגיאה בטעינת התמונה ל-PDF:", err);
      }
    }
    doc.save("הזמנה.pdf");
  };
  useEffect(() => {
    if (openSnackbar && bookingDetails) {
      (async () => {
        await generatePDF();
      })();
    }
  }, [openSnackbar, bookingDetails]);
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    navigate("/show-suites");
  };
  if (!suite) return <Typography>טוען פרטי צימר...</Typography>;
  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', backgroundImage: `url(${process.env.PUBLIC_URL}/images/nof4.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2, zIndex: -1 }}></div>
      <CssBaseline />
      <Container component="main" maxWidth="xs" style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', position: 'relative', top: '144px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5" gutterBottom align="center">
            טופס הזמנת צימר - {suite.name}
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField label="שם מלא" name="fullName" value={formData.fullName} onChange={handleChange} fullWidth required sx={{ mb: 2 }} inputProps={{ dir: "rtl" }} />
            <TextField label="טלפון" name="phone" value={formData.phone} onChange={handleChange} fullWidth required sx={{ mb: 2 }} inputProps={{ dir: "rtl" }} />
            <TextField label="תאריך כניסה" name="checkInDate" type="date" value={formData.checkInDate} onChange={handleChange} fullWidth required error={!!errors.checkInDate} helperText={errors.checkInDate} sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} inputProps={{ dir: "rtl", min: getTodayDate() }} />
            <TextField label="תאריך יציאה" name="checkOutDate" type="date" value={formData.checkOutDate} onChange={handleChange} fullWidth required error={!!errors.checkOutDate} helperText={errors.checkOutDate} sx={{ mb: 3 }} InputLabelProps={{ shrink: true }} inputProps={{ dir: "rtl", min: formData.checkInDate || getTodayDate() }} />
            <FormControl fullWidth required sx={{ mb: 3 }}>
              <InputLabel>אמצעי תשלום</InputLabel>
              <Select label="אמצעי תשלום" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                <MenuItem value="creditCard">כרטיס אשראי</MenuItem>
                <MenuItem value="paypal">פייפאל</MenuItem>
              </Select>
            </FormControl>
            {formData.paymentMethod === "creditCard" && (
              <>
                <TextField label="מספר כרטיס אשראי" name="cardNumber" value={formData.cardNumber} onChange={handleChange} fullWidth required error={!!errors.cardNumber} helperText={errors.cardNumber} sx={{ mb: 2 }} />
                <TextField label="תוקף כרטיס (MM/YY)" name="cardExpiry" value={formData.cardExpiry} onChange={handleChange} fullWidth required error={!!errors.cardExpiry} helperText={errors.cardExpiry} placeholder="MM/YY" sx={{ mb: 2 }} />
                <TextField label="CVC" name="cardCvc" value={formData.cardCvc} onChange={handleChange} fullWidth required error={!!errors.cardCvc} helperText={errors.cardCvc} sx={{ mb: 3 }} />
              </>
            )}
            {numNights > 0 && (
              <Box sx={{ mb: 3, textAlign: 'right' }}>
                <Typography variant="body1">סה"כ לילות: {numNights}</Typography>
                <Typography variant="body1">מחיר ללילה: ₪{suite.nightPrice}</Typography>
                <Typography variant="h6" fontWeight="bold">סה"כ לתשלום: ₪{numNights * suite.nightPrice}</Typography>
              </Box>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>אשר הזמנה</Button>
          </form>
        </Box>
      </Container>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          <Typography variant="h6">ההזמנה בוצעה בהצלחה!</Typography>
          <Typography variant="body2">שם: {formData.fullName}</Typography>
          <Typography variant="body2">טלפון: {formData.phone}</Typography>
          <Typography variant="body2">תאריך כניסה: {formData.checkInDate}</Typography>
          <Typography variant="body2">תאריך יציאה: {formData.checkOutDate}</Typography>
          <Typography variant="body1">סה"כ לילות: {numNights}</Typography>
          <Typography variant="body1">מחיר ללילה: ₪{suite.nightPrice}</Typography>
          <Typography variant="h6" fontWeight="bold">סה"כ לתשלום: ₪{numNights * suite.nightPrice}</Typography>
        </Alert>
      </Snackbar>
    </>
  );
}


// // import React, { useState, useEffect, useContext } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import {
// //   Box,
// //   Button,
// //   TextField,
// //   Typography,
// //   CssBaseline,
// //   Container,
// //   Select,
// //   MenuItem,
// //   InputLabel,
// //   FormControl,
// //   Snackbar,
// //   Alert,
// // } from "@mui/material";
// // import axios from "axios";
// // import { UserContext } from "./Context";
// // import { jsPDF } from "jspdf";
// // import "jspdf-autotable";
// // import html2canvas from "html2canvas"; // הוספתי את html2canvas

// // export default function BookingForm() {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const { currentUser } = useContext(UserContext);

// //   const [suite, setSuite] = useState(null);
// //   const [formData, setFormData] = useState({
// //     fullName: "",
// //     phone: "",
// //     checkInDate: "",
// //     checkOutDate: "",
// //     paymentMethod: "",
// //     cardNumber: "",
// //     cardExpiry: "",
// //     cardCvc: "",
// //   });

// //   const [errors, setErrors] = useState({});
// //   const [numNights, setNumNights] = useState(0);
// //   const [totalPrice, setTotalPrice] = useState(0);
// //   const [openSnackbar, setOpenSnackbar] = useState(false);
// //   const [bookingDetails, setBookingDetails] = useState(null);

// //   useEffect(() => {
// //     const fetchSuite = async () => {
// //       try {
// //         const res = await axios.get(`http://localhost:5000/suite/${id}`);
// //         setSuite(res.data);
// //       } catch (err) {
// //         console.error("Error fetching suite:", err);
// //       }
// //     };
// //     fetchSuite();
// //   }, [id]);

// //   useEffect(() => {
// //     calculateNightsAndPrice();
// //   }, [formData.checkInDate, formData.checkOutDate, suite]);

// //   const getTodayDate = () => {
// //     const today = new Date();
// //     return today.toISOString().split("T")[0];
// //   };

// //   const calculateNightsAndPrice = () => {
// //     const { checkInDate, checkOutDate } = formData;
// //     if (checkInDate && checkOutDate) {
// //       const inDate = new Date(checkInDate);
// //       const outDate = new Date(checkOutDate);
// //       const diffTime = outDate - inDate;
// //       const nights = diffTime / (1000 * 60 * 60 * 24);
// //       setNumNights(nights > 0 ? nights : 0);
// //       if (suite?.nightPrice) {
// //         setTotalPrice(nights * suite.nightPrice);
// //       }
// //     } else {
// //       setNumNights(0);
// //       setTotalPrice(0);
// //     }
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     if (name === "cardNumber") {
// //       const formattedCardNumber = value.replace(/\D/g, '').replace(/(.{4})(?=.)/g, '$1 ');
// //       setFormData((prev) => ({ ...prev, [name]: formattedCardNumber }));
// //     } else {
// //       setFormData((prev) => ({ ...prev, [name]: value }));
// //     }
// //     setErrors((prev) => ({ ...prev, [name]: "" }));
// //   };

// //   const validateDates = () => {
// //     const { checkInDate, checkOutDate } = formData;
// //     const checkIn = new Date(checkInDate);
// //     const checkOut = new Date(checkOutDate);
// //     const today = new Date();
// //     today.setHours(0, 0, 0, 0);

// //     let newErrors = {};
// //     if (!checkInDate) newErrors.checkInDate = "יש לבחור תאריך כניסה";
// //     else if (checkIn < today) newErrors.checkInDate = "תאריך הכניסה לא יכול להיות בעבר";

// //     if (!checkOutDate) newErrors.checkOutDate = "יש לבחור תאריך יציאה";
// //     else if (checkOut <= checkIn) newErrors.checkOutDate = "תאריך היציאה חייב להיות אחרי תאריך הכניסה";

// //     return newErrors;
// //   };

// //   const validatePayment = () => {
// //     const { paymentMethod, cardNumber, cardExpiry, cardCvc } = formData;
// //     let newErrors = {};
// //     if (!paymentMethod) {
// //       newErrors.paymentMethod = "יש לבחור אמצעי תשלום";
// //     } else if (paymentMethod === "creditCard") {
// //       const cardNumberRegex = /^\d{16}$/;
// //       if (!cardNumber) newErrors.cardNumber = "יש להזין מספר כרטיס אשראי";
// //       else if (!cardNumberRegex.test(cardNumber.replace(/\s/g, '')))
// //         newErrors.cardNumber = "מספר הכרטיס חייב להכיל 16 ספרות";

// //       const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
// //       if (!cardExpiry) newErrors.cardExpiry = "יש להזין תוקף כרטיס";
// //       else if (!expiryRegex.test(cardExpiry)) newErrors.cardExpiry = "תוקף הכרטיס בפורמט שגוי (נדרש MM/YY)";
// //       else {
// //         const [expMonth, expYear] = cardExpiry.split("/");
// //         const expiryDate = new Date(`20${expYear}`, parseInt(expMonth));
// //         const now = new Date();
// //         if (expiryDate <= now) newErrors.cardExpiry = "תוקף הכרטיס פג";
// //       }

// //       const cvcRegex = /^\d{3,4}$/;
// //       if (!cardCvc) newErrors.cardCvc = "יש להזין CVC";
// //       else if (!cvcRegex.test(cardCvc)) newErrors.cardCvc = "CVC חייב להיות בן 3 או 4 ספרות";
// //     }

// //     return newErrors;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!currentUser) {
// //       alert("חייבים להתחבר כדי לבצע הזמנה.");
// //       return;
// //     }

// //     const dateErrors = validateDates();
// //     const paymentErrors = validatePayment();
// //     const allErrors = { ...dateErrors, ...paymentErrors };

// //     if (Object.keys(allErrors).length > 0) {
// //       setErrors(allErrors);
// //       return;
// //     }

// //     const booking = {
// //       suiteId: id,
// //       userId: currentUser._id,
// //       ...formData,
// //       numNights,
// //       totalPrice,
// //     };

// //     try {
// //       const res = await axios.post("http://localhost:5000/booking", booking);
// //       if (res.status === 200 || res.status === 201) {
// //         setBookingDetails(booking);
// //         setOpenSnackbar(true);
// //       }
// //     } catch (error) {
// //       console.error("Error submitting booking:", error);
// //       alert("אירעה שגיאה בעת ביצוע ההזמנה.");
// //     }
// //   };

// //   const generatePDF = async () => {
// //     const doc = new jsPDF();

// //     // נבחר את ה-snackbar כדי לצלם אותה
// //     const snackbarElement = document.querySelector(".MuiAlert-root"); // בחר את ה-container של הסנאקבר

// //     // צילום המסך של ה-snackbar
// //     const canvas = await html2canvas(snackbarElement);

// //     // הוספת התמונה לקובץ PDF
// //     const imgData = canvas.toDataURL("image/png");
// //     doc.addImage(imgData, "PNG", 10, 10);

// //     // שמירת ה-PDF
// //     doc.save("הזמנה.pdf");
// //   };

// //   useEffect(() => {
// //     if (openSnackbar && bookingDetails) {
// //       (async () => {
// //         await generatePDF();
// //       })();
// //     }
// //   }, [openSnackbar, bookingDetails]);

// //   const handleSnackbarClose = () => {
// //     setOpenSnackbar(false);
// //     navigate("/show-suites");
// //   };

// //   if (!suite) return <Typography>טוען פרטי צימר...</Typography>;

// //   return (
// //     <>
// //       <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', backgroundImage: `url(${process.env.PUBLIC_URL}/images/nof4.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2, zIndex: -1 }}></div>
// //       <CssBaseline />
// //       <Container component="main" maxWidth="xs" style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', position: 'relative', top: '144px' }}>
// //         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
// //           <Typography component="h1" variant="h5" gutterBottom align="center">
// //             טופס הזמנת צימר - {suite.name}
// //           </Typography>
// //           <form onSubmit={handleSubmit} style={{ width: '100%' }}>
// //             <TextField label="שם מלא" name="fullName" value={formData.fullName} onChange={handleChange} fullWidth required sx={{ mb: 2 }} inputProps={{ dir: "rtl" }} />
// //             <TextField label="טלפון" name="phone" value={formData.phone} onChange={handleChange} fullWidth required sx={{ mb: 2 }} inputProps={{ dir: "rtl" }} />
// //             <TextField label="תאריך כניסה" name="checkInDate" type="date" value={formData.checkInDate} onChange={handleChange} fullWidth required error={!!errors.checkInDate} helperText={errors.checkInDate} sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} inputProps={{ dir: "rtl", min: getTodayDate() }} />
// //             <TextField label="תאריך יציאה" name="checkOutDate" type="date" value={formData.checkOutDate} onChange={handleChange} fullWidth required error={!!errors.checkOutDate} helperText={errors.checkOutDate} sx={{ mb: 3 }} InputLabelProps={{ shrink: true }} inputProps={{ dir: "rtl", min: formData.checkInDate || getTodayDate() }} />
// //             <FormControl fullWidth required sx={{ mb: 3 }}>
// //               <InputLabel>אמצעי תשלום</InputLabel>
// //               <Select label="אמצעי תשלום" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
// //                 <MenuItem value="creditCard">כרטיס אשראי</MenuItem>
// //                 <MenuItem value="paypal">פייפאל</MenuItem>
// //               </Select>
// //             </FormControl>
// //             {formData.paymentMethod === "creditCard" && (
// //               <>
// //                 <TextField label="מספר כרטיס אשראי" name="cardNumber" value={formData.cardNumber} onChange={handleChange} fullWidth required error={!!errors.cardNumber} helperText={errors.cardNumber} sx={{ mb: 2 }} />
// //                 <TextField label="תוקף כרטיס (MM/YY)" name="cardExpiry" value={formData.cardExpiry} onChange={handleChange} fullWidth required error={!!errors.cardExpiry} helperText={errors.cardExpiry} placeholder="MM/YY" sx={{ mb: 2 }} />
// //                 <TextField label="CVC" name="cardCvc" value={formData.cardCvc} onChange={handleChange} fullWidth required error={!!errors.cardCvc} helperText={errors.cardCvc} sx={{ mb: 3 }} />
// //               </>
// //             )}
// //             {numNights > 0 && (
// //               <Box sx={{ mb: 3, textAlign: 'right' }}>
// //                 <Typography variant="body1">סה"כ לילות: {numNights}</Typography>
// //                 <Typography variant="body1">מחיר ללילה: ₪{suite.nightPrice}</Typography>
// //                 <Typography variant="h6" fontWeight="bold">סה"כ לתשלום: ₪{numNights * suite.nightPrice}</Typography>
// //               </Box>
// //             )}
// //             <Button type="submit" variant="contained" color="primary" fullWidth>אשר הזמנה</Button>
// //           </form>
// //         </Box>
// //       </Container>
// //       <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
// //         <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
// //           <Typography variant="h6">ההזמנה בוצעה בהצלחה!</Typography>
// //           <Typography variant="body2">שם: {formData.fullName}</Typography>
// //           <Typography variant="body2">טלפון: {formData.phone}</Typography>
// //           <Typography variant="body2">תאריך כניסה: {formData.checkInDate}</Typography>
// //           <Typography variant="body2">תאריך יציאה: {formData.checkOutDate}</Typography>
// //           <Typography variant="body1">סה"כ לילות: {numNights}</Typography>
// //           <Typography variant="body1">מחיר ללילה: ₪{suite.nightPrice}</Typography>
// //           <Typography variant="h6" fontWeight="bold">סה"כ לתשלום: ₪{numNights * suite.nightPrice}</Typography>
// //         </Alert>
// //       </Snackbar>
// //     </>
// //   );
// // }

// import React, { useState, useEffect, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   CssBaseline,
//   Container,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import axios from "axios";
// import { UserContext } from "./Context";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import html2canvas from "html2canvas"; // הוספת ספריית html2canvas

// export default function BookingForm() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { currentUser } = useContext(UserContext);

//   const [suite, setSuite] = useState(null);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     phone: "",
//     checkInDate: "",
//     checkOutDate: "",
//     paymentMethod: "",
//     cardNumber: "",
//     cardExpiry: "",
//     cardCvc: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [numNights, setNumNights] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [bookingDetails, setBookingDetails] = useState(null);
//   const [snackbarRef, setSnackbarRef] = useState(null); // הוספת משתנה עבור רפרנס להודעת הסנאקבר

//   useEffect(() => {
//     const fetchSuite = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/suite/${id}`);
//         setSuite(res.data);
//       } catch (err) {
//         console.error("Error fetching suite:", err);
//       }
//     };
//     fetchSuite();
//   }, [id]);

//   useEffect(() => {
//     calculateNightsAndPrice();
//   }, [formData.checkInDate, formData.checkOutDate, suite]);

//   const calculateNightsAndPrice = () => {
//     const { checkInDate, checkOutDate } = formData;
//     if (checkInDate && checkOutDate) {
//       const inDate = new Date(checkInDate);
//       const outDate = new Date(checkOutDate);
//       const diffTime = outDate - inDate;
//       const nights = diffTime / (1000 * 60 * 60 * 24);
//       setNumNights(nights > 0 ? nights : 0);
//       if (suite?.nightPrice) {
//         setTotalPrice(nights * suite.nightPrice);
//       }
//     } else {
//       setNumNights(0);
//       setTotalPrice(0);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!currentUser) {
//       alert("חייבים להתחבר כדי לבצע הזמנה.");
//       return;
//     }

//     const booking = {
//       suiteId: id,
//       userId: currentUser._id,
//       ...formData,
//       numNights,
//       totalPrice,
//     };

//     try {
//       const res = await axios.post("http://localhost:5000/booking", booking);
//       if (res.status === 200 || res.status === 201) {
//         setBookingDetails(booking);
//         setOpenSnackbar(true);
//       }
//     } catch (error) {
//       console.error("Error submitting booking:", error);
//       alert("אירעה שגיאה בעת ביצוע ההזמנה.");
//     }
//   };

//   const generatePDF = async () => {
//     // צילום מסך של הסנאקבר
//     if (!snackbarRef) {
//       console.error("לא נמצא רפרנס לסנאקבר");
//       return;
//     }

//     // צילום אלמנט הסנאקבר באמצעות html2canvas
//     try {
//       const canvas = await html2canvas(snackbarRef);
//       const imageData = canvas.toDataURL("image/png"); // המרת התמונה לפורמט base64
//       const doc = new jsPDF();
//       doc.setFont("Helvetica", "normal");

//       // הוספת הטקסט לקובץ ה-PDF
//       doc.text("ההזמנה בוצעה בהצלחה!", 14, 20);
//       doc.text(`שם: ${formData.fullName}`, 14, 30);
//       doc.text(`טלפון: ${formData.phone}`, 14, 40);
//       doc.text(`תאריך כניסה: ${formData.checkInDate}`, 14, 50);
//       doc.text(`תאריך יציאה: ${formData.checkOutDate}`, 14, 60);
//       doc.text(`סה"כ לילות: ${numNights}`, 14, 70);
//       doc.text(`מחיר כולל: ${totalPrice} ש\"ח`, 14, 80);

//       // הוספת התמונה שהתקבלה לצילום המסך לקובץ ה-PDF
//       doc.addImage(imageData, "PNG", 14, 90, 180, 120);

//       // שמירת ה-PDF
//       doc.save("הזמנה.pdf");
//     } catch (error) {
//       console.error("שגיאה בצילום המסך:", error);
//     }
//   };

//   useEffect(() => {
//     if (openSnackbar && bookingDetails) {
//       generatePDF(); // ייצור ה-PDF ברגע שההזמנה הושלמה
//     }
//   }, [openSnackbar, bookingDetails]);

//   const handleSnackbarClose = () => {
//     setOpenSnackbar(false);
//     navigate("/show-suites");
//   };

//   return (
//     <>
//       <CssBaseline />
//       <Container component="main" maxWidth="xs" style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', position: 'relative', top: '144px' }}>
//         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           <Typography component="h1" variant="h5" gutterBottom align="center">
//             טופס הזמנת צימר - {suite.name}
//           </Typography>
//           <form onSubmit={handleSubmit} style={{ width: '100%' }}>
//             <TextField label="שם מלא" name="fullName" value={formData.fullName} onChange={handleChange} fullWidth required sx={{ mb: 2 }} inputProps={{ dir: "rtl" }} />
//             <TextField label="טלפון" name="phone" value={formData.phone} onChange={handleChange} fullWidth required sx={{ mb: 2 }} inputProps={{ dir: "rtl" }} />
//             <TextField label="תאריך כניסה" name="checkInDate" type="date" value={formData.checkInDate} onChange={handleChange} fullWidth required sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} inputProps={{ dir: "rtl", min: getTodayDate() }} />
//             <TextField label="תאריך יציאה" name="checkOutDate" type="date" value={formData.checkOutDate} onChange={handleChange} fullWidth required sx={{ mb: 3 }} InputLabelProps={{ shrink: true }} inputProps={{ dir: "rtl", min: formData.checkInDate || getTodayDate() }} />
//             <FormControl fullWidth required sx={{ mb: 3 }}>
//               <InputLabel>אמצעי תשלום</InputLabel>
//               <Select label="אמצעי תשלום" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
//                 <MenuItem value="creditCard">כרטיס אשראי</MenuItem>
//                 <MenuItem value="paypal">פייפאל</MenuItem>
//               </Select>
//             </FormControl>
//             {formData.paymentMethod === "creditCard" && (
//               <>
//                 <TextField label="מספר כרטיס אשראי" name="cardNumber" value={formData.cardNumber} onChange={handleChange} fullWidth required sx={{ mb: 2 }} />
//                 <TextField label="תוקף כרטיס (MM/YY)" name="cardExpiry" value={formData.cardExpiry} onChange={handleChange} fullWidth required sx={{ mb: 2 }} />
//                 <TextField label="CVC" name="cardCvc" value={formData.cardCvc} onChange={handleChange} fullWidth required sx={{ mb: 3 }} />
//               </>
//             )}
//             {numNights > 0 && (
//               <Box sx={{ mb: 3, textAlign: 'right' }}>
//                 <Typography variant="body1">סה"כ לילות: {numNights}</Typography>
//                 <Typography variant="body1">מחיר ללילה: ₪{suite.nightPrice}</Typography>
//                 <Typography variant="h6" fontWeight="bold">סה"כ לתשלום: ₪{numNights * suite.nightPrice}</Typography>
//               </Box>
//             )}
//             <Button type="submit" variant="contained" color="primary" fullWidth>אשר הזמנה</Button>
//           </form>
//         </Box>
//       </Container>
//       <Snackbar ref={setSnackbarRef} open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
//         <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
//           <Typography variant="h6">ההזמנה בוצעה בהצלחה!</Typography>
//           <Typography variant="body2">שם: {formData.fullName}</Typography>
//           <Typography variant="body2">טלפון: {formData.phone}</Typography>
//           <Typography variant="body2">תאריך כניסה: {formData.checkInDate}</Typography>
//           <Typography variant="body2">תאריך יציאה: {formData.checkOutDate}</Typography>
//           <Typography variant="body1">סה"כ לילות: {numNights}</Typography>
//           <Typography variant="body1">מחיר ללילה: ₪{suite.nightPrice}</Typography>
//           <Typography variant="h6" fontWeight="bold">סה"כ לתשלום: ₪{numNights * suite.nightPrice}</Typography>
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }
