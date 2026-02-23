import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");

  const validate = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSuccess("Login successful! Redirecting...");

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-skybg px-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-3xl font-bold mb-8 text-primary text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* EMAIL */}
          <div className="relative">
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="peer w-full p-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder=" "
            />
            <label className="absolute left-3 -top-2.5 text-sm bg-white px-1 text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
              Email
            </label>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="peer w-full p-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-primary pr-10"
              placeholder=" "
            />
            <label className="absolute left-3 -top-2.5 text-sm bg-white px-1 text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
              Password
            </label>

            <div
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:scale-[1.02] transition"
          >
            Login
          </button>

          {success && (
            <p className="text-green-500 text-sm text-center">{success}</p>
          )}
        </form>

        <p className="text-sm text-center mt-6 text-[#171E67]">
          Not registered yet?{" "}
          <Link
            to="/register"
            className="text-primary font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
