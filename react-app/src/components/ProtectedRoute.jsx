// import { useEffect, useState } from "react";

// const ProtectedRoute = ({ children }) => {
//   const [isValid, setIsValid] = useState(null);

//   useEffect(() => {
//     try {
//       const token = localStorage.getItem("token");
//       const userData = localStorage.getItem("user");

//       if (!token || !userData) {
//         setIsValid(false);
//         return;
//       }

//       const user = JSON.parse(userData);

//       if (user.role !== "recruiter") {
//         setIsValid(false);
//         return;
//       }

//       setIsValid(true);
//     } catch (err) {
//       setIsValid(false);
//     }
//   }, []);

//   // ⏳ Loading state
//   if (isValid === null) {
//     return <h2>Loading...</h2>;
//   }

//   // ❌ Not allowed → redirect ONCE
//   if (isValid === false) {
//     window.location.replace("http://localhost:5173/login");
//     return null;
//   }

//   // ✅ Allowed
//   return children;
// };

// export default ProtectedRoute;

import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");
    const userFromUrl = params.get("user");

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
    }

    if (userFromUrl) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userFromUrl));
        localStorage.setItem("user", JSON.stringify(parsedUser));
      } catch {
        setIsValid(false);
        return;
      }
    }

    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      setIsValid(false);
      return;
    }

    try {
      const user = JSON.parse(userData);

      if (user.role === "recruiter") {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } catch {
      setIsValid(false);
    }
  }, []);

  if (isValid === null) {
    return <h2>Checking auth...</h2>;
  }

  if (isValid === false) {
    window.location.replace("http://localhost:5173/login");
    return <h2>Redirecting...</h2>;
  }

  return children;
};

export default ProtectedRoute;
