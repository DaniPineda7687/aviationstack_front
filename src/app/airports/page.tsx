"use client";

import { Suspense } from "react";
import Loader from "../components/loader";
import AirportsPageContent from "./components/airportsPageContent";

export default function AirportsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <AirportsPageContent />
    </Suspense>
  );
}