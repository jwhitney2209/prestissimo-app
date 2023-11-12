import { useEffect } from "react";
import Announcements from "../components/dashboard/Announcements"

export default function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return (
    <>
    <Announcements />
    </>
  )
}
