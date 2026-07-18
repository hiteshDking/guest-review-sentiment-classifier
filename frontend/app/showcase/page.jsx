"use client";

import { Button, Input, Modal, Toast, Loader } from "../../components/ui";
import { useState } from "react";

export default function Showcase() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">
        Component Showcase
      </h1>

      <Button onClick={() => alert("Button Clicked")}>
        Test Button
      </Button>

      <Input
        label="Email"
        placeholder="Enter Email"
      />

      <button
        onClick={() => setOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Open Modal
      </button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        
        title="Demo Modal"
      >
        <p>Hello from Modal</p>
      </Modal>

      <Toast message="Toast Example" />

      <Loader />
    </div>
  );
}