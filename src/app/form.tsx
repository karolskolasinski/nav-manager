"use client";
import { useState } from "react";
import { NavItem } from "@/app/contrancts";

type FormProps = {
  onAddItem: (item: NavItem) => void;
};

export function Form(props: FormProps) {
  let { onAddItem } = props;
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  const [subitems, setSubitems] = useState([]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAddItem({ label, url, subitems });
      }}
    >
      <input
        type="text"
        name="label"
        defaultValue={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="np. Promocje"
        required
      />

      <input
        type="url"
        name="url"
        defaultValue={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="np. /promocje"
        required
      />

      <button type="submit">Dodaj</button>
    </form>
  );
}
