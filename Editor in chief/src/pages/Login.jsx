import React, { useContext, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { contextProviderDeclare } from "../store/ContextProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const getContextProvider = useContext(contextProviderDeclare);
  const { setLoggedIn, isloggedIn, setChiefEditor, /*setjournalAssign*/ } = getContextProvider;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_DJANGO_URL}/editor-chief/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        alert("Login successful!");
        localStorage.setItem('token', data.token);
        await setChiefEditor(data);
        setLoggedIn(!isloggedIn);
        console.log(data);
        //await setjournalAssign(data.area_editor_id);
        navigate('/');
      } else {
        if (data.detail) {
          setError(data.detail);
        } else {
          setError("Login failed. Please check your credentials.");
        }
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  width="72" 
                  height="72" 
                  className="mb-3"
                />
                <h3 className="h4 mb-3">chief Editor Login</h3>
              </div>

              {error && (
                <div className="alert alert-danger alert-dismissible fade show">
                  {error}
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setError("")}
                  ></button>
                </div>
              )}

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Signing in...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;