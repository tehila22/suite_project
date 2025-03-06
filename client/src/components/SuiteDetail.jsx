import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  // עבור שליפת ה-id מתוך ה-URL

export default function SuiteDetail() {
  const { id } = useParams();  // שולף את ה-id מהנתיב
  const [suite, setSuite] = useState(null);

  useEffect(() => {
    // שולפים את הצימר מתוך ה-API על פי ה-ID
    fetch(`http://localhost:5000/suite/${id}`)
      .then(response => response.json())
      .then(data => setSuite(data))
      .catch(error => console.error('Error:', error));
  }, [id]);

  if (!suite) {
    return <p>טוען צימר...</p>;
  }

  return (
    <div>
      <h1>{suite.name}</h1>
      <img src={'http://localhost:5000/uploads/' + suite.image} alt={suite.name} />
      <p>{suite.description}</p>
      {/* כאן תוכל להוסיף עוד פרטים על הצימר */}
    </div>
  );
}

