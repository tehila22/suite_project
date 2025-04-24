// import React, { useState, useEffect, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   CssBaseline,
//   Container
// } from "@mui/material";
// import axios from "axios";
// import { UserContext } from "./Context";

// export default function BookingForm() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { currentUser } = useContext(UserContext);

//   const [suite, setSuite] = useState(null);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     phone: "",
//     checkInDate: "",
//     checkOutDate: ""
//   });

//   const [errors, setErrors] = useState({});
//   const [numNights, setNumNights] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);

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

//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split("T")[0];
//   };

//   const calculateNightsAndPrice = () => {
//     const { checkInDate, checkOutDate } = formData;
//     if (checkInDate && checkOutDate) {
//       const inDate = new Date(checkInDate);
//       const outDate = new Date(checkOutDate);
//       const diffTime = outDate - inDate;
//       const nights = diffTime / (1000 * 60 * 60 * 24);
//       setNumNights(nights > 0 ? nights : 0);
//       if (suite && suite.pricePerNight) {
//         setTotalPrice(nights * suite.pricePerNight);
//       }
//     } else {
//       setNumNights(0);
//       setTotalPrice(0);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const validateDates = () => {
//     const { checkInDate, checkOutDate } = formData;
//     const checkIn = new Date(checkInDate);
//     const checkOut = new Date(checkOutDate);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     let newErrors = {};

//     if (!checkInDate) newErrors.checkInDate = "יש לבחור תאריך כניסה";
//     else if (checkIn < today) newErrors.checkInDate = "תאריך הכניסה לא יכול להיות בעבר";

//     if (!checkOutDate) newErrors.checkOutDate = "יש לבחור תאריך יציאה";
//     else if (checkOut <= checkIn) newErrors.checkOutDate = "תאריך היציאה חייב להיות אחרי תאריך הכניסה";

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!currentUser) {
//       alert("חייבים להתחבר כדי לבצע הזמנה.");
//       return;
//     }

//     const dateErrors = validateDates();
//     if (Object.keys(dateErrors).length > 0) {
//       setErrors(dateErrors);
//       return;
//     }

//     const booking = {
//       suiteId: id,
//       userId: currentUser._id,
//       ...formData,
//       numNights,
//       totalPrice
//     };

//     try {
//       const res = await axios.post("http://localhost:5000/booking", booking);
//       if (res.status === 200 || res.status === 201) {
//         alert("ההזמנה בוצעה בהצלחה!");
//         navigate("/show-suites");
//       }
//     } catch (error) {
//       console.error("Error submitting booking:", error);
//       alert("אירעה שגיאה בעת ביצוע ההזמנה.");
//     }
//   };

//   if (!suite) return <Typography>טוען פרטי צימר...</Typography>;

//   return (
//     <>
//       <div
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100vh',
//           backgroundImage: `url(${process.env.PUBLIC_URL}/images/nof4.jpg)`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           opacity: 0.2,
//           zIndex: -1
//         }}
//       ></div>

//       <CssBaseline />
//       <Container
//         component="main"
//         maxWidth="xs"
//         style={{
//           backgroundColor: 'white',
//           padding: '32px',
//           borderRadius: '8px',
//           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//           position: 'relative',
//           top: '144px',
//         }}
//       >
//         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           <Typography component="h1" variant="h5" gutterBottom align="center">
//             טופס הזמנת צימר - {suite.name}
//           </Typography>

//           <form onSubmit={handleSubmit} style={{ width: '100%' }}>
//             <TextField
//               label="שם מלא"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               fullWidth
//               required
//               sx={{ mb: 2 }}
//               inputProps={{ dir: "rtl" }}
//             />
//             <TextField
//               label="טלפון"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               fullWidth
//               required
//               sx={{ mb: 2 }}
//               inputProps={{ dir: "rtl" }}
//             />
//             <TextField
//               label="תאריך כניסה"
//               name="checkInDate"
//               type="date"
//               value={formData.checkInDate}
//               onChange={handleChange}
//               fullWidth
//               required
//               error={!!errors.checkInDate}
//               helperText={errors.checkInDate}
//               sx={{ mb: 2 }}
//               InputLabelProps={{ shrink: true }}
//               inputProps={{
//                 dir: "rtl",
//                 min: getTodayDate()
//               }}
//             />
//             <TextField
//               label="תאריך יציאה"
//               name="checkOutDate"
//               type="date"
//               value={formData.checkOutDate}
//               onChange={handleChange}
//               fullWidth
//               required
//               error={!!errors.checkOutDate}
//               helperText={errors.checkOutDate}
//               sx={{ mb: 3 }}
//               InputLabelProps={{ shrink: true }}
//               inputProps={{
//                 dir: "rtl",
//                 min: formData.checkInDate || getTodayDate()
//               }}
//             />

//             {/* מידע על לילות ומחיר */}
//             {numNights > 0 && (
//               <Box sx={{ mb: 3, textAlign: 'right' }}>
//                 <Typography variant="body1">סה"כ לילות: {numNights}</Typography>
//                 <Typography variant="body1">מחיר ללילה: ₪{suite.nightPrice}</Typography>
//                 <Typography variant="h6" fontWeight="bold">סה"כ לתשלום: ₪{numNights*suite.nightPrice}</Typography>
//               </Box>
//             )}

//             <Button type="submit" variant="contained" color="primary" fullWidth>
//               בצע הזמנה
//             </Button>
//           </form>
//         </Box>
//       </Container>
//     </>
//   );
// }
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
  FormControl
} from "@mui/material";
import axios from "axios";
import { UserContext } from "./Context";

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
    paymentMethod: "", // אמצעי תשלום
    cardNumber: "",
    cardExpiry: "",
    cardCvc: ""
  });

  const [errors, setErrors] = useState({});
  const [numNights, setNumNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

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
      if (suite && suite.pricePerNight) {
        setTotalPrice(nights * suite.pricePerNight);
      }
    } else {
      setNumNights(0);
      setTotalPrice(0);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const validatePayment = () => {
    const { paymentMethod, cardNumber, cardExpiry, cardCvc } = formData;
    let newErrors = {};

    if (!paymentMethod) {
      newErrors.paymentMethod = "יש לבחור אמצעי תשלום";
    } else if (paymentMethod === "creditCard") {
      if (!cardNumber) newErrors.cardNumber = "יש להזין מספר כרטיס אשראי";
      if (!cardExpiry) newErrors.cardExpiry = "יש להזין תוקף כרטיס";
      if (!cardCvc) newErrors.cardCvc = "יש להזין CVC";
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
      totalPrice
    };

    try {
      const res = await axios.post("http://localhost:5000/booking", booking);
      if (res.status === 200 || res.status === 201) {
        alert("ההזמנה בוצעה בהצלחה!");
        navigate("/show-suites");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("אירעה שגיאה בעת ביצוע ההזמנה.");
    }
  };

  if (!suite) return <Typography>טוען פרטי צימר...</Typography>;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/nof4.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2,
          zIndex: -1
        }}
      ></div>

      <CssBaseline />
      <Container
        component="main"
        maxWidth="xs"
        style={{
          backgroundColor: 'white',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          top: '144px',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5" gutterBottom align="center">
            טופס הזמנת צימר - {suite.name}
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            {/* פרטי לקוח */}
            <TextField
              label="שם מלא"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
              inputProps={{ dir: "rtl" }}
            />
            <TextField
              label="טלפון"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
              inputProps={{ dir: "rtl" }}
            />

            {/* תאריכים */}
            <TextField
              label="תאריך כניסה"
              name="checkInDate"
              type="date"
              value={formData.checkInDate}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.checkInDate}
              helperText={errors.checkInDate}
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                dir: "rtl",
                min: getTodayDate()
              }}
            />
            <TextField
              label="תאריך יציאה"
              name="checkOutDate"
              type="date"
              value={formData.checkOutDate}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.checkOutDate}
              helperText={errors.checkOutDate}
              sx={{ mb: 3 }}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                dir: "rtl",
                min: formData.checkInDate || getTodayDate()
              }}
            />

            {/* אפשרות לתשלום */}
            <FormControl fullWidth required sx={{ mb: 3 }}>
              <InputLabel>אמצעי תשלום</InputLabel>
              <Select
                label="אמצעי תשלום"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <MenuItem value="creditCard">כרטיס אשראי</MenuItem>
                <MenuItem value="paypal">פייפאל</MenuItem>
              </Select>
            </FormControl>

            {/* פרטי כרטיס אשראי */}
            {formData.paymentMethod === "creditCard" && (
              <>
                <TextField
                  label="מספר כרטיס אשראי"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="תוקף כרטיס"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="CVC"
                  name="cardCvc"
                  value={formData.cardCvc}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ mb: 3 }}
                />
              </>
            )}

            {/* מידע על לילות ומחיר */}
            {numNights > 0 && (
              <Box sx={{ mb: 3, textAlign: 'right' }}>
                <Typography variant="body1">סה"כ לילות: {numNights}</Typography>
                <Typography variant="body1">מחיר ללילה: ₪{suite.nightPrice}</Typography>
                <Typography variant="h6" fontWeight="bold">סה"כ לתשלום: ₪{numNights*suite.nightPrice}</Typography>
              </Box>
            )}

            <Button type="submit" variant="contained" color="primary" fullWidth>
              בצע הזמנה
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
}
