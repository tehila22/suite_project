
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { UserContext } from "./Context";

export default function SuiteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const [suite, setSuite] = useState(null);
  const [responses, setResponses] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const getSuiteDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/suite/${id}`);
        setSuite(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const getAllResponses = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/response/${id}`);
        setResponses(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getSuiteDetails();
    getAllResponses();
  }, [id]);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      console.error("User is not logged in!");
      return;
    }

    const response = {
      suiteId: id,
      userId: currentUser._id,
      responseContent: newMessage,
    };

    try {
      const res = await axios.post(`http://localhost:5000/response`, response);
      if (res.status === 200) {
        res.data.userId = currentUser; // הוספת פרטי המשתמש
        setResponses((prevResponses) => [...prevResponses, res.data]);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error adding response:", error);
    }
  };

  const handleDeleteResponse = async (responseId) => {
    try {
      const res = await axios.delete(`http://localhost:5000/response/${responseId}`);
      if (res.status === 200) {
        setResponses((prevResponses) =>
          prevResponses.filter((response) => response._id !== responseId)
        );
      }
    } catch (error) {
      console.error("Error deleting response:", error);
    }
  };

  if (!suite) {
    return <Typography variant="h6">טוען פרטי צימר...</Typography>;
  }

  return (
    <Box
      sx={{
        position: "relative",
        top: "83px",
        maxWidth: 800,
        margin: "0 auto",
        padding: 2,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      {/* תמונה וכותרת */}
      <Box sx={{ position: "relative" }}>
        <img
          src={"http://localhost:5000/uploads/" + suite.image}
          alt={suite.name}
          style={{
            width: "100%",
            maxHeight: "500px",
            objectFit: "cover",
            borderRadius: 2,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgb(0 0 0 / 24%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            padding: 2,
            borderRadius: 2,
          }}
        >
          <Typography variant="h3" align="center" gutterBottom>
            {suite.name}
          </Typography>
          <Typography variant="h5" align="center">
            {suite.city}, {suite.address}
          </Typography>
        </Box>
      </Box>

      {/* מידע על הצימר */}
      <Box sx={{ textAlign: "right", fontSize: 16, lineHeight: 1.6, mt: 3 }}>
        <Typography variant="body1">
          <strong>תיאור הצימר:</strong> {suite.description}
        </Typography>
        <Typography variant="body1">
          <strong>חדרים:</strong> {suite.numRooms}
        </Typography>
        <Typography variant="body1">
          <strong>מיטות:</strong> {suite.numBeds}
        </Typography>
        <Typography variant="body1">
          <strong>מחיר ללילה:</strong> ₪{suite.nightPrice}
        </Typography>
      </Box>

      {/* כפתור הזמנה */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(`/booking/${id}`)}
        sx={{ mt: 3 }}
      >
        הזמן צימר
      </Button>

      {/* הוספת תגובה */}
      <Typography variant="h6" sx={{ mt: 3, textAlign: "right" }}>
        הוסף תגובה חדשה
      </Typography>
      <form onSubmit={handleMessageSubmit}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="כתוב את התגובה שלך..."
            multiline
            rows={2}
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton type="submit" color="primary">
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </form>

      {/* רשימת תגובות */}
      <Box sx={{ mt: 2, textAlign: "right" }}>
        {responses.length === 0 ? (
          <Typography variant="body1">אין תגובות עדיין.</Typography>
        ) : (
          [...responses]
            .sort((a, b) => new Date(b.prodDate) - new Date(a.prodDate))
            .map((response, index) => (
              <Card
                key={index}
                sx={{
                  mb: 2,
                  p: 2,
                  backgroundColor: "#f0f0f0",
                  borderRadius: 2,
                  boxShadow: 1,
                  position: "relative",
                }}
              >
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    ({response.userId.name})
                  </Typography>
                  <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                    {response.responseContent}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {new Date(response.prodDate).toLocaleString()}
                  </Typography>
                </CardContent>

                {currentUser && currentUser._id === response.userId._id && (
                  <IconButton
                    onClick={() => handleDeleteResponse(response._id)}
                    sx={{ position: "absolute", top: 8, left: 8 }}
                  >
                    <DeleteForeverRoundedIcon />
                  </IconButton>
                )}
              </Card>
            ))
        )}
      </Box>
    </Box>
  );
}
