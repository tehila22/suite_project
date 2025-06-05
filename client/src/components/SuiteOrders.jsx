import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { UserContext } from "./Context";

export default function SuiteOrders() {
  const { suiteId } = useParams();
  const { currentUser } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (currentUser) {
      axios
        .get(`http://localhost:5000/booking/user/${currentUser._id}`)
        .then((res) => {
          const filtered = res.data.filter((b) => b.suiteId._id === suiteId);
          setBookings(filtered);
        })
        .catch((err) => console.error("Error fetching bookings:", err));
    }
  }, [currentUser, suiteId]);

  const cancelBooking = (bookingId) => {
    axios
      .delete(`http://localhost:5000/booking/${bookingId}`)
      .then(() => {
        setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      })
      .catch((err) => {
        console.error("שגיאה בביטול ההזמנה:", err);
      });
  };

  if (!currentUser) {
    return <Typography>יש להתחבר כדי לצפות בהזמנות.</Typography>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        ההזמנות שלי עבור הצימר
      </Typography>
      {bookings.length === 0 ? (
        <Typography>לא נמצאו הזמנות עבור צימר זה.</Typography>
      ) : (
        bookings.map((booking) => (
          <Card key={booking._id} sx={{ mb: 3, display: "flex" }}>
            <CardMedia
              component="img"
              sx={{ width: 200 }}
              image={`http://localhost:5000/uploads/${booking.suiteId.image}`}
              alt={booking.suiteId.name}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6">{booking.suiteId.name}</Typography>
              <Typography>
                תאריך כניסה: {booking.checkInDate.substring(0, 10)}
              </Typography>
              <Typography>
                תאריך יציאה: {booking.checkOutDate.substring(0, 10)}
              </Typography>
              {(() => {
                const inDate = new Date(booking.checkInDate);
                const outDate = new Date(booking.checkOutDate);
                const nights = (outDate - inDate) / (1000 * 60 * 60 * 24);
                const totalPrice = nights * booking.suiteId.nightPrice;
                return (
                  <>
                    <Typography>סה"כ לילות: {nights}</Typography>
                    <Typography>סה"כ לתשלום: ₪{totalPrice}</Typography>
                  </>
                );
              })()}

              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => cancelBooking(booking._id)}
                sx={{ mt: 2 }}
              >
                ביטול הזמנה
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}

