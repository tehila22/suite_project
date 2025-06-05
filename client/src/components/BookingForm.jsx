import React, { useState, useEffect, useContext } from "react";
import { format } from "date-fns";
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
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { styled } from "@mui/material/styles";
import axios from "axios";
import { UserContext } from "./Context";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import heLocale from 'date-fns/locale/he';

const OrangeDay = styled('div')(({ theme }) => ({
  backgroundColor: 'orange',
  borderRadius: '50%',
  color: 'white',
  width: 36,
  height: 36,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const BlueDay = styled('div')(({ theme }) => ({
  backgroundColor: 'blue',
  borderRadius: '50%',
  color: 'white',
  width: 36,
  height: 36,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  console.log('currentUser', currentUser);

  const [suite, setSuite] = useState(null);
  const [formData, setFormData] = useState({
    fullName: currentUser ? currentUser.name : "",
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
  const [bookedRanges, setBookedRanges] = useState([]);

  useEffect(() => {
    const fetchSuiteAndBookings = async () => {
      try {
        const suiteRes = await axios.get(`http://localhost:5000/suite/${id}`);
        setSuite(suiteRes.data);

        const bookingsRes = await axios.get(`http://localhost:5000/booking/suite/${id}`);
        const bookingsWithDates = bookingsRes.data.map(({ startDate, endDate }) => ({
          start: new Date(startDate),
          end: new Date(endDate),
        }));
        setBookedRanges(bookingsWithDates);
      } catch (err) {
        console.error("Error fetching suite or bookings:", err);
      }
    };
    fetchSuiteAndBookings();
  }, [id]);

  useEffect(() => {
    calculateNightsAndPrice();
  }, [formData.checkInDate, formData.checkOutDate, suite]);


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
    console.log(booking);

    try {
      console.log("http://localhost:5000/booking", booking);

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


  const isDateBooked = (date) => {
    if (!bookedRanges) return false;
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return bookedRanges.some(({ start, end }) => {
      const startCopy = new Date(start);
      const endCopy = new Date(end);
      startCopy.setHours(0, 0, 0, 0);
      endCopy.setHours(0, 0, 0, 0);
      return d >= startCopy && d <= endCopy;
    });
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


  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    navigate("/show-suites");
  };

  if (!suite) return <Typography>טוען פרטי צימר...</Typography>;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/nof4.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2,
          zIndex: -1,
        }}
      ></div>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="xs"
        style={{
          backgroundColor: "white",
          padding: "32px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          position: "relative",
          top: "144px",
        }}
      >
        {console.log(formData.fullName)}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography component="h1" variant="h5" gutterBottom align="center">
            טופס הזמנת צימר - {suite.name}
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
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

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={heLocale}>
              <DatePicker
                label="תאריך כניסה"
                value={formData.checkInDate ? new Date(formData.checkInDate) : null}
                onChange={(newValue) =>
                  handleChange({
                    target: {
                      name: "checkInDate",
                      value: newValue ? format(newValue, "yyyy-MM-dd") : "",
                    },
                  })
                }
                shouldDisableDate={(date) => isDateBooked(date) || date < today}
                renderDay={(day, _value, DayComponentProps) => {
                  const d = new Date(day);
                  d.setHours(0, 0, 0, 0);
                  if (isDateBooked(d)) {
                    return (
                      <OrangeDay {...DayComponentProps}>
                        {day.getDate()}
                      </OrangeDay>
                    );
                  }
                  if (d < today) {
                    return (
                      <BlueDay {...DayComponentProps}>
                        {day.getDate()}
                      </BlueDay>
                    );
                  }
                  return <PickersDay {...DayComponentProps} />;
                  ;
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    required
                    error={!!errors.checkInDate}
                    helperText={errors.checkInDate}
                    sx={{ mb: 2 }}
                    inputProps={{ ...params.inputProps, dir: "rtl" }}
                  />
                )}
              />

              <DatePicker
                label="תאריך יציאה"
                value={formData.checkOutDate ? new Date(formData.checkOutDate) : null}
                onChange={(newValue) =>
                  handleChange({
                    target: {
                      name: "checkOutDate",
                      value: newValue ? format(newValue, "yyyy-MM-dd") : "",
                    },
                  })
                }
                shouldDisableDate={(date) => {
                  const checkIn = formData.checkInDate ? new Date(formData.checkInDate) : null;
                  if (!date) return false;
                  const d = new Date(date);
                  d.setHours(0, 0, 0, 0);
                  if (isDateBooked(d)) return true;
                  if (checkIn && d <= checkIn) return true;
                  if (d < today) return true;
                  return false;
                }}
                renderDay={(day, _value, DayComponentProps) => {
                  const d = new Date(day);
                  d.setHours(0, 0, 0, 0);
                  if (isDateBooked(d)) {
                    return (
                      <OrangeDay {...DayComponentProps}>
                        {day.getDate()}
                      </OrangeDay>
                    );
                  }
                  if (d < today) {
                    return (
                      <BlueDay {...DayComponentProps}>
                        {day.getDate()}
                      </BlueDay>
                    );
                  }
                  return <PickersDay {...DayComponentProps} />;
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    required
                    error={!!errors.checkOutDate}
                    helperText={errors.checkOutDate}
                    sx={{ mb: 2 }}
                    inputProps={{ ...params.inputProps, dir: "rtl" }}
                  />
                )}
              />
            </LocalizationProvider>

            <Typography variant="body1" gutterBottom>
              מספר לילות: {numNights}
            </Typography>
            <Typography variant="body1" gutterBottom>
              מחיר סופי: {totalPrice.toLocaleString()} ₪
            </Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="payment-method-label">אמצעי תשלום</InputLabel>
              <Select
                labelId="payment-method-label"
                label="אמצעי תשלום"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
                dir="rtl"
              >
                <MenuItem value="card">כרטיס אשראי</MenuItem>
                <MenuItem value="cash">פייפאל</MenuItem>
              </Select>
            </FormControl>

            {formData.paymentMethod === "card" && (
              <>
                <TextField
                  label="מספר כרטיס"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                  inputProps={{ maxLength: 19, dir: "ltr" }}
                />
                <TextField
                  label="תוקף"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                  placeholder="MM/YY"
                  inputProps={{ maxLength: 5, dir: "ltr" }}
                />
                <TextField
                  label="CVC"
                  name="cardCvc"
                  value={formData.cardCvc}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                  inputProps={{ maxLength: 4, dir: "ltr" }}
                />
              </>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={!currentUser}
            >
              שלח הזמנה
            </Button>
          </form>
        </Box>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" onClose={handleSnackbarClose}>
          ההזמנה הושלמה בהצלחה!
        </Alert>
      </Snackbar>
    </>
  );
}
