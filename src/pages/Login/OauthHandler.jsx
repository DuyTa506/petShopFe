import React, { useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

function OAuthHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

    var results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  const token = getUrlParameter("token");
  const role = getUrlParameter("role");
  const id = getUrlParameter("id");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("id", id);
      window.location.href = "http://localhost:3000/";
    } else {
      window.location.href = "http://localhost:3000/login";
    }
  }, []);
}

export default OAuthHandler;
