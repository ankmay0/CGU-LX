import { useState, useContext, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const countryOptions = [
  { name: "India", code: "+91", pattern: /^[6-9]\d{9}$/ },
  { name: "Nepal", code: "+977", pattern: /^\d{10}$/ },
  { name: "USA", code: "+1", pattern: /^\d{10}$/ },
  { name: "UK", code: "+44", pattern: /^\d{10}$/ },
  { name: "Australia", code: "+61", pattern: /^\d{9}$/ },
  { name: "Bangladesh", code: "+880", pattern: /^\d{10}$/ },
  { name: "Japan", code: "+81", pattern: /^\d{9,10}$/ },
  { name: "France", code: "+33", pattern: /^\d{9}$/ },
  { name: "Germany", code: "+49", pattern: /^\d{10}$/ },
  { name: "Other", code: "", pattern: /^.*$/ }
];

const Register = () => {
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("1st Semester");
  const [country, setCountry] = useState("India");
  const [countryCode, setCountryCode] = useState("+91");
  const [customCountryCode, setCustomCountryCode] = useState(""); // ✅ Defined here
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      console.log("🔥 Updated error state:", error);
    }
  }, [error]);

  const navigate = useNavigate();
  const { signInWithGoogle } = useContext(AuthContext);

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
    const foundCountry = countryOptions.find(c => c.name === selectedCountry);
    if (foundCountry) {
      setCountryCode(foundCountry.code);
    }
    if (selectedCountry !== "Other") {
      setCustomCountryCode(""); // Reset custom code if not "Other"
    }
  };

  const validatePhoneNumber = () => {
    const selectedPattern = country === "Other" ? /^.*$/ : countryOptions.find(c => c.name === country)?.pattern;
    if (selectedPattern && !selectedPattern.test(phone)) {
      setError(`Invalid phone number format for ${country}`);
      return false;
    }
    setError("");
    return true;
  };

  const handleGoogleRegister = async () => {
    setError("");

    if (!validatePhoneNumber()) return;

    console.log("🚀 Google Register Attempting...");

    const response = await signInWithGoogle(true, {
      phone: `${country === "Other" ? customCountryCode : countryCode}${phone}`,
      course, semester, country
    });

    console.log("🟢 Response from Auth:", response);

    if (response?.error) {
      console.error("❌ Error:", response.error);
      setError(response.error);
      return;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-white">
      <div className="bg-white p-6 md:p-12 rounded-3xl w-full max-w-md text-center space-y-6 border-2 border-black">
        <h2 className="text-2xl md:text-3xl font-bold text-black">Register</h2>

        {error && (
          <div className="bg-red-200 border-l-4 border-red-600 text-red-800 p-3 rounded text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-2 items-center">
          <select
            value={country}
            onChange={handleCountryChange}
            className="border p-2 rounded w-full md:w-2/5"
          >
            {countryOptions.map((c) => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>

          {country === "Other" ? (
            <input
              type="text"
              placeholder="+ Country Code"
              value={customCountryCode}
              onChange={(e) => setCustomCountryCode(e.target.value)}
              className="border p-2 rounded w-full md:w-1/4"
            />
          ) : (
            <span className="border p-2 rounded w-full md:w-1/4 text-center bg-gray-100">
              {countryCode}
            </span>
          )}

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\s/g, ""))}
            className="border p-2 rounded w-full"
          />
        </div>

        <input
          type="text"
          placeholder="Course (e.g., B.Tech CSE)"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="border p-2 rounded w-full"
        >
          {[...Array(8)].map((_, i) => (
            <option key={i} value={`${i + 1}th Semester`}>
              {`${i + 1}th Semester`}
            </option>
          ))}
        </select>

        <button
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 font-semibold py-2 rounded-md border border-blue-300 shadow-md transition duration-300 ease-in-out hover:scale-95 hover:bg-blue-300 hover:shadow-lg"
        >
          <span className="text-lg text-black">Submit</span>
        </button>

        <p className="text-gray-400 text-xs">
          By registering yourself, you agree to the ridiculously long{" "}
          <Link to="/terms" className="text-xs text-blue-500 hover:text-blue-700">
            terms
          </Link>{" "}
          that you didn’t bother to read!
        </p>
      </div>
    </div>
  );
};

export default Register;