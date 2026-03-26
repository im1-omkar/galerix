"use client";

import React, { useState, FormEvent } from "react";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    alert("Signed in (mock)");
  };

  return React.createElement(
    "div",
    { style: styles.page },
    React.createElement(
      "form",
      { onSubmit: handleSubmit, style: styles.card },
      React.createElement("h2", { style: styles.title }, "Sign In"),

      React.createElement("input", {
        type: "email",
        placeholder: "Email",
        value: email,
        onChange: (e: any) => setEmail(e.target.value),
        style: styles.input,
      }),

      React.createElement("input", {
        type: "password",
        placeholder: "Password",
        value: password,
        onChange: (e: any) => setPassword(e.target.value),
        style: styles.input,
      }),

      React.createElement(
        "button",
        { type: "submit", style: styles.button },
        "Sign In"
      )
    )
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
  },
  card: {
    background: "#1e293b",
    padding: "30px",
    borderRadius: "12px",
    width: "300px",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    color: "white",
    marginBottom: "20px",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "none",
  },
  button: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    cursor: "pointer",
  },
};