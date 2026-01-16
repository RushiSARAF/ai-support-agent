import React, { useState } from "react";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import "./App.css";

// 🔴 SUPABASE DETAILS (ALREADY CORRECT)
const SUPABASE_URL = "https://xgofcjzlskdjnszxvmep.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_FO4EqH3y6r51D-rEW-K8sg_PKEkUNfs";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    issue: ""
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      // 1️⃣ SEND DATA TO RELAY (AI AGENT RUNS AS BEFORE)
      await axios.post(
        "https://ai-agent-backend-8qvj.onrender.com/api/support",
        formData
      );

      // 2️⃣ SAVE FORM DATA TO SUPABASE (ONLY USER INPUT)
      await supabase.from("agent_requests").insert([
        {
          name: formData.name,
          email: formData.email,
          department: formData.department,
          message: formData.issue   // ✅ FIXED
        }
      ]);

      // 3️⃣ SUCCESS MESSAGE
      setSuccessMsg("✅ Your request has been submitted successfully.");

      // 4️⃣ CLEAR FORM
      setFormData({
        name: "",
        email: "",
        department: "",
        issue: ""
      });

    } catch (error) {
      alert("❌ Something went wrong. Please try again.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>AI Support Agent</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        <select
          required
          value={formData.department}
          onChange={(e) =>
            setFormData({ ...formData, department: e.target.value })
          }
        >
          <option value="">Select Department</option>
          <option value="Billing">Billing</option>
          <option value="Technical">Technical</option>
          <option value="Support">Support</option>
        </select>

        <textarea
          placeholder="Describe your issue"
          required
          value={formData.issue}
          onChange={(e) =>
            setFormData({ ...formData, issue: e.target.value })
          }
        />

        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Issue"}
        </button>
      </form>

      {successMsg && (
        <p style={{ color: "green", marginTop: "15px" }}>
          {successMsg}
        </p>
      )}
    </div>
  );
}

export default App;











// import React, { useState } from "react";
// import axios from "axios";
// import { createClient } from "@supabase/supabase-js";
// import "./App.css";

// // 🔴 SUPABASE DETAILS (REPLACE)
// const SUPABASE_URL = "https://xgofcjzlskdjnszxvmep.supabase.co";
// const SUPABASE_ANON_KEY = "sb_publishable_FO4EqH3y6r51D-rEW-K8sg_PKEkUNfs";

// const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// function App() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     department: "",
//     issue: ""
//   });

//   const [loading, setLoading] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");

//   // ✅ SINGLE SUBMIT FLOW
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccessMsg("");

//     try {
//       // 1️⃣ SEND DATA TO RELAY / NODE (AI AGENT)
//       const res = await axios.post(
//         "http://localhost:5000/api/support",
//         formData
//       );

//       // 2️⃣ SAVE WHAT WAS SENT TO CUSTOMER INTO SUPABASE
//       await supabase.from("agent_requests").insert([
//         {
//           name: formData.name,
//           email: formData.email,
//           department: formData.department,
//           message: res.data?.solution || formData.issue
//         }
//       ]);

//       // 3️⃣ SHOW SUCCESS MESSAGE
//       setSuccessMsg("✅ Your request has been submitted successfully.");

//       // 4️⃣ CLEAR FORM
//       setFormData({
//         name: "",
//         email: "",
//         department: "",
//         issue: ""
//       });

//     } catch (error) {
//       alert("❌ Something went wrong. Please try again.");
//       console.error(error);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="container">
//       <h1>AI Support Agent</h1>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Name"
//           required
//           value={formData.name}
//           onChange={(e) =>
//             setFormData({ ...formData, name: e.target.value })
//           }
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           required
//           value={formData.email}
//           onChange={(e) =>
//             setFormData({ ...formData, email: e.target.value })
//           }
//         />

//         <select
//           required
//           value={formData.department}
//           onChange={(e) =>
//             setFormData({ ...formData, department: e.target.value })
//           }
//         >
//           <option value="">Select Department</option>
//           <option value="Billing">Billing</option>
//           <option value="Technical">Technical</option>
//           <option value="Support">Support</option>
//         </select>

//         <textarea
//           placeholder="Describe your issue"
//           required
//           value={formData.issue}
//           onChange={(e) =>
//             setFormData({ ...formData, issue: e.target.value })
//           }
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Analyzing..." : "Analyze Issue"}
//         </button>
//       </form>

//       {/* ✅ USER FEEDBACK ONLY */}
//       {successMsg && (
//         <p style={{ color: "green", marginTop: "15px" }}>
//           {successMsg}
//         </p>
//       )}
//     </div>
//   );
// }

// export default App;
















// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";

// function App() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     department: "",
//     issue: ""
//   });

//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // ✅ THIS FUNCTION MUST BE USED
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // stop page refresh
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/support",
//         formData
//       );

//       setResponse(res.data);
//     } catch (error) {
//       alert("Request failed");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="container">
    

//       <h1>AI Support Agent</h1>

//       {/* 🔴 IMPORTANT: onSubmit={handleSubmit} */}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Name"
//           required
//           onChange={(e) =>
//             setFormData({ ...formData, name: e.target.value })
//           }
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           required
//           onChange={(e) =>
//             setFormData({ ...formData, email: e.target.value })
//           }
//         />

//         <select
//           required
//           onChange={(e) =>
//             setFormData({ ...formData, department: e.target.value })
//           }
//         >
//           <option value="">Select</option>
//           <option value="Billing">Billing</option>
//           <option value="Technical">Technical</option>
//           <option value="Support">Support</option>
//         </select>

//         <textarea
//           placeholder="Describe issue"
//           required
//           onChange={(e) =>
//             setFormData({ ...formData, issue: e.target.value })
//           }
//         />

//         {/* 🔴 button type MUST be submit */}
//         <button type="submit">
//           {loading ? "Analyzing..." : "Analyze Issue"}
//         </button>
//       </form>

//       {/* {response && (
//         <div className="response">
//           <h3>AI Response</h3>
//           <p><b>Summary:</b> {response.summary}</p>
//           <p><b>Solution:</b> {response.solution}</p>
//           <p><b>Priority:</b> {response.priority}</p>
//         </div>
//       )} */}
//     </div>
//   );
// }

// export default App;








// import { useState } from "react";
// import axios from "axios";
// import "./App.css";

// function App() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     category: "Support",
//     issue: "",
//   });

//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await axios.post("http://localhost:5000/analyze", formData);
//       setResult(res.data);
//     } catch (err) {
//       alert("Something went wrong");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="container">
//       <h1>AI Support Agent</h1>

//       <form onSubmit={handleSubmit} className="card">
//         <input name="name" placeholder="Name" onChange={handleChange} required />
//         <input name="email" placeholder="Email" onChange={handleChange} required />

//         <select name="category" onChange={handleChange}>
//           <option>Support</option>
//           <option>Billing</option>
//           <option>Technical</option>
//         </select>

//         <textarea
//           name="issue"
//           placeholder="Describe your issue"
//           onChange={handleChange}
//           required
//         />

//         <button type="submit">
//           {loading ? "Analyzing..." : "Analyze Issue"}
//         </button>
//       </form>

//       {/* ✅ SHOW RESULT ONLY WHEN DATA EXISTS */}
//       {result && (
//         <div className="result">
//           <h2>AI Analysis</h2>
//           <p><b>Summary:</b> {result.summary}</p>
//           <p><b>Solution:</b> {result.solution}</p>
//           <p><b>Priority:</b> {result.priority}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;














// import { useState } from "react";
// import axios from "axios";
// import "./App.css";

// function App() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     category: "Support",
//     issue: "",
//   });

//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // ✅ FIXED API ENDPOINT
//       const res = await axios.post(
//         "http://localhost:5000/api/support",
//         formData
//       );

//       setResult(res.data);
//     } catch (err) {
//       alert("Something went wrong while submitting the issue");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="container">
//       <h1>AI Support Agent</h1>

//       <form onSubmit={handleSubmit} className="card">
//         <input
//           name="name"
//           placeholder="Name"
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           required
//         />

//         <select name="category" onChange={handleChange}>
//           <option value="Support">Support</option>
//           <option value="Billing">Billing</option>
//           <option value="Technical">Technical</option>
//         </select>

//         <textarea
//           name="issue"
//           placeholder="Describe your issue"
//           onChange={handleChange}
//           required
//         />

//         <button type="submit">
//           {loading ? "Analyzing..." : "Submit Issue"}
//         </button>
//       </form>

//       {result && (
//         <div className="result">
//           <h2>AI Analysis</h2>
//           <p><b>Summary:</b> {result.summary}</p>
//           <p><b>Solution:</b> {result.solution}</p>
//           <p><b>Priority:</b> {result.priority}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


