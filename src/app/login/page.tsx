"use client";

import { useCallback, useState } from "react";
import { addDocument } from "../../../config/firestoreFunctions";
import { useMutation } from "@tanstack/react-query";
import { db } from "../../../config/firebase";
import { addDoc, collection } from "firebase/firestore";

interface NewUser {
  name: string;
}

export default function HomePage() {
  const [name, setName] = useState("");

  const mutation = useMutation<string, Error, NewUser>({
    mutationFn: (newData: NewUser) => addDocument("users", newData),
    onSuccess: (data) => {
      alert(`Document created with ID: ${data}`);
    },
    onError: (error) => {
      alert("Error adding document: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ name });
  };

  return (
    <div>
      <h1>Create a New User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="text-black"
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}
