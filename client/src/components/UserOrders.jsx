import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  Button,
} from '@mui/material';

function UserOrders() {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/booking/user/${userId}`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('שגיאה בקבלת ההזמנות:', err);
        setLoading(false);
      });
  }, [userId]);

  const cancelOrder = (orderId) => {
    axios
      .delete(`http://localhost:5000/booking/${orderId}`)
      .then(() => {
        setOrders((prev) => prev.filter((order) => order._id !== orderId));
      })
      .catch((err) => {
        console.error('שגיאה בביטול ההזמנה:', err);
      });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        ההזמנות שלי
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : orders.length === 0 ? (
        <Typography align="center">אין הזמנות להצגה</Typography>
      ) : (
        <Grid container spacing={3}>
          {orders.slice().reverse().map((order) => {
            const checkIn = new Date(order.checkInDate);
            const checkOut = new Date(order.checkOutDate);
            const nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
            const totalPrice = nights * (order.suiteId?.nightPrice || 0);

            return (
              <Grid item xs={12} md={6} key={order._id}>
                <Card sx={{ display: 'flex' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 200 }}
                    image={
                      order.suiteId?.image
                        ? `http://localhost:5000/uploads/${order.suiteId.image}`
                        : 'https://via.placeholder.com/200'
                    }
                    alt={order.suiteId?.name || 'צימר'}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6">
                      {order.suiteId?.name || 'שם צימר לא זמין'}
                    </Typography>
                    <Typography>מתאריך: {checkIn.toLocaleDateString()}</Typography>
                    <Typography>עד תאריך: {checkOut.toLocaleDateString()}</Typography>
                    <Typography>סה"כ לילות: {nights}</Typography>
                    <Typography sx={{ fontWeight: 'bold', color: 'green' }}>
                      סה"כ לתשלום: ₪{totalPrice}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => cancelOrder(order._id)}
                      sx={{ mt: 2 }}
                    >
                      ביטול הזמנה
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}

export default UserOrders;
