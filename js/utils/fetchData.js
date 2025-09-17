"use strict";

export default async function fetchData(url, headers) {
  try {
    const request = await fetch(url);
    const data = await request.json();

    return data;
  } catch ({ error }) {
    throw new Error("Something went wrong while loading data", { cause: error.message });
  }
}
