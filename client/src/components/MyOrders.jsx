import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./Context";
import axios from "axios";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";

export default function MyOrders() {
  const { currentUser } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (currentUser) {
      axios.get(`http://localhost:5000/booking/user/${currentUser._id}`)
        .then(res => setBookings(res.data))
        .catch(err => console.error("Error fetching bookings:", err));
    }
  }, [currentUser]);

  if (!currentUser) {
    return <Typography>יש להתחבר כדי לצפות בהזמנות שלך.</Typography>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>ההזמנות שלי</Typography>
      {bookings.length === 0 ? (
        <Typography>לא נמצאו הזמנות.</Typography>
      ) : (
        bookings.map(booking => (
          <Card key={booking._id} sx={{ mb: 3, display: "flex" }}>
            <CardMedia
              component="img"
              sx={{ width: 200 }}
              image={`http://localhost:5000/uploads/${booking.suiteId.image}`}
              alt={booking.suiteId.name}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6">{booking.suiteId.name}</Typography>
              <Typography>תאריך כניסה: {booking.checkInDate}</Typography>
              <Typography>תאריך יציאה: {booking.checkOutDate}</Typography>
              <Typography>סה"כ לילות: {booking.numNights}</Typography>
              <Typography>סה"כ לתשלום: ₪{booking.totalPrice}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}
